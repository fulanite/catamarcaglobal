<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$configFile = $argv[1] ?? '';
$sqlFile = $argv[2] ?? '';
if (!is_file($configFile) || !is_file($sqlFile)) {
    fwrite(STDERR, "Indicá el archivo de configuración y el SQL de instancias.\n");
    exit(1);
}
$config = require $configFile;
$db = $config['db'];
$pdo = new PDO(
    'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
    $db['user'], $db['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
$sql = preg_replace('/^\s*--.*$/m', '', (string)file_get_contents($sqlFile));
$statements = preg_split('/;\s*(?:\r?\n|$)/', $sql) ?: [];
foreach ($statements as $statement) {
    if (trim($statement) !== '') $pdo->exec($statement);
}
$active = $pdo->query('SELECT nombre FROM evaluacion_control WHERE id = 1')->fetchColumn();
$current = $pdo->query('SELECT COUNT(*) FROM evaluaciones')->fetchColumn();
$history = $pdo->query('SELECT COUNT(*) FROM evaluaciones_historial')->fetchColumn();
echo "Migración: OK\nInstancia activa: $active\nFichas activas: $current\nFichas históricas: $history\n";
