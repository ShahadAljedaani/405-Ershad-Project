<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authorized']);
    exit;
}

$userId   = (int) ($_SESSION['user_id'] ?? 0);
$userRole = $_SESSION['role'] ?? null;

$projectId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
if ($projectId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid project id']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            p.id,
            p.title,
            p.field,
            p.description,
            p.attachment_path,
            p.created_at,
            p.student_id,
            u.name AS student_name
        FROM projects p
        JOIN users u ON p.student_id = u.id
        WHERE p.id = ?
    ");
    $stmt->execute([$projectId]);
    $project = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$project) {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found']);
        exit;
    }

    if ($userRole === 'student' && (int)$project['student_id'] !== $userId) {
        http_response_code(403);
        echo json_encode(['error' => 'You cannot view this project']);
        exit;
    }

    $stmtStats = $pdo->prepare("
        SELECT status, COUNT(*) AS cnt
        FROM supervisor_requests
        WHERE project_id = ?
        GROUP BY status
    ");
    $stmtStats->execute([$projectId]);
    $rows = $stmtStats->fetchAll(PDO::FETCH_ASSOC);

    $pending  = 0;
    $accepted = 0;
    $rejected = 0;
    $total    = 0;

    foreach ($rows as $row) {
        $status = strtolower($row['status']);
        $cnt    = (int)$row['cnt'];
        $total += $cnt;

        if ($status === 'pending') {
            $pending += $cnt;
        } elseif ($status === 'accepted') {
            $accepted += $cnt;
        } elseif ($status === 'rejected') {
            $rejected += $cnt;
        }
    }

    if ($accepted > 0) {
        $derivedStatus = 'assigned';        
    } elseif ($pending > 0) {
        $derivedStatus = 'pending_review';   
    } elseif ($total > 0 && $accepted === 0 && $pending === 0) {
        $derivedStatus = 'rejected';         
    } else {
        $derivedStatus = 'no_requests';       
    }

    $supervisorName = null;
    if ($accepted > 0) {
        $stmtSup = $pdo->prepare("
            SELECT u.name
            FROM supervisor_requests r
            JOIN users u ON r.supervisor_id = u.id
            WHERE r.project_id = ? AND r.status = 'accepted'
            LIMIT 1
        ");
        $stmtSup->execute([$projectId]);
        $supRow = $stmtSup->fetch(PDO::FETCH_ASSOC);
        if ($supRow) {
            $supervisorName = $supRow['name'];
        }
    }

    $baseUrl = sprintf(
        '%s://%s%s',
        (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http',
        $_SERVER['HTTP_HOST'],
        rtrim(dirname($_SERVER['PHP_SELF']), '/\\')
    );

    $attachmentUrl = null;
    if (!empty($project['attachment_path'])) {
        $attachmentUrl = $baseUrl . '/' . ltrim($project['attachment_path'], '/');
    }

    echo json_encode([
        'project' => [
            'id'              => (int) $project['id'],
            'title'           => $project['title'],
            'field'           => $project['field'],
            'description'     => $project['description'],
            'status'          => $derivedStatus,        
            'student_name'    => $project['student_name'],
            'created_at'      => $project['created_at'],
            'attachment_path' => $project['attachment_path'],
            'attachment_url'  => $attachmentUrl,
            'supervisor_name' => $supervisorName,         
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to load project',
        'details' => $e->getMessage()
    ]);
}