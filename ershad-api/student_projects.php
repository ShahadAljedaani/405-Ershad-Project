<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';   // CORS + session_start + $pdo

header('Content-Type: application/json');

// Only allow GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Must be logged in as student
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'student') {
    http_response_code(401);
    echo json_encode(['error' => 'Not authorized']);
    exit;
}

$studentId = (int) $_SESSION['user_id'];

try {
    // 1) Get all projects for this student
    $stmt = $pdo->prepare("
        SELECT
            p.id,
            p.title,
            p.field,
            p.description,
            p.attachment_path,
            p.created_at
        FROM projects p
        WHERE p.student_id = ?
        ORDER BY p.created_at DESC
    ");
    $stmt->execute([$studentId]);
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Prepare reusable statements to avoid writing huge SQL
    $stmtStats = $pdo->prepare("
        SELECT status, COUNT(*) AS cnt
        FROM supervisor_requests
        WHERE project_id = ?
        GROUP BY status
    ");

    $stmtAcceptedSup = $pdo->prepare("
        SELECT u.name
        FROM supervisor_requests r
        JOIN users u ON r.supervisor_id = u.id
        WHERE r.project_id = ? AND r.status = 'accepted'
        LIMIT 1
    ");

    foreach ($projects as &$p) {
        $projectId = (int) $p['id'];

        // 2) Get counts of requests by status for this project
        $stmtStats->execute([$projectId]);
        $rows = $stmtStats->fetchAll(PDO::FETCH_ASSOC);

        $total       = 0;
        $pending     = 0;
        $accepted    = 0;
        $rejected    = 0;

        foreach ($rows as $row) {
            $total += (int)$row['cnt'];
            $status = strtolower($row['status']);
            if ($status === 'pending') {
                $pending += (int)$row['cnt'];
            } elseif ($status === 'accepted') {
                $accepted += (int)$row['cnt'];
            } elseif ($status === 'rejected') {
                $rejected += (int)$row['cnt'];
            }
        }

        // 3) Derive a status for the student card based on supervisor decisions
        // Priority:
        //   accepted  >  pending  >  rejected  >  no requests
        if ($accepted > 0) {
            $derivedStatus = 'assigned';  // or 'accepted'
        } elseif ($pending > 0) {
            $derivedStatus = 'pending_review';
        } elseif ($total > 0 && $accepted === 0 && $pending === 0) {
            $derivedStatus = 'rejected';
        } else {
            $derivedStatus = 'no_requests';  // never matched a supervisor
        }

        $p['status'] = $derivedStatus;

        // 4) If accepted, also show the accepting supervisor name
        $supervisorName = null;
        if ($accepted > 0) {
            $stmtAcceptedSup->execute([$projectId]);
            $supRow = $stmtAcceptedSup->fetch(PDO::FETCH_ASSOC);
            if ($supRow) {
                $supervisorName = $supRow['name'];
            }
        }
        $p['supervisor_name'] = $supervisorName;

        // 5) Optional: formatted date
        if (!empty($p['created_at'])) {
            $p['created_at_formatted'] = date('Y-m-d H:i', strtotime($p['created_at']));
        }
    }
    unset($p);

    echo json_encode(['projects' => $projects]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to load projects',
        'details' => $e->getMessage(),
    ]);
}