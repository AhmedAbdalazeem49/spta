<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = \App\Models\User::first();
if ($user) {
    echo json_encode([
        'title' => $user->title,
        'user_type' => $user->user_type,
        'specialization' => $user->specialization,
        'sub_specialization' => $user->sub_specialization,
        'employer' => $user->employer,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
} else {
    echo "No users found\n";
}
