<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';
header('Content-Type: application/json');

$stmt = $pdo->query("
  SELECT id, name, email, title, expertise
  FROM users
  WHERE role = 'supervisor'
");

$supervisors = $stmt->fetchAll();

echo json_encode(['supervisors' => $supervisors]);