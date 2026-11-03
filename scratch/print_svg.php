<?php
require __DIR__ . '/../backend/vendor/autoload.php';

$renderer = new \BaconQrCode\Renderer\ImageRenderer(
    new \BaconQrCode\Renderer\RendererStyle\RendererStyle(280, 2),
    new \BaconQrCode\Renderer\Image\SvgImageBackEnd()
);
$writer = new \BaconQrCode\Writer($renderer);
$svg = $writer->writeString('SPTA26-1');
echo $svg;
