<?php
require __DIR__ . '/../backend/vendor/autoload.php';

use BaconQrCode\Encoder\Encoder;
use BaconQrCode\Common\ErrorCorrectionLevel;

function generateQrPngFromMatrix(string $text, int $targetSize = 280, int $margin = 2): string
{
    $qr = Encoder::encode($text, ErrorCorrectionLevel::M());
    $matrix = $qr->getMatrix();
    $matrixWidth = $matrix->getWidth();
    $matrixHeight = $matrix->getHeight();

    // Module count including margin
    $totalWidth = $matrixWidth + ($margin * 2);
    $totalHeight = $matrixHeight + ($margin * 2);

    // Calculate scale factor so output image is roughly targetSize
    $scale = max(1, (int)floor($targetSize / $totalWidth));
    $outWidth = $totalWidth * $scale;
    $outHeight = $totalHeight * $scale;

    $im = imagecreatetruecolor($outWidth, $outHeight);
    $white = imagecolorallocate($im, 255, 255, 255);
    $dark = imagecolorallocate($im, 17, 81, 126); // #11517E

    imagefill($im, 0, 0, $white);

    for ($y = 0; $y < $matrixHeight; $y++) {
        for ($x = 0; $x < $matrixWidth; $x++) {
            if ($matrix->get($x, $y) === 1) {
                $px = ($x + $margin) * $scale;
                $py = ($y + $margin) * $scale;
                imagefilledrectangle($im, $px, $py, $px + $scale - 1, $py + $scale - 1, $dark);
            }
        }
    }

    ob_start();
    imagepng($im);
    $png = ob_get_clean();
    imagedestroy($im);

    return $png;
}

$png = generateQrPngFromMatrix('SPTA26-1', 280, 2);
file_put_contents(__DIR__ . '/matrix_test.png', $png);
echo "PNG Generated! Size: " . strlen($png) . " bytes\n";
