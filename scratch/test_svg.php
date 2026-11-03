<?php
require __DIR__ . '/../backend/vendor/autoload.php';

use BaconQrCode\Writer;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;

$renderer = new ImageRenderer(
    new RendererStyle(280),
    new SvgImageBackEnd()
);
$writer = new Writer($renderer);
$svgString = $writer->writeString('SPTA26-1');

echo "SVG length: " . strlen($svgString) . "\n";
echo "SVG starts with: " . substr($svgString, 0, 100) . "\n";
