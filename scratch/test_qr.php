<?php
require __DIR__ . '/../backend/vendor/autoload.php';
$app = require __DIR__ . '/../backend/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    $png = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')->size(200)->generate('SPTA26-1');
    echo "PNG SUCCESS: " . strlen($png) . "\n";
} catch (\Throwable $e) {
    echo "PNG ERROR: " . $e->getMessage() . "\n";
}

try {
    $svg = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')->size(200)->generate('SPTA26-1');
    echo "SVG SUCCESS: " . strlen($svg) . "\n";
} catch (\Throwable $e) {
    echo "SVG ERROR: " . $e->getMessage() . "\n";
}
