<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$jobs = \Illuminate\Support\Facades\DB::table('failed_jobs')->get();
foreach ($jobs as $j) {
    echo "ID: " . $j->id . "\n";
    $p = json_decode($j->payload, true);
    echo "Class: " . ($p['displayName'] ?? 'N/A') . "\n";
    echo "Exception short: " . substr($j->exception, 0, 150) . "\n---\n";
}
