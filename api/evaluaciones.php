<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function responder(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
function texto(mixed $value, int $max): string {
    if (!is_string($value) || mb_strlen($value) > $max) responder(400, ['error' => 'Texto inválido o demasiado largo.']);
    return trim($value);
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'GET') {
    $configFile = dirname(__DIR__, 2) . '/cata-evaluacion-config.php';
    if (!is_file($configFile)) responder(503, ['error' => 'La evaluación todavía no está configurada.']);
    $config = require $configFile;
    if (!is_array($config) || empty($config['db'])) responder(503, ['error' => 'Configuración incompleta.']);
    try {
        $db = $config['db'];
        $pdo = new PDO(
            'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
            $db['user'], $db['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $control = $pdo->query('SELECT instancia,nombre FROM evaluacion_control WHERE id = 1')->fetch(PDO::FETCH_ASSOC);
        if (!$control) responder(503, ['error' => 'Falta configurar la instancia de evaluación.']);
        responder(200, ['instancia' => $control['instancia'], 'nombre' => $control['nombre']]);
    } catch (Throwable $error) {
        error_log('Instancia Modelo ONU: ' . $error->getMessage());
        responder(503, ['error' => 'No se pudo consultar la instancia de evaluación.']);
    }
}
if ($method !== 'PUT') responder(405, ['error' => 'Método no permitido.']);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
    responder(403, ['error' => 'Origen no permitido.']);
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) responder(413, ['error' => 'La ficha es demasiado extensa.']);
$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) responder(400, ['error' => 'Solicitud inválida.']);

$id = (string)($data['id'] ?? '');
$token = (string)($data['token'] ?? '');
$instancia = (string)($data['instancia'] ?? '');
if (!preg_match('/^[0-9a-fA-F-]{36}$/', $id) || !preg_match('/^[0-9a-fA-F-]{36}$/', $token)) {
    responder(400, ['error' => 'Identificador de ficha inválido.']);
}
if (!preg_match('/^[0-9a-fA-F-]{36}$/', $instancia)) {
    responder(409, ['error' => 'Actualizá la página para iniciar la instancia de evaluación.']);
}
$jurado = texto($data['jurado'] ?? '', 80);
if ($jurado === '') responder(400, ['error' => 'Escribí el nombre del jurado.']);
$fecha = (string)($data['fecha'] ?? '');
$fechaObj = DateTimeImmutable::createFromFormat('!Y-m-d', $fecha);
if (!$fechaObj || $fechaObj->format('Y-m-d') !== $fecha) responder(400, ['error' => 'Fecha inválida.']);
$comision = texto($data['comision'] ?? '', 120);
$delegacion = texto($data['delegacion'] ?? '', 120);
$delegaciones = ['Alemania','Argentina','Brasil','Canadá','Colombia','España','Estados Unidos','Francia','Italia','Jordania','Marruecos','México','Rusia','Siria','Sudán','Venezuela'];
if ($delegacion !== '' && !in_array($delegacion, $delegaciones, true)) responder(400, ['error' => 'Delegación inválida.']);
$fortaleza = texto($data['fortaleza'] ?? '', 1000);
$observacion = texto($data['observacion'] ?? '', 2000);
$estado = $data['estado'] ?? 'borrador';
if (!in_array($estado, ['borrador', 'final'], true)) responder(400, ['error' => 'Estado inválido.']);
$candidata = $data['candidata'] ?? null;
if ($candidata !== null && !is_bool($candidata)) responder(400, ['error' => 'Candidatura inválida.']);
$pesos = ['negociacion'=>18,'preparacion'=>14,'representacion'=>14,'argumentacion'=>14,'comunicacion'=>10,'procedimiento'=>10,'equipo'=>9,'resolucion'=>5,'vestimenta'=>3,'redactora'=>3];
$puntajes = $data['puntajes'] ?? [];
if (!is_array($puntajes) || array_diff(array_keys($puntajes), array_keys($pesos))) responder(400, ['error' => 'Criterios inválidos.']);
$total = 0.0;
foreach ($puntajes as $criterio => $valor) {
    if (!is_int($valor) || $valor < 1 || $valor > 4) responder(400, ['error' => 'Puntaje inválido.']);
    $total += $valor * $pesos[$criterio] / 4;
}
if ($estado === 'final' && (!$comision || !$delegacion || count($puntajes) !== 10)) responder(400, ['error' => 'Completá todos los datos antes de finalizar.']);
$total = count($puntajes) === 10 ? $total : null;

// La clave privada de la base permanece fuera de public_html.
$configFile = dirname(__DIR__, 2) . '/cata-evaluacion-config.php';
if (!is_file($configFile)) responder(503, ['error' => 'La evaluación todavía no está configurada.']);
$config = require $configFile;
if (!is_array($config) || empty($config['db'])) responder(503, ['error' => 'Configuración incompleta.']);

try {
    $db = $config['db'];
    $pdo = new PDO(
        'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
        $db['user'], $db['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]
    );
    $hash = hash('sha256', $token);
    $pdo->beginTransaction();
    $actual = $pdo->query('SELECT instancia FROM evaluacion_control WHERE id = 1 FOR UPDATE')->fetchColumn();
    if ($actual === false || !hash_equals((string)$actual, $instancia)) {
        $pdo->rollBack();
        responder(409, ['error' => 'Esta ficha pertenece a una instancia anterior. Actualizá la página para comenzar una nueva evaluación.']);
    }
    $find = $pdo->prepare('SELECT token_hash FROM evaluaciones WHERE id = ? FOR UPDATE');
    $find->execute([$id]);
    $existing = $find->fetchColumn();
    if ($existing !== false && !hash_equals((string)$existing, $hash)) {
        $pdo->rollBack();
        responder(403, ['error' => 'Esta ficha pertenece a otro dispositivo.']);
    }
    $values = [$jurado,$fecha,$comision,$delegacion,json_encode($puntajes),$total,$fortaleza,$observacion,$candidata === null ? null : (int)$candidata,$estado];
    if ($existing === false) {
        $stmt = $pdo->prepare('INSERT INTO evaluaciones (id,token_hash,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
        $stmt->execute(array_merge([$id,$hash], $values));
    } else {
        $stmt = $pdo->prepare('UPDATE evaluaciones SET jurado=?,fecha=?,comision=?,delegacion=?,puntajes=?,puntaje=?,fortaleza=?,observacion=?,candidata=?,estado=? WHERE id=?');
        $stmt->execute(array_merge($values, [$id]));
    }
    $time = $pdo->prepare('SELECT actualizado FROM evaluaciones WHERE id = ?');
    $time->execute([$id]);
    $actualizado = $time->fetchColumn();
    $pdo->commit();
    responder(200, ['ok' => true, 'actualizado' => $actualizado]);
} catch (Throwable $error) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    error_log('Evaluaciones Modelo ONU: ' . $error->getMessage());
    responder(500, ['error' => 'No se pudo guardar. Probá nuevamente.']);
}
