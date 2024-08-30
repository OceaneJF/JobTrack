<?php
require '../vendor/autoload.php';
$router = new AltoRouter();

$router->map('POST', '/api/signin', 'signin');
$router->map('POST', '/api/login', 'login');

$router->map('GET', '/api/companies/[i:user_id]', 'companies');
$router->map('POST', '/api/companies', 'companies');
$router->map('PATCH', '/api/companies/[i:user_id]', 'companies');
$router->map('DELETE', '/api/companies/[i:company_id]', 'companies');
$router->map('GET', '/api/company/[i:company_id]', 'company');

$router->map('POST', '/api/user/[i:user_id]', 'user');
$router->map('DELETE', '/api/user/[i:user_id]', 'user');

// CORS headers for all requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle OPTIONS method (preflight requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

$match = $router->match();
if (is_array($match)) {
    require "../api/{$match['target']}.php";
}