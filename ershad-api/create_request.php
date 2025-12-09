<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
require 'config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$studentId = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"), true);
$supervisorId = $data['supervisor_id'] ?? null;
$message      = trim($data['message'] ?? '');

if (!$supervisorId) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing supervisor_id']);
    exit;
}

$stmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
$stmt->execute([$studentId]);
$row = $stmt->fetch();
if (!$row || $row['role'] !== 'student') {
    http_response_code(403);
    echo json_encode(['error' => 'Only students can send requests']);
    exit;
}

$stmt = $pdo->prepare("
  SELECT id FROM supervisor_requests
  WHERE student_id = ? AND supervisor_id = ? AND status = 'pending'
");
$stmt->execute([$studentId, $supervisorId]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'You already have a pending request to this supervisor']);
    exit;
}

$stmt = $pdo->prepare("
  INSERT INTO supervisor_requests (student_id, supervisor_id, message)
  VALUES (?, ?, ?)
");
$stmt->execute([$studentId, $supervisorId, $message ?: null]);

echo json_encode(['message' => 'Request sent']);