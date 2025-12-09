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
    $safeName     = time() . '_' . preg_replace('/[^A-Za-z0-9_\.-]/', '_', $originalName);
    $targetPath   = $uploadDir . $safeName;

    if (move_uploaded_file($_FILES['attachment']['tmp_name'], $targetPath)) {
        $attachmentPath = 'uploads/' . $safeName;  // relative path
    }
}

try {
    // ✅ IMPORTANT: insert with an initial status so the dashboard can show it
    // Make sure your `projects` table has a `status` column (e.g. VARCHAR)
    // and optionally a `supervisor_id` column.
    $stmt = $pdo->prepare("
        INSERT INTO projects (student_id, title, field, description, attachment_path, status)
        VALUES (?, ?, ?, ?, ?, 'pending_review')
    ");

    $stmt->execute([
        $studentId,
        $title,
        $field,
        $description,
        $attachmentPath
    ]);

    $projectId = $pdo->lastInsertId();

    // Find supervisors whose expertise matches this field
    $stmtSup = $pdo->prepare("
        SELECT id, name, expertise
        FROM users
        WHERE role = 'supervisor'
          AND expertise LIKE :field
    ");

    $stmtSup->execute([
        ':field' => '%' . $field . '%'
    ]);

    $supervisors   = $stmtSup->fetchAll(PDO::FETCH_ASSOC);
    $matchedCount  = count($supervisors);

    // Create a supervisor_request for each matching supervisor,
    // and link the project via project_id (you already do this ✅)
    if ($matchedCount > 0) {
        $stmtReq = $pdo->prepare("
            INSERT INTO supervisor_requests (student_id, supervisor_id, project_id, message, status)
            VALUES (?, ?, ?, ?, 'pending')
        ");

        foreach ($supervisors as $sup) {
            $stmtReq->execute([
                $studentId,
                $sup['id'],
                $projectId,
                "New project idea: " . $title
            ]);
        }
    }

    echo json_encode([
        'message'          => 'Project idea submitted successfully.',
        'project_id'       => $projectId,
        'supervisor_count' => $matchedCount
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error'   => 'Failed to create project',
        'details' => $e->getMessage()
    ]);
}