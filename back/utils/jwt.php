<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require '../vendor/autoload.php';
function getJWT():string{
    $key = 'example_key';
    $payload = [
        'iss' => 'http://example.org',
        'aud' => 'http://example.com',
        'iat' => 1356999524,
        'nbf' => 1357000000
    ];
    $jwt = JWT::encode($payload, $key, 'HS256');
    return $jwt;
}
