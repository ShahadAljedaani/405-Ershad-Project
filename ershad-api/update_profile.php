<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require 'config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$userId = $_SESSION['user_id'];

$stmt = $pdo->prepare("
    SELECT id, name, email, role, university_id, major, title, expertise
    FROM users
    WHERE id = ?
");
$stmt->execute([$userId]);
$current = $stmt->fetch();

if (!$current) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
}

$role = $current['role'];   

$data = json_decode(file_get_contents("php://input"), true);

$name  = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');

if (!$name || !$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and email are required']);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
$stmt->execute([$email, $userId]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['error' => 'Email already used by another account']);
    exit;
}

if ($role === 'student') {
    $university_id = $data['university_id'] ?? null;
    $major         = $data['major'] ?? null;

    $stmt = $pdo->prepare("
        UPDATE users
        SET name = ?, email = ?, university_id = ?, major = ?
        WHERE id = ?
    ");
    $stmt->execute([$name, $email, $university_id, $major, $userId]);

} elseif ($role === 'supervisor') {
    $title     = $data['title'] ?? null;
    $expertise = $data['expertise'] ?? null;

    $stmt = $pdo->prepare("
        UPDATE users
        SET name = ?, email = ?, title = ?, expertise = ?
        WHERE id = ?
    ");
    $stmt->execute([$name, $email, $title, $expertise, $userId]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid role']);
    exit;
}

$stmt = $pdo->prepare("
    SELECT id, name, email, role, university_id, major, title, expertise
    FROM users
    WHERE id = ?
");
$stmt->execute([$userId]);
$user = $stmt->fetch();

echo json_encode(['message' => 'Profile updated', 'user' => $user]);