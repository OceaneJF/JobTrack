<?php
$host = "localhost";
$dbname = "jobtrack";
$user = "root";
$password = "";

$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch (PDOException $e) {
//    echo 'Connection failed: ' . $e->getMessage();
}