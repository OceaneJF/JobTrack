<?php
require_once '../database/database.php';

global $pdo;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $files = $_FILES;
        $uri = $_SERVER['REQUEST_URI'];
        $stmt = $pdo->prepare('UPDATE users SET cv=:cv WHERE id=:id');
        $stmt->execute(array(
            ':cv' => file_get_contents($files['cv']['tmp_name']),
            ':id' => explode("/", $uri)[3]
        ));
        echo json_encode(array('status' => 'ok'));
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    try {
        $files = $_FILES;
        $uri = $_SERVER['REQUEST_URI'];
        $stmt = $pdo->prepare('UPDATE users SET cv=:cv WHERE id=:id');
        $stmt->execute(array(
            ':cv' => null,
            ':id' => explode("/", $uri)[3]
        ));
        echo json_encode(array('status' => 'ok'));
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}
