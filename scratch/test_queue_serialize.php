<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = new \App\Models\User([
    'id' => 123,
    'name' => 'Test Attendee',
    'email' => 'attendee@spta.sa',
]);

$reg = new \App\Models\ConferenceRegistration([
    'id' => 1,
    'user_id' => 123,
    'status' => 'paid',
]);

$mail = new \App\Mail\ConferenceAttendanceQrMail($reg, $user);

// Simulate what DatabaseQueue does: serialize the Mailable and JSON encode the payload
$serialized = serialize($mail);
$payload = [
    'displayName' => get_class($mail),
    'job' => 'Illuminate\Queue\CallQueuedHandler@call',
    'data' => ['command' => $serialized],
];

$json = json_encode($payload);
if ($json === false) {
    echo "ERROR: JSON encode failed: " . json_last_error_msg() . "\n";
} else {
    echo "SUCCESS: JSON encoded payload successfully! Length: " . strlen($json) . " bytes\n";
}

$wsMail = new \App\Mail\WorkshopAttendanceQrMail($reg, $user, 'm1');
$serializedWs = serialize($wsMail);
$payloadWs = [
    'displayName' => get_class($wsMail),
    'job' => 'Illuminate\Queue\CallQueuedHandler@call',
    'data' => ['command' => $serializedWs],
];
$jsonWs = json_encode($payloadWs);
if ($jsonWs === false) {
    echo "WS ERROR: " . json_last_error_msg() . "\n";
} else {
    echo "WS SUCCESS: JSON encoded payload successfully! Length: " . strlen($jsonWs) . " bytes\n";
}
