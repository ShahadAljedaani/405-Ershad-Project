<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';   // CORS headers + session_start + $pdo

// If config.php doesn't already handle OPTIONS, keep this:
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1) Must be logged in *as a student*
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

if (empty($_SESSION['role']) || $_SESSION['role'] !== 'student') {
    http_response_code(403);
    echo json_encode(['error' => 'Only students can view these requests']);
    exit;
}

$studentId = (int) $_SESSION['user_id'];

// 2) Load this student's supervisor requests
//    (matches what your React component expects)
$sql = "
    SELECT
        r.id,
        r.status,
        r.message,
        r.created_at,

        s.name  AS supervisor_name,
        s.title AS supervisor_title,
        s.email AS supervisor_email
    FROM supervisor_requests r
    JOIN users s ON r.supervisor_id = s.id
    WHERE r.student_id = ?
    ORDER BY r.created_at DESC
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$studentId]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['requests' => $requests]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to load requests',
        'details' => $e->getMessage()
    ]);
}