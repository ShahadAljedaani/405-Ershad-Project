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

$data      = json_decode(file_get_contents("php://input"), true);
$projectId = (int)($data['project_id'] ?? 0);

if ($projectId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid project id']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT student_id, attachment_path
        FROM projects
        WHERE id = ?
    ");
    $stmt->execute([$projectId]);
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Project not found']);
        exit;
    }

    if ((int)$row['student_id'] !== (int)$_SESSION['user_id']) {
        http_response_code(403);
        echo json_encode(['error' => 'You cannot delete this project']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM supervisor_requests WHERE project_id = ?");
    $stmt->execute([$projectId]);


    $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([$projectId]);

    if (!empty($row['attachment_path'])) {
        $filePath = __DIR__ . '/' . ltrim($row['attachment_path'], '/');
        if (file_exists($filePath)) {
            @unlink($filePath);
        }
    }

    echo json_encode(['message' => 'Project deleted successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to delete project',
        'details' => $e->getMessage()
    ]);
}