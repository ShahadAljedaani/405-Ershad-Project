<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php'; 

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'supervisor') {
    http_response_code(401);
    echo json_encode(['error' => 'Not authorized']);
    exit;
}

$supervisorId = (int) $_SESSION['user_id'];

$sql = "
    SELECT 
        p.id,
        p.title,
        p.field,
        p.status,
        p.created_at,
        s.name AS student_name
    FROM projects p
    JOIN users s ON p.student_id = s.id
    WHERE p.supervisor_id = ?
    ORDER BY p.created_at DESC
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$supervisorId]);
    $projects = $stmt->fetchAll();

    echo json_encode(['projects' => $projects]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to load projects',
        'details' => $e->getMessage()
    ]);
}