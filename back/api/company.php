<?php
require_once '../database/database.php';

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

