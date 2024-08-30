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
try {
    $uri = $_SERVER['REQUEST_URI'];
    $stmt = $pdo->prepare('SELECT * FROM Company WHERE id=:id');
    $stmt->execute(array(':id' => explode("/", $uri)[3]));
    $company = $stmt->fetch(PDO::FETCH_ASSOC);
    if (isset($company['image'])) {
        $company['image'] = base64_encode($company['image']);
    }
    if (isset($company['cv'])) {
        $company['cv'] = base64_encode($company['cv']);
    }
    if (isset($company['cover_letter'])) {
        $company['cover_letter'] = base64_encode($company['cover_letter']);
    }
    if (isset($company['offer_pdf'])) {
        $company['offer_pdf'] = base64_encode($company['offer_pdf']);
    }

    echo json_encode($company);
} catch (PDOException $e) {
    echo json_encode('Error');
}

