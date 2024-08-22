<?php
require '../vendor/autoload.php';
$router = new AltoRouter();

$router->map('POST', '/api/signin', 'signin');
$router->map('POST', '/api/login', 'login');


$match = $router->match();
if (is_array($match)) {
    require "../api/{$match['target']}.php";
}