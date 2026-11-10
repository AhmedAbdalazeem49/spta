<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$regs = \App\Models\ConferenceRegistration::where('status', 'paid')->whereNotNull('selected_workshops')->take(5)->get();
foreach ($regs as $r) {
    echo "ID: " . $r->id . " | User: " . $r->user_id . " | Selected: " . json_encode($r->selected_workshops) . "\n";
}
