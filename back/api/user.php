<?php
require_once '../database/database.php';
require_once '../utils/jwt.php';

header('Content-type: application/json');
if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
    echo json_encode(['status' => false, 'message' => "Unauthorized Access!"]);
    header('HTTP/1.1 401 Unauthorized');
    exit();
}
$token = trim(explode("Bearer", $_SERVER['HTTP_AUTHORIZATION'])[1]);
if (expiredJWT($token)) {
    echo json_encode(['status' => false, 'message' => "Unauthorized Access!"]);
    header('HTTP/1.1 401 Unauthorized');
    exit();
}

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
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $files = $_FILES;
        $uri = $_SERVER['REQUEST_URI'];
        $stmt = $pdo->prepare('SELECT cv FROM  users WHERE id=:id');
        $stmt->execute(array(
            ':id' => explode("/", $uri)[3]
        ));
        $cv = $stmt->fetch(PDO::FETCH_ASSOC);
        if (isset($cv['cv'])) {
            $cv['cv'] = base64_encode($cv['cv']);
        }
        echo json_encode($cv);
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}
