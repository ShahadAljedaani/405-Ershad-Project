<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';   

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$supervisorId = (int) $_SESSION['user_id'];

$stmt = $pdo->prepare("SELECT role FROM users WHERE id = ?");
$stmt->execute([$supervisorId]);
$me = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$me || $me['role'] !== 'supervisor') {
    http_response_code(403);
    echo json_encode(['error' => 'Only supervisors can view this']);
    exit;
}

$stmt = $pdo->prepare("
  SELECT
    r.id,
    r.status,
    r.message,
    r.created_at,
    r.project_id,

    u.name          AS student_name,
    u.university_id AS student_university_id,
    u.major         AS student_major,
    u.email         AS student_email,

    p.title           AS project_title,
    p.field           AS project_field,
    p.description     AS project_description,
    p.attachment_path AS attachment_path
  FROM supervisor_requests r
  JOIN users u      ON r.student_id = u.id
  LEFT JOIN projects p ON p.id = r.project_id
  WHERE r.supervisor_id = ?
  ORDER BY r.created_at DESC
");
$stmt->execute([$supervisorId]);

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$requests = [];
foreach ($rows as $row) {
    $requests[] = [
        'id'                     => (int)$row['id'],
        'status'                 => $row['status'],
        'message'                => $row['message'],
        'created_at'             => $row['created_at'],
        'project_id'             => $row['project_id'] !== null ? (int)$row['project_id'] : null,

        'student_name'           => $row['student_name'],
        'student_university_id'  => $row['student_university_id'],
        'student_major'          => $row['student_major'],
        'student_email'          => $row['student_email'],

        'project_title'          => $row['project_title'],
        'project_field'          => $row['project_field'],
        'project_description'    => $row['project_description'],
        'attachment_path'        => $row['attachment_path'],
    ];
}

echo json_encode(['requests' => $requests]);