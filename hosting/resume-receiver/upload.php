<?php
/**
 * Market Wavegen careers: resume receiver (version 2, browser-direct).
 *
 * Runs on the company's Hostinger hosting (NOT on Vercel). The applicant's browser posts the resume here directly,
 * together with a short-lived signed "slip" that the website minted (see lib/resume-slip.ts). This script checks the
 * slip and the file, saves the file in ./files under a name derived from the slip, and replies with the file's link
 * plus a signature of that link, which the website verifies before putting the link in the Google Sheet.
 *
 * Message formats (keep identical to lib/resume-slip.ts):
 *   slip      v1.<expires>.<nonce>.<ext>.<hmac>   hmac = HMAC-SHA256(secret, "slip:v1:<expires>:<nonce>:<ext>:<max bytes>")
 *   reply     {"url": "...", "sig": hmac}          hmac = HMAC-SHA256(secret, "url:v1:<url>")
 *
 * Settings live in config.php (created from config.sample.php, never committed). See README.md.
 */
const MAX_BYTES = 4194304; // 4 MB, same as RESUME_MAX_BYTES in data/careers.ts
const MAX_SLIP_FUTURE = 900; // a slip may not claim to be valid for longer than 15 minutes
const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
// Any website may call this endpoint; without a valid signed slip nothing is accepted. No cookies are involved.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

function respond($code, $payload)
{
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($method !== 'POST') {
    respond(405, ['error' => 'POST only']);
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    respond(500, ['error' => 'Receiver is not configured']);
}
$config = require $configFile;
$secret = isset($config['secret']) ? (string) $config['secret'] : '';
$baseUrl = isset($config['base_url']) ? rtrim((string) $config['base_url'], '/') : '';
$maxFiles = isset($config['max_files']) ? (int) $config['max_files'] : 5000;
if (strlen($secret) < 32 || strpos($secret, 'PASTE') === 0 || $baseUrl === '') {
    respond(500, ['error' => 'Receiver is not configured']);
}

// 1. The signed slip from the website.
$token = isset($_POST['token']) ? (string) $_POST['token'] : '';
$parts = explode('.', $token);
if (count($parts) !== 5 || $parts[0] !== 'v1') {
    respond(403, ['error' => 'Invalid upload slip']);
}
list(, $expires, $nonce, $slipExt, $sig) = $parts;
if (!ctype_digit($expires) || !preg_match('/^[a-f0-9]{32}$/', $nonce) || !in_array($slipExt, ALLOWED_EXT, true) || !preg_match('/^[a-f0-9]{64}$/', $sig)) {
    respond(403, ['error' => 'Invalid upload slip']);
}
$expected = hash_hmac('sha256', 'slip:v1:' . $expires . ':' . $nonce . ':' . $slipExt . ':' . MAX_BYTES, $secret);
if (!hash_equals($expected, $sig)) {
    respond(403, ['error' => 'Invalid upload slip']);
}
$now = time();
if ($now > (int) $expires) {
    respond(403, ['error' => 'This upload slip has expired. Please try again.']);
}
if ((int) $expires - $now > MAX_SLIP_FUTURE) {
    respond(403, ['error' => 'Invalid upload slip']);
}

// 2. The file.
if (!isset($_FILES['resume']) || !is_array($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    respond(400, ['error' => 'No file received']);
}
$file = $_FILES['resume'];
if (!is_uploaded_file($file['tmp_name'])) {
    respond(400, ['error' => 'No file received']);
}
$size = (int) $file['size'];
if ($size <= 0 || $size > MAX_BYTES) {
    respond(413, ['error' => 'File too large']);
}
$ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
if ($ext !== $slipExt) {
    respond(415, ['error' => 'File type does not match the upload slip']);
}
// The file's first bytes must match its type (a renamed file is refused).
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

// 3. Save it. The name comes from the slip, so a slip works once; the applicant's own file name is never used.
$dir = __DIR__ . '/files';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    respond(500, ['error' => 'Could not save file']);
}
$existing = glob($dir . '/*.{pdf,doc,docx}', GLOB_BRACE);
if (is_array($existing) && count($existing) >= $maxFiles) {
    respond(507, ['error' => 'Storage is full']);
}
$name = substr(hash('sha256', $nonce), 0, 32) . '.' . $ext;
$path = $dir . '/' . $name;
if (file_exists($path)) {
    respond(409, ['error' => 'This upload slip was already used']);
}
if (!move_uploaded_file($file['tmp_name'], $path)) {
    respond(500, ['error' => 'Could not save file']);
}
@chmod($path, 0644);

$url = $baseUrl . '/' . $name;
respond(200, ['url' => $url, 'sig' => hash_hmac('sha256', 'url:v1:' . $url, $secret)]);
