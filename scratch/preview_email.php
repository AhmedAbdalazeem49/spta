<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = \App\Models\User::first();
$reg = \App\Models\ConferenceRegistration::where('status', 'paid')->first() ?? new \App\Models\ConferenceRegistration(['id' => 1, 'user_id' => $user->id, 'status' => 'paid']);

$mail = new \App\Mail\ConferenceAttendanceQrMail($reg, $user);
file_put_contents(__DIR__ . '/preview_email.html', $mail->render());
echo "Saved preview to preview_email.html (" . filesize(__DIR__ . '/preview_email.html') . " bytes)\n";
