<?php
require '../vendor/autoload.php';
$router = new AltoRouter();

$router->map('POST', '/api/signin', 'signin');
$router->map('POST', '/api/login', 'login');

$router->map('GET', '/api/companies/[i:user_id]', 'companies');
$router->map('POST', '/api/companies', 'companies');
$router->map('PATCH', '/api/companies/[i:user_id]', 'companies');
$router->map('DELETE', '/api/companies/[i:company_id]', 'companies');


$match = $router->match();
if (is_array($match)) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    require "../api/{$match['target']}.php";
}