<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$file = $argv[1] ?? '';
if ($file === '' || !is_file($file)) {
    fwrite(STDERR, "Archivo: no encontrado\n");
    exit(1);
}

$config = require $file;
if (!is_array($config)) {
    fwrite(STDERR, "Archivo: formato inválido\n");
    exit(1);
}
echo "Archivo: OK\n";

$hash = $config['admin_password_hash'] ?? '';
echo 'Hash: ' . (is_string($hash) && (password_get_info($hash)['algo'] ?? null) ? 'OK' : 'pendiente') . "\n";

$db = $config['db'] ?? [];
if (!is_array($db) || !isset($db['host'], $db['name'], $db['user'], $db['password']) || $db['password'] === 'REEMPLAZAR') {
    echo "MySQL: configuración incompleta\n";
    exit(1);
}

try {
    $pdo = new PDO(
        'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
        $db['user'],
        $db['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $pdo->query('SELECT 1 FROM evaluaciones LIMIT 1');
    echo "MySQL y tabla: OK\n";
    $pdo->beginTransaction();
    $id = sprintf('%s-%s-4%s-8%s-%s', bin2hex(random_bytes(4)), bin2hex(random_bytes(2)), bin2hex(random_bytes(2)), bin2hex(random_bytes(2)), bin2hex(random_bytes(6)));
    $stmt = $pdo->prepare('INSERT INTO evaluaciones (id,token_hash,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
    $stmt->execute([$id, hash('sha256', $id), 'Verificación técnica', date('Y-m-d'), '', '', '{}', null, '', '', null, 'borrador']);
    $pdo->rollBack();
    echo "Escritura transaccional: OK (revertida)\n";
} catch (Throwable $error) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    echo 'MySQL y tabla: error (' . $error->getCode() . ")\n";
    exit(1);
}
