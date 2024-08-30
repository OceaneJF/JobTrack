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

function getAllCompanies()
{
    global $pdo;
    try {
        $uri = $_SERVER['REQUEST_URI'];
        $stmt = $pdo->prepare('SELECT * FROM `Company` WHERE `company_user_id`=:userId');
        $stmt->execute(array(':userId' => explode("/", $uri)[3]));
        $company = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($company as &$item) {
            if (isset($item['image'])) {
                $item['image'] = base64_encode($item['image']);
            }
            if (isset($item['cv'])) {
                $item['cv'] = base64_encode($item['cv']);
            }
            if (isset($item['cover_letter'])) {
                $item['cover_letter'] = base64_encode($item['cover_letter']);
            }
            if (isset($item['offer_pdf'])) {
                $item['offer_pdf'] = base64_encode($item['offer_pdf']);
            }
        }
        echo json_encode($company);
    } catch (PDOException $e) {
        echo json_encode('Error');
    }
}

function postCompany()
{
    global $pdo;
    try {
        $data = $_POST;
        $files = $_FILES;

        $fieldsToInsert = [];
        $placeholders = [];
        $params = [];

        $fields = [
            'company_user_id',
            'name',
            'description',
            'image',
            'address',
            'email',
            'phone',
            'linkedin',
            'applied_at',
            'answered_at',
            'job_title',
            'cv',
            'cover_letter',
            'offer_link',
            'offer_pdf'
        ];

        foreach ($fields as $field) {
            if (isset($files[$field])) {
                if (in_array($field, ['image', 'cv', 'cover_letter', 'offer_pdf'])) {
                    if ($files[$field]['tmp_name'] != '') {
                        $fieldsToInsert[] = $field;
                        $placeholders[] = ":$field";
                        $params[":$field"] = file_get_contents($files[$field]['tmp_name']);
                    }
                }
            } elseif (isset($data[$field])) {
                $fieldsToInsert[] = $field;
                $placeholders[] = ":$field";
                $params[":$field"] = $data[$field];
            }
        }

        $sql = 'INSERT INTO Company (' . implode(', ', $fieldsToInsert) . ') VALUES (' . implode(', ', $placeholders) . ')';

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(array('status' => 'ok'));
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}

function patchCompany()
{
    global $pdo;
    try {
        $data = file_get_contents('php://input');
        $boundary = substr($data, 0, strpos($data, "\r\n"));

        $parts = array_slice(explode($boundary, $data), 1);
        $data = [];

        foreach ($parts as $part) {
            if ($part == "--\r\n") {
                break;
            }

            $part = trim($part);
            $headersEndPos = strpos($part, "\r\n\r\n");
            $headers = substr($part, 0, $headersEndPos);
            $body = substr($part, $headersEndPos + 4);

            if (preg_match('/name="([^"]+)"/', $headers, $matches)) {
                $name = $matches[1];

                if (strpos($headers, 'filename') !== false) {
                    $tmp_name = tempnam(sys_get_temp_dir(), 'upload_');
                    file_put_contents($tmp_name, $body);
                    $data[$name] = $tmp_name;
                } else {
                    $data[$name] = trim($body);
                }
            }
        }

        $fieldsToUpdate = [];
        $params = [];

        $fields = [
            'company_user_id',
            'name',
            'description',
            'image',
            'address',
            'email',
            'phone',
            'linkedin',
            'applied_at',
            'answered_at',
            'job_title',
            'cv',
            'cover_letter',
            'offer_link',
            'offer_pdf'
        ];

        foreach ($fields as $field) {
            if (isset($data[$field])) {
                if (in_array($field, ['image', 'cv', 'cover_letter', 'offer_pdf'])) {
                    $fieldsToUpdate[] = "$field = :$field";
                    $params[":$field"] = file_get_contents($data[$field]);
                } else {
                    $fieldsToUpdate[] = "$field = :$field";
                    $params[":$field"] = $data[$field];
                }
            }
        }

        $uri = $_SERVER['REQUEST_URI'];
        $params[':id'] = explode("/", $uri)[3];

        $sql = 'UPDATE Company SET ' . implode(', ', $fieldsToUpdate) . ' WHERE id = :id';

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(array('status' => 'ok'));
    } catch (PDOException $e) {
        echo json_encode($e->getMessage());
    }
}

function deleteCompany()
{
    global $pdo;
    try {
        $uri = $_SERVER['REQUEST_URI'];
        $stmt = $pdo->prepare('DELETE FROM Company WHERE id=:id');
        $stmt->execute(array(':id' => explode("/", $uri)[3]));
        echo json_encode(array('status' => 'ok'));
    } catch (PDOException $e) {
        echo json_encode('Error');
    }
}


switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getAllCompanies();
        break;
    case 'POST':
        postCompany();
        break;
    case 'PATCH':
        patchCompany();
        break;
    case 'DELETE':
        deleteCompany();
        break;
}