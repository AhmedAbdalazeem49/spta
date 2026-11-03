<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = \App\Models\User::first();
$reg = \App\Models\ConferenceRegistration::where('status', 'paid')->first();

$sent = \Illuminate\Support\Facades\Mail::to('ahmedmohamedabdalazeem49@gmail.com')
    ->send(new \App\Mail\ConferenceAttendanceQrMail($reg, $user));

echo "Mail sent result: " . var_export($sent, true) . "\n";
