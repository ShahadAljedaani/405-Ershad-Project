<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role     = $data['role'] ?? '';

$university_id = $data['university_id'] ?? null;
$major         = $data['major'] ?? null;
$title         = $data['title'] ?? null;
$expertise     = $data['expertise'] ?? null;

if (!$name || !$email || !$password || !$role) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'Email already registered']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
    INSERT INTO users (name, email, password_hash, role, university_id, major, title, expertise)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->execute([
    $name,
    $email,
    $hash,
    $role,
    $university_id,
    $major,
    $title,
    $expertise
]);

echo json_encode(['message' => 'User registered successfully']);
