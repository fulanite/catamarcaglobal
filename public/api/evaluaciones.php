<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
http_response_code(410);
echo json_encode(['error' => 'La carga de evaluaciones se realiza desde coordinación.'], JSON_UNESCAPED_UNICODE);
