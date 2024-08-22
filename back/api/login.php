<?php
require_once '../database/database.php';
require_once '../utils/jwt.php';

global $pdo;

try {
//    header('Content-type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare('SELECT * FROM `users` WHERE `email`=:email ');
    $stmt->execute(array(':email' => $data['email']));
    $users = $stmt->fetchAll();
    if (count($users) == 0) {
        echo json_encode(array('status' => 'failed'));
        exit();
    }
    if (!password_verify($data['password'], $users[0]['password'])) {
        echo json_encode(array('error' => 'Wrong password'));
        exit();
    }
    echo json_encode(array('jwt' => getJWT()));
} catch (PDOException $e) {
    echo json_encode('Vous avez deja un compte');
}

