<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $base64 = trim($_POST["base64"]);
    if (empty($base64)) {
        http_response_code(400);
        die("El código base64 no puede estar vacío.");
    }

    // Buscar la posición del primer ";" en el código base64
    $semicolon_pos = strpos($base64, ";");

    // Si se encuentra un ";", extraer el nombre de archivo
    if ($semicolon_pos !== false) {
        $filename = substr($base64, 0, $semicolon_pos);
    } else {
        $filename = "profertil";
    }

    // Eliminar el nombre de archivo del código base64
    $base64 = substr($base64, $semicolon_pos + 1);

    $decoded = base64_decode($base64);
    if ($decoded === false) {
        http_response_code(400);
        die("No se pudo decodificar el archivo en base64.");
    }

    $extension = ".docx";
    $fullname = $filename . $extension;

    header("Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    header("Content-Disposition: attachment; filename=$fullname");
    echo $decoded;

    $_SESSION["history"][] = $fullname;
}
?>
