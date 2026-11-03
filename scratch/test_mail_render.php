<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = new \App\Models\User([
    'id' => 999,
    'name' => 'Test User',
    'email' => 'test@spta.sa',
]);
$reg = new \App\Models\ConferenceRegistration([
    'id' => 1,
    'user_id' => 999,
    'status' => 'paid',
]);

$mail = new \App\Mail\ConferenceAttendanceQrMail($reg, $user);
$rendered = $mail->render();

// Check if src contains valid data:image/png;base64
if (preg_match('/src="([^"]+)"/', $rendered, $matches)) {
    $src = $matches[1];
    echo "SRC attribute length: " . strlen($src) . "\n";
    echo "SRC starts with: " . substr($src, 0, 40) . "\n";
    if (str_starts_with($src, 'data:image/png;base64,')) {
        echo "SUCCESS: Valid PNG Data URI found in rendered HTML!\n";
    } else {
        echo "FAILED: SRC is not data:image/png;base64\n";
    }
} else {
    echo "FAILED: No src found in rendered HTML!\n";
}

$wsMail = new \App\Mail\WorkshopAttendanceQrMail($reg, $user, 'm1');
$renderedWs = $wsMail->render();
if (preg_match('/src="([^"]+)"/', $renderedWs, $matchesWs)) {
    $srcWs = $matchesWs[1];
    echo "WS SRC starts with: " . substr($srcWs, 0, 40) . "\n";
    if (str_starts_with($srcWs, 'data:image/png;base64,')) {
        echo "SUCCESS: Valid Workshop PNG Data URI found!\n";
    }
}
