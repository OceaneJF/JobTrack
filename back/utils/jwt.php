<?php

use Cassandra\Date;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require '../vendor/autoload.php';
function getJWT(): string
{
    $env = parse_ini_file('../.env');
    $key = $env['SECRET'];
    $payload = [
        'iss' => 'https://jobtrack.oceane-jf.fr',
        'aud' => 'https://jobtrack.oceane-jf.fr',
        'iat' => time(),
        'exp' => time() + 24 * 3600,
    ];
    $jwt = JWT::encode($payload, $key, 'HS256');
    return $jwt;
}

function expiredJWT(string $jwt): bool
{
    try {
        $env = parse_ini_file('../.env');
        $key = $env['SECRET'];
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        $decoded_array = (array)$decoded;
        return $decoded_array['iat'] > $decoded_array['exp'];
    } catch (ExpiredException $e) {
        return true;
    }
}

function decodeJWT(string $jwt): array
{
    $env = parse_ini_file('../.env');
    $key = $env['SECRET'];
    $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
    $decoded_array = (array)$decoded;
    return $decoded_array;
}
