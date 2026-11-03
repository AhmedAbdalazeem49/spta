<?php
require __DIR__ . '/../backend/vendor/autoload.php';

function generateQrPng(string $text, int $size = 280, int $margin = 2): string
{
    // 1. Get raw SVG from BaconQrCode
    $renderer = new \BaconQrCode\Renderer\ImageRenderer(
        new \BaconQrCode\Renderer\RendererStyle\RendererStyle($size, $margin),
        new \BaconQrCode\Renderer\Image\SvgImageBackEnd()
    );
    $writer = new \BaconQrCode\Writer($renderer);
    $svg = $writer->writeString($text);

    // 2. Parse SVG to extract rect elements
    // BaconQrCode SVG produces <rect> elements on a viewBox
    $xml = simplexml_load_string($svg);
    $viewBox = (string)$xml['viewBox'];
    $parts = preg_split('/[\s,]+/', trim($viewBox));
    $vbWidth = isset($parts[2]) ? (int)$parts[2] : 0;
    $vbHeight = isset($parts[3]) ? (int)$parts[3] : 0;

    if ($vbWidth <= 0 || $vbHeight <= 0) {
        $vbWidth = (int)$xml['width'] ?: 40;
        $vbHeight = (int)$xml['height'] ?: 40;
    }

    // Scale to desired output size
    $scale = max(1, (int)floor($size / $vbWidth));
    $outWidth = $vbWidth * $scale;
    $outHeight = $vbHeight * $scale;

    $im = imagecreatetruecolor($outWidth, $outHeight);
    $white = imagecolorallocate($im, 255, 255, 255);
    $dark = imagecolorallocate($im, 17, 81, 126); // #11517E

    imagefill($im, 0, 0, $white);

    foreach ($xml->rect as $rect) {
        $x = (int)$rect['x'] * $scale;
        $y = (int)$rect['y'] * $scale;
        $w = (int)$rect['width'] * $scale;
        $h = (int)$rect['height'] * $scale;

        // Skip background rect if it is white/fill
        $fill = strtolower((string)$rect['fill']);
        if ($fill === '#ffffff' || $fill === 'white') {
            continue;
        }

        imagefilledrectangle($im, $x, $y, $x + $w - 1, $y + $h - 1, $dark);
    }

    // Also check path elements if any
    foreach ($xml->path as $path) {
        // usually BaconQrCode uses rect, but check
    }

    ob_start();
    imagepng($im);
    $pngData = ob_get_clean();
    imagedestroy($im);

    return $pngData;
}

$png = generateQrPng('SPTA26-1', 280);
echo "PNG Generated! Length: " . strlen($png) . " bytes\n";
file_put_contents(__DIR__ . '/test_output.png', $png);
echo "Saved to test_output.png\n";
