<?php
/**
 * Market Wavegen careers: resume receiver.
 *
 * Runs on the company's Hostinger hosting (NOT on Vercel). The website's /api/careers route posts the applicant's
 * resume here with a shared secret; this script checks it, saves it in ./files under a random name and returns its
 * link, which the website writes into the Careers Google Sheet. See README.md for setup.
 */
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($code, $payload)
{
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['error' => 'POST only']);
}

// Settings live in config.php (created from config.sample.php, never committed).
$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    respond(500, ['error' => 'Receiver is not configured']);
}
$config = require $configFile;
$secret = isset($config['secret']) ? (string) $config['secret'] : '';
$baseUrl = isset($config['base_url']) ? rtrim((string) $config['base_url'], '/') : '';
if (strlen($secret) < 32 || strpos($secret, 'PASTE') === 0 || $baseUrl === '') {
    respond(500, ['error' => 'Receiver is not configured']);
}

// Only the website knows the secret.
$sent = isset($_SERVER['HTTP_X_UPLOAD_SECRET']) ? (string) $_SERVER['HTTP_X_UPLOAD_SECRET'] : '';
if ($sent === '' || !hash_equals($secret, $sent)) {
    respond(403, ['error' => 'Forbidden']);
}

if (!isset($_FILES['resume']) || !is_array($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    respond(400, ['error' => 'No file received']);
}
$file = $_FILES['resume'];
if (!is_uploaded_file($file['tmp_name'])) {
    respond(400, ['error' => 'No file received']);
}

// Size: 4 MB at most (the website enforces the same limit).
$size = (int) $file['size'];
if ($size <= 0 || $size > 4 * 1024 * 1024) {
    respond(413, ['error' => 'File too large']);
}

// Type: only PDF, DOC, DOCX, and the file's first bytes must match (a renamed file is refused).
$ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, ['pdf', 'doc', 'docx'], true)) {
    respond(415, ['error' => 'File type not allowed']);
}
$head = (string) file_get_contents($file['tmp_name'], false, null, 0, 8);
$valid = false;
if ($ext === 'pdf') {
    $valid = substr($head, 0, 5) === '%PDF-';
} elseif ($ext === 'doc') {
    $valid = $head === "\xD0\xCF\x11\xE0\xA1\xB1\x1A\xE1";
} elseif ($ext === 'docx') {
    $valid = substr($head, 0, 4) === "PK\x03\x04";
}
if (!$valid) {
    respond(415, ['error' => 'File content does not match its type']);
}

// Save under a random name (the applicant's own file name is never used).
$dir = __DIR__ . '/files';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    respond(500, ['error' => 'Could not save file']);
}
$name = bin2hex(random_bytes(16)) . '.' . $ext;
if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $name)) {
    respond(500, ['error' => 'Could not save file']);
}
@chmod($dir . '/' . $name, 0644);

respond(200, ['url' => $baseUrl . '/' . $name]);
