<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config.php';

session_unset();
session_destroy();

echo json_encode(['message' => 'Logged out']);
