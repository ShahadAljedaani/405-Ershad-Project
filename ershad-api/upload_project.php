<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';  

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'student') {
    http_response_code(401);
    echo json_encode(['error' => 'Not authorized']);
    exit;
}

$studentId   = (int) $_SESSION['user_id'];
$title       = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$field       = trim($_POST['field'] ?? '');

if (!$title || !$description || !$field) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$attachmentPath = null;

if (!empty($_FILES['attachment']['name'])) {
    $uploadDir = __DIR__ . '/uploads/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $originalName = basename($_FILES['attachment']['name']);
    $safeName = time() . '_' . preg_replace('/[^A-Za-z0-9_\.-]/', '_', $originalName);

    $targetPath = $uploadDir . $safeName;

    if (move_uploaded_file($_FILES['attachment']['tmp_name'], $targetPath)) {
        $attachmentPath = 'uploads/' . $safeName;
    }
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO projects (student_id, title, field, description, attachment_path)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $studentId,
        $title,
        $field,
        $description,
        $attachmentPath
    ]);

    $projectId = $pdo->lastInsertId();

    $stmtSup = $pdo->prepare("
        SELECT id, name
        FROM users
        WHERE role = 'supervisor'
          AND expertise = ?
        LIMIT 1
    ");
    $stmtSup->execute([$field]);
    $supervisor = $stmtSup->fetch();

    $assignedSupervisor = null;

    if ($supervisor) {
        $assignedSupervisor = [
            'id'   => $supervisor['id'],
            'name' => $supervisor['name'],
        ];

        $msg = "New project \"$title\" in field $field. Please review this idea.";
        $stmtReq = $pdo->prepare("
            INSERT INTO supervisor_requests (student_id, supervisor_id, message, status)
            VALUES (?, ?, ?, 'pending')
        ");
        $stmtReq->execute([
            $studentId,
            $supervisor['id'],
            $msg
        ]);

        $stmtUpd = $pdo->prepare("
            UPDATE projects SET supervisor_id = ? WHERE id = ?
        ");
        $stmtUpd->execute([$supervisor['id'], $projectId]);
    }

    echo json_encode([
        'message'             => 'Project created successfully',
        'project_id'          => $projectId,
        'assigned_supervisor' => $assignedSupervisor
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to create project',
        'details' => $e->getMessage()
    ]);
}