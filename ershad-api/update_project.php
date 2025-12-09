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

$projectId   = (int)($_POST['project_id'] ?? 0);
$title       = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$field       = trim($_POST['field'] ?? '');

if ($projectId <= 0 || !$title || !$description || !$field) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT student_id, attachment_path
        FROM projects
        WHERE id = ?
    ");
    $stmt->execute([$projectId]);
    $project = $stmt->fetch();

    if (!$project) {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found']);
        exit;
    }

    if ((int)$project['student_id'] !== (int)$_SESSION['user_id']) {
        http_response_code(403);
        echo json_encode(['error' => 'You cannot edit this project']);
        exit;
    }

    $attachmentPath = $project['attachment_path'];

    if (!empty($_FILES['attachment']['name'])) {
        $uploadDir = __DIR__ . '/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (!empty($attachmentPath)) {
            $oldPath = __DIR__ . '/' . ltrim($attachmentPath, '/');
            if (file_exists($oldPath)) {
                @unlink($oldPath);
            }
        }

        $originalName = basename($_FILES['attachment']['name']);
        $safeName     = time() . '_' . preg_replace('/[^A-Za-z0-9_\.-]/', '_', $originalName);
        $targetPath   = $uploadDir . $safeName;

        if (move_uploaded_file($_FILES['attachment']['tmp_name'], $targetPath)) {
            $attachmentPath = 'uploads/' . $safeName;
        }
    }

    $stmt = $pdo->prepare("
        UPDATE projects
        SET title = ?, field = ?, description = ?, attachment_path = ?
        WHERE id = ?
    ");
    $stmt->execute([$title, $field, $description, $attachmentPath, $projectId]);

    echo json_encode(['message' => 'Project updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to update project',
        'details' => $e->getMessage()
    ]);
}