<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

fwrite(STDERR, "Clave de coordinación (mínimo 16 caracteres): ");
$password = trim((string)fgets(STDIN));
if (strlen($password) < 16) {
    fwrite(STDERR, "La clave debe tener al menos 16 caracteres.\n");
    exit(1);
}
echo password_hash($password, PASSWORD_DEFAULT), PHP_EOL;
