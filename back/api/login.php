<?php
require_once '../database/database.php';
require_once '../utils/jwt.php';

global $pdo;

try {
    header('Content-type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare('SELECT * FROM `users` WHERE `email`=:email ');
    $stmt->execute(array(':email' => $data['email']));
    $users = $stmt->fetchAll();
    if (count($users) == 0) {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(array('status' => 'failed'));
        exit();
    }
    if (!password_verify($data['password'], $users[0]['password'])) {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(array('error' => 'Wrong password'));
        exit();
    }
    echo json_encode(array('jwt' => getJWT(), 'user_id' => $users[0]['id']));
} catch (PDOException $e) {
    echo json_encode('Vous avez deja un compte');
}

