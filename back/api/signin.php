<?php
require_once '../database/database.php';
global $pdo;

try {
    header('Content-type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare('INSERT INTO users (email, password) VALUES (:email, :password)');
    $stmt->execute(array(':email' => $data['email'], ':password' => password_hash($data['password'], PASSWORD_BCRYPT)));
    echo json_encode(array('status' => 'ok'));
} catch (PDOException $e) {
    header('HTTP/1.1 500 Unauthorized');
    echo json_encode(array("error" => "already registered"));
}

