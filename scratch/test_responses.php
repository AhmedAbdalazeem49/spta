<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$controller = new \App\Http\Controllers\Api\ConferenceAttendanceController();

// 1. Test scanConference response
$request = \Illuminate\Http\Request::create('/api/scan/conference', 'POST', [
    'unique_code' => 'SPTA26-5',
]);

$response = $controller->scanConference($request);
echo "=== Scan Conference Response ===\n";
echo json_encode(json_decode($response->getContent(), true), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n\n";

// 2. Test attendanceStats response
$statsRequest = \Illuminate\Http\Request::create('/api/admin/conference/attendance-stats', 'GET');
$statsResponse = $controller->attendanceStats($statsRequest);
$statsData = json_decode($statsResponse->getContent(), true);
echo "=== Sample Attendee in attendanceStats ===\n";
if (!empty($statsData['data']['registrations'])) {
    echo json_encode($statsData['data']['registrations'][0]['user'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
}
