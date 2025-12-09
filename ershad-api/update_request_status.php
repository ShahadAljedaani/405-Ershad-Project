<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

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

$supervisorId = (int) $_SESSION['user_id'];

$data   = json_decode(file_get_contents("php://input"), true);
$reqId  = $data['request_id'] ?? null;
$status = $data['status'] ?? null;

if (!$reqId || !in_array($status, ['accepted', 'rejected'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

// 1) Make sure this request belongs to this supervisor
$stmt = $pdo->prepare("
    SELECT project_id
    FROM supervisor_requests
    WHERE id = ? AND supervisor_id = ?
");
$stmt->execute([$reqId, $supervisorId]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    http_response_code(403);
    echo json_encode(['error' => 'You cannot modify this request']);
    exit;
}

$projectId = $row['project_id'];

// 2) Update the request status
$stmt = $pdo->prepare("
    UPDATE supervisor_requests
    SET status = ?
    WHERE id = ?
");
$stmt->execute([$status, $reqId]);

// 3) Reflect this on the project card for the student
if ($projectId) {
    if ($status === 'accepted') {
        // project is accepted and linked to this supervisor
        $stmt = $pdo->prepare("
            UPDATE projects
            SET status = 'assigned', supervisor_id = ?
            WHERE id = ?
        ");
        $stmt->execute([$supervisorId, $projectId]);
    } else if ($status === 'rejected') {
        // you can choose your own policy here
        // e.g. mark project as 'rejected' OR keep it as 'pending_review'
        $stmt = $pdo->prepare("
            UPDATE projects
            SET status = 'rejected'
            WHERE id = ?
        ");
        $stmt->execute([$projectId]);
    }
}

echo json_encode(['message' => 'Status updated']);