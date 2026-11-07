<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

function responder(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function mismoOrigen(): bool {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') return true;
    $originHost = parse_url($origin, PHP_URL_HOST);
    $requestHost = parse_url('https://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST);
    return is_string($originHost) && is_string($requestHost) && hash_equals(strtolower($requestHost), strtolower($originHost));
}

if (!in_array($_SERVER['REQUEST_METHOD'] ?? '', ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
    responder(405, ['error' => 'Método no permitido.']);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && !mismoOrigen()) {
    responder(403, ['error' => 'Origen no permitido.']);
}

$configFile = dirname(__DIR__, 2) . '/cata-evaluacion-config.php';
if (!is_file($configFile)) responder(503, ['error' => 'La evaluación todavía no está configurada en el servidor.']);
$config = require $configFile;
if (!is_array($config) || empty($config['db']) || empty($config['admin_password_hash']) || $config['admin_password_hash'] === 'REEMPLAZAR_CON_HASH') {
    responder(503, ['error' => 'Falta configurar la base de datos o el acceso de coordinación.']);
}

$secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
ini_set('session.use_strict_mode', '1');
ini_set('session.gc_maxlifetime', '28800');
session_name('cata_modelo_onu_coordinacion');
session_set_cookie_params(['lifetime' => 0, 'path' => '/api/', 'secure' => $secure, 'httponly' => true, 'samesite' => 'Strict']);
session_start();

function autorizado(): bool {
    $since = $_SESSION['admin_since'] ?? null;
    return is_int($since) && $since > time() - 8 * 3600;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 2048) responder(413, ['error' => 'Solicitud demasiado extensa.']);
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    if (!is_array($data)) responder(400, ['error' => 'Solicitud inválida.']);
    $action = $data['action'] ?? '';
    if ($action === 'logout') {
        $_SESSION = [];
        session_destroy();
        responder(200, ['ok' => true]);
    }
    if ($action !== 'login') responder(400, ['error' => 'Acción inválida.']);
    $password = $data['password'] ?? null;
    if (!is_string($password) || $password === '' || strlen($password) > 512) {
        responder(400, ['error' => 'Ingresá la clave de coordinación.']);
    }
    $blockedUntil = $_SESSION['blocked_until'] ?? 0;
    if (is_int($blockedUntil) && $blockedUntil > time()) {
        responder(429, ['error' => 'Demasiados intentos. Probá nuevamente en unos minutos.']);
    }
    if (!password_verify($password, (string)$config['admin_password_hash'])) {
        $attempts = (int)($_SESSION['attempts'] ?? 0) + 1;
        $_SESSION['attempts'] = $attempts;
        if ($attempts >= 5) $_SESSION['blocked_until'] = time() + 600;
        usleep(350000);
        responder(401, ['error' => 'Clave incorrecta.']);
    }
    session_regenerate_id(true);
    $_SESSION['admin_since'] = time();
    unset($_SESSION['attempts'], $_SESSION['blocked_until']);
    responder(200, ['ok' => true]);
}

if (!autorizado()) responder(401, ['error' => 'Iniciá sesión como coordinación.']);

try {
    $db = $config['db'];
    $pdo = new PDO(
        'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
        $db['user'], $db['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]
    );
    $rows = $pdo->query('SELECT id,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado,creado,actualizado FROM evaluaciones ORDER BY actualizado DESC, id DESC')->fetchAll();
    $fichas = array_map(static function (array $row): array {
        $scores = json_decode((string)$row['puntajes'], true);
        return [
            'id' => $row['id'],
            'jurado' => $row['jurado'],
            'fecha' => $row['fecha'],
            'comision' => $row['comision'],
            'delegacion' => $row['delegacion'],
            'puntajes' => is_array($scores) ? $scores : [],
            'puntaje' => $row['puntaje'] === null ? null : (float)$row['puntaje'],
            'fortaleza' => $row['fortaleza'],
            'observacion' => $row['observacion'],
            'candidata' => $row['candidata'] === null ? null : (bool)$row['candidata'],
            'estado' => $row['estado'],
            'creado' => $row['creado'],
            'actualizado' => $row['actualizado'],
        ];
    }, $rows);
    responder(200, ['ok' => true, 'fichas' => $fichas]);
} catch (Throwable $error) {
    error_log('Consulta coordinación Modelo ONU: ' . $error->getMessage());
    responder(500, ['error' => 'No se pudieron cargar las fichas. Probá nuevamente.']);
}
