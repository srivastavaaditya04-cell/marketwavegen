<?php
// Copy this file to config.php on the hosting and fill in both values. config.php is never committed.
return [
    // A long random string, at least 32 characters. The same value goes into Vercel as RESUME_UPLOAD_SECRET.
    'secret' => 'PASTE-A-LONG-RANDOM-SECRET-HERE',
    // The public address of the ./files folder on the hosting, no trailing slash. Example shape:
    // 'https://files.example.com/resumes/files'
    'base_url' => 'https://PASTE-THE-ADDRESS-OF-THE-FILES-FOLDER-HERE',
];
