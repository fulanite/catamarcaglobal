<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') exit(1);
$config = require ($argv[1] ?? '');
$db = $config['db'];
$pdo = new PDO(
    'mysql:host=' . $db['host'] . ';port=' . (int)($db['port'] ?? 3306) . ';dbname=' . $db['name'] . ';charset=utf8mb4',
    $db['user'], $db['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);
$before = (int)$pdo->query('SELECT COUNT(*) FROM evaluaciones')->fetchColumn();
$historyBefore = (int)$pdo->query('SELECT COUNT(*) FROM evaluaciones_historial')->fetchColumn();
try {
    $pdo->beginTransaction();
    $instance = $pdo->query('SELECT instancia FROM evaluacion_control WHERE id = 1 FOR UPDATE')->fetchColumn();
    $insert = $pdo->prepare('INSERT INTO evaluaciones_historial (instancia,instancia_nombre,id,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado,creado,actualizado) SELECT ?,?,id,jurado,fecha,comision,delegacion,puntajes,puntaje,fortaleza,observacion,candidata,estado,creado,actualizado FROM evaluaciones');
    $insert->execute([$instance, 'Prueba reversible']);
    $pdo->exec('DELETE FROM evaluaciones');
    if ((int)$pdo->query('SELECT COUNT(*) FROM evaluaciones')->fetchColumn() !== 0) throw new RuntimeException('Las fichas no se vaciaron en la transacción.');
    $pdo->rollBack();
    $after = (int)$pdo->query('SELECT COUNT(*) FROM evaluaciones')->fetchColumn();
    $historyAfter = (int)$pdo->query('SELECT COUNT(*) FROM evaluaciones_historial')->fetchColumn();
    if ($before !== $after || $historyBefore !== $historyAfter) throw new RuntimeException('La reversión no conservó las fichas.');
    echo "Prueba de archivado: OK; reversión: OK; fichas conservadas: $after\n";
} catch (Throwable $error) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    fwrite(STDERR, "Prueba de archivado: error\n");
    exit(1);
}
