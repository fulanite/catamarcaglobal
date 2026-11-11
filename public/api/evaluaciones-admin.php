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

function nuevoId(): string {
    $raw = bin2hex(random_bytes(16));
    return substr($raw, 0, 8) . '-' . substr($raw, 8, 4) . '-' . substr($raw, 12, 4) . '-' . substr($raw, 16, 4) . '-' . substr($raw, 20, 12);
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
$hashFile = dirname($configFile) . '/cata-evaluacion-admin.hash';
$adminHash = is_file($hashFile) ? trim((string)file_get_contents($hashFile)) : (string)$config['admin_password_hash'];
if (!(password_get_info($adminHash)['algo'] ?? null)) {
    responder(503, ['error' => 'La clave de coordinación necesita revisión en el servidor.']);
}

$secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
ini_set('session.use_strict_mode', '1');
ini_set('session.gc_maxlifetime', '28800');
session_name('cata_modelo_onu_coordinacion');
session_set_cookie_params(['lifetime' => 0, 'path' => '/api/', 'secure' => $secure, 'httponly' => true, 'samesite' => 'Strict']);
session_start();

function autorizado(): bool {
    global $adminHash;
    $since = $_SESSION['admin_since'] ?? null;
    $fingerprint = $_SESSION['admin_hash'] ?? '';
    return is_int($since) && $since > time() - 8 * 3600
        && is_string($fingerprint) && hash_equals(hash('sha256', $adminHash), $fingerprint);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) responder(413, ['error' => 'Solicitud demasiado extensa.']);
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    if (!is_array($data)) responder(400, ['error' => 'Solicitud inválida.']);
    $action = $data['action'] ?? '';
    if ($action === 'logout') {
        $_SESSION = [];
        session_destroy();
        responder(200, ['ok' => true]);
    }
    if ($action === 'cambiar_clave') {
        if (!autorizado()) responder(401, ['error' => 'Volvé a ingresar a coordinación.']);
        $actual = $data['actual'] ?? null;
        $nueva = $data['nueva'] ?? null;
        $confirmacion = $data['confirmacion'] ?? null;
        if (!is_string($actual) || !password_verify($actual, $adminHash)) {
            usleep(350000);
            responder(401, ['error' => 'La clave actual no coincide.']);
        }
        if (!is_string($nueva) || !is_string($confirmacion) || $nueva !== $confirmacion
            || mb_strlen($nueva) < 16 || strlen($nueva) > 72) {
            responder(400, ['error' => 'La nueva clave debe coincidir en ambos campos y tener entre 16 caracteres y 72 bytes.']);
        }
        try {
            $nuevoHash = password_hash($nueva, PASSWORD_DEFAULT);
            $temp = tempnam(dirname($configFile), '.cata-admin-');
            if ($temp === false) throw new RuntimeException('No se pudo crear el archivo temporal.');
            if (dirname($temp) !== dirname($configFile) || !chmod($temp, 0600)) {
                @unlink($temp);
                throw new RuntimeException('No se pudo proteger el archivo temporal.');
            }
            if (file_put_contents($temp, $nuevoHash . "\n", LOCK_EX) === false || !rename($temp, $hashFile)) {
                @unlink($temp);
                throw new RuntimeException('No se pudo guardar el hash.');
            }
            $_SESSION = [];
            session_destroy();
            responder(200, ['ok' => true]);
        } catch (Throwable $error) {
            error_log('Cambio de clave Modelo ONU: ' . $error->getMessage());
            responder(500, ['error' => 'No se pudo cambiar la clave. La anterior sigue vigente.']);
        }
    }
    if ($action === 'guardar_ficha' || $action === 'eliminar_ficha') {
        if (!autorizado()) responder(401, ['error' => 'Volvé a ingresar a coordinación.']);
        $instancia = $data['instancia'] ?? null;
        if (!is_string($instancia) || !preg_match('/^[0-9a-fA-F-]{36}$/', $instancia)) responder(400, ['error' => 'Instancia inválida.']);
        $id = $data['id'] ?? null;
        if ($id !== null && (!is_string($id) || !preg_match('/^[0-9a-fA-F-]{36}$/', $id))) responder(400, ['error' => 'Ficha inválida.']);
        if ($action === 'eliminar_ficha' && $id === null) responder(400, ['error' => 'Ficha inválida.']);
        if ($action === 'guardar_ficha') {
            $jurado = $data['jurado'] ?? null;
            $delegacion = $data['delegacion'] ?? null;
            $comision = $data['comision'] ?? null;
            $fecha = $data['fecha'] ?? null;
            $jurados = ['Carmen', 'Eugenia', 'Ana Laura', 'Marina'];
            $delegaciones = ['Afganistán','Alemania','Argentina','Brasil','Canadá','Colombia','España','Estados Unidos','Francia','Italia','Jordania','Marruecos','México','Rusia','Siria','Sudán','Turquía','Ucrania','Venezuela'];
            if (!is_string($jurado) || !in_array($jurado, $jurados, true)
                || !is_string($delegacion) || !in_array($delegacion, $delegaciones, true)) responder(400, ['error' => 'Seleccioná un jurado y una delegación válidos.']);
            if (!is_string($comision) || trim($comision) === '' || mb_strlen($comision) > 120) responder(400, ['error' => 'Ingresá la comisión.']);
            $fechaObj = is_string($fecha) ? DateTimeImmutable::createFromFormat('!Y-m-d', $fecha) : false;
            if (!$fechaObj || $fechaObj->format('Y-m-d') !== $fecha) responder(400, ['error' => 'Fecha inválida.']);
            $fortaleza = $data['fortaleza'] ?? '';
            $observacion = $data['observacion'] ?? '';
            if (!is_string($fortaleza) || mb_strlen($fortaleza) > 1000 || !is_string($observacion) || mb_strlen($observacion) > 2000) responder(400, ['error' => 'Las observaciones son demasiado largas.']);
            $candidata = $data['candidata'] ?? null;
            if ($candidata !== null && !is_bool($candidata)) responder(400, ['error' => 'Candidatura inválida.']);
            $pesos = ['negociacion'=>18,'preparacion'=>14,'representacion'=>14,'argumentacion'=>14,'comunicacion'=>10,'procedimiento'=>10,'equipo'=>9,'resolucion'=>5,'vestimenta'=>3,'redactora'=>3];
            $puntajes = $data['puntajes'] ?? null;
            if (!is_array($puntajes) || count($puntajes) !== count($pesos) || array_diff(array_keys($puntajes), array_keys($pesos))) responder(400, ['error' => 'Completá los diez criterios.']);
            $total = 0.0;
            foreach ($pesos as $criterio => $peso) {
                $valor = $puntajes[$criterio] ?? null;
                if (!is_int($valor) || $valor < 1 || $valor > 4) responder(400, ['error' => 'Puntaje inválido.']);
                $total += $valor * $peso / 4;
            }
        }
        try {
            $db = $config['db'];
            $pdo = new PDO(
                'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
                $db['user'], $db['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false]
            );
            $pdo->beginTransaction();
            $actual = $pdo->query('SELECT instancia FROM evaluacion_control WHERE id = 1 FOR UPDATE')->fetchColumn();
            if ($actual === false || !hash_equals((string)$actual, $instancia)) {
                $pdo->rollBack();
                responder(409, ['error' => 'La instancia cambió. Actualizá la página antes de continuar.']);
            }
            if ($action === 'eliminar_ficha') {
                $stmt = $pdo->prepare('DELETE FROM evaluaciones WHERE id = ?');
                $stmt->execute([$id]);
                if ($stmt->rowCount() !== 1) {
                    $pdo->rollBack();
                    responder(404, ['error' => 'La ficha ya no existe.']);
                }
            } else {
                $duplicado = $pdo->prepare('SELECT id FROM evaluaciones WHERE jurado = ? AND delegacion = ? AND id <> ? LIMIT 1');
                $duplicado->execute([$jurado, $delegacion, $id ?? '']);
                if ($duplicado->fetchColumn() !== false) {
                    $pdo->rollBack();
                    responder(409, ['error' => 'Ya existe una ficha de ese jurado para esa delegación. Editá la ficha existente.']);
                }
                $valores = [$jurado, $fecha, trim($comision), $delegacion, json_encode($puntajes, JSON_THROW_ON_ERROR), round($total, 2), trim($fortaleza), trim($observacion), $candidata === null ? null : (int)$candidata];
                if ($id === null) {
                    $id = nuevoId();
                    $tokenHash = hash('sha256', random_bytes(32));
                    $stmt = $pdo->prepare("INSERT INTO evaluaciones (id,token_hash,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,'final')");
                    $stmt->execute(array_merge([$id, $tokenHash], $valores));
                } else {
                    $stmt = $pdo->prepare("UPDATE evaluaciones SET jurado=?,fecha=?,comision=?,delegacion=?,puntajes=?,puntaje=?,fortaleza=?,observacion=?,candidata=?,estado='final' WHERE id=?");
                    $stmt->execute(array_merge($valores, [$id]));
                    if ($stmt->rowCount() === 0) {
                        $exists = $pdo->prepare('SELECT id FROM evaluaciones WHERE id = ?');
                        $exists->execute([$id]);
                        if ($exists->fetchColumn() === false) {
                            $pdo->rollBack();
                            responder(404, ['error' => 'La ficha ya no existe.']);
                        }
                    }
                }
            }
            $pdo->commit();
            responder(200, ['ok' => true, 'id' => $id]);
        } catch (Throwable $error) {
            if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
            error_log('Carga coordinación Modelo ONU: ' . $error->getMessage());
            responder(500, ['error' => 'No se pudo guardar el cambio. Probá nuevamente.']);
        }
    }
    if ($action === 'cerrar_instancia') {
        if (!autorizado()) responder(401, ['error' => 'Volvé a ingresar a coordinación.']);
        $password = $data['password'] ?? null;
        if (!is_string($password) || !password_verify($password, $adminHash)) {
            usleep(350000);
            responder(401, ['error' => 'La clave de coordinación no coincide.']);
        }
        $esperada = $data['instancia'] ?? null;
        $cantidad = $data['cantidad'] ?? null;
        $nombreArchivo = $data['nombre_archivo'] ?? null;
        $nombreNueva = $data['nombre_nueva'] ?? null;
        if (!is_string($esperada) || !preg_match('/^[0-9a-fA-F-]{36}$/', $esperada)
            || !is_int($cantidad) || $cantidad < 0
            || !is_string($nombreArchivo) || trim($nombreArchivo) === '' || mb_strlen($nombreArchivo) > 120
            || !is_string($nombreNueva) || trim($nombreNueva) === '' || mb_strlen($nombreNueva) > 120) {
            responder(400, ['error' => 'Revisá los nombres y actualizá el listado antes de cerrar la instancia.']);
        }
        try {
            $db = $config['db'];
            $pdo = new PDO(
                'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
                $db['user'], $db['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
            $pdo->beginTransaction();
            $control = $pdo->query('SELECT instancia FROM evaluacion_control WHERE id = 1 FOR UPDATE')->fetch(PDO::FETCH_ASSOC);
            if (!$control || !hash_equals((string)$control['instancia'], $esperada)) {
                $pdo->rollBack();
                responder(409, ['error' => 'La instancia cambió. Actualizá el listado antes de continuar.']);
            }
            $actuales = (int)$pdo->query('SELECT COUNT(*) FROM evaluaciones')->fetchColumn();
            if ($actuales !== $cantidad) {
                $pdo->rollBack();
                responder(409, ['error' => 'Cambió la cantidad de fichas. Actualizá el listado antes de continuar.']);
            }
            $archivar = $pdo->prepare('INSERT INTO evaluaciones_historial (instancia,instancia_nombre,id,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado,creado,actualizado) SELECT ?,?,id,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado,creado,actualizado FROM evaluaciones');
            $archivar->execute([$esperada, trim($nombreArchivo)]);
            $pdo->exec('DELETE FROM evaluaciones');
            $nueva = nuevoId();
            $cambiar = $pdo->prepare('UPDATE evaluacion_control SET instancia = ?, nombre = ?, iniciada = CURRENT_TIMESTAMP WHERE id = 1');
            $cambiar->execute([$nueva, trim($nombreNueva)]);
            $pdo->commit();
            responder(200, ['ok' => true, 'archivadas' => $actuales]);
        } catch (Throwable $error) {
            if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
            error_log('Cerrar instancia Modelo ONU: ' . $error->getMessage());
            responder(500, ['error' => 'No se pudo cerrar la instancia. Las fichas permanecen activas.']);
        }
    }
    if ($action === 'eliminar_historial') {
        if (!autorizado()) responder(401, ['error' => 'Volvé a ingresar a coordinación.']);
        $password = $data['password'] ?? null;
        if (!is_string($password) || !password_verify($password, $adminHash)) {
            usleep(350000);
            responder(401, ['error' => 'La clave de coordinación no coincide.']);
        }
        $instancia = $data['instancia'] ?? null;
        $cantidad = $data['cantidad'] ?? null;
        if (!is_string($instancia) || !preg_match('/^[0-9a-fA-F-]{36}$/', $instancia)
            || !is_int($cantidad) || $cantidad < 1
            || ($data['confirmacion'] ?? null) !== 'ELIMINAR HISTORIAL') {
            responder(400, ['error' => 'Revisá la confirmación y actualizá el historial antes de continuar.']);
        }
        try {
            $db = $config['db'];
            $pdo = new PDO(
                'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
                $db['user'], $db['password'],
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]
            );
            $pdo->beginTransaction();
            $actual = $pdo->query('SELECT instancia FROM evaluacion_control WHERE id = 1 FOR UPDATE')->fetchColumn();
            if ($actual === false || !hash_equals((string)$actual, $instancia)) {
                $pdo->rollBack();
                responder(409, ['error' => 'La instancia activa cambió. Actualizá antes de continuar.']);
            }
            $archivadas = (int)$pdo->query('SELECT COUNT(*) FROM evaluaciones_historial')->fetchColumn();
            if ($archivadas !== $cantidad) {
                $pdo->rollBack();
                responder(409, ['error' => 'Cambió el historial. Actualizá antes de continuar.']);
            }
            $pdo->exec('DELETE FROM evaluaciones_historial');
            $pdo->commit();
            responder(200, ['ok' => true, 'eliminadas' => $archivadas]);
        } catch (Throwable $error) {
            if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
            error_log('Eliminar historial Modelo ONU: ' . $error->getMessage());
            responder(500, ['error' => 'No se pudo eliminar el historial. Probá nuevamente.']);
        }
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
    if (!password_verify($password, $adminHash)) {
        $attempts = (int)($_SESSION['attempts'] ?? 0) + 1;
        $_SESSION['attempts'] = $attempts;
        if ($attempts >= 5) $_SESSION['blocked_until'] = time() + 600;
        usleep(350000);
        responder(401, ['error' => 'Clave incorrecta.']);
    }
    session_regenerate_id(true);
    $_SESSION['admin_since'] = time();
    $_SESSION['admin_hash'] = hash('sha256', $adminHash);
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
    $control = $pdo->query('SELECT instancia,nombre,iniciada FROM evaluacion_control WHERE id = 1')->fetch(PDO::FETCH_ASSOC);
    if (!$control) responder(503, ['error' => 'Falta configurar la instancia de evaluación.']);
    $historialRows = $pdo->query('SELECT instancia,instancia_nombre,archivado,id,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado,creado,actualizado FROM evaluaciones_historial ORDER BY fecha DESC,archivado DESC,id DESC')->fetchAll();
    $historial = array_map(static function (array $row): array {
        $scores = json_decode((string)$row['puntajes'], true);
        return [
            'instancia' => $row['instancia'],
            'instancia_nombre' => $row['instancia_nombre'],
            'archivado' => $row['archivado'],
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
    }, $historialRows);
    responder(200, ['ok' => true, 'fichas' => $fichas, 'historial' => $historial, 'instancia' => $control]);
} catch (Throwable $error) {
    error_log('Consulta coordinación Modelo ONU: ' . $error->getMessage());
    responder(500, ['error' => 'No se pudieron cargar las fichas. Probá nuevamente.']);
}
