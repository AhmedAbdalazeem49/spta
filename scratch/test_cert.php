<?php
require __DIR__ . '/../backend/vendor/autoload.php';

use setasign\Fpdi\Tcpdf\Fpdi;

$pdf = new Fpdi('L', 'mm', 'A4');
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->SetMargins(0, 0, 0);
$pdf->SetAutoPageBreak(false);

$pageCount = $pdf->setSourceFile(__DIR__ . '/../backend/storage/app/templates/conference-attendance-template.pdf');
$tplIdx = $pdf->importPage(1);
$size = $pdf->getTemplateSize($tplIdx);

$pdf->AddPage('L', [$size['width'], $size['height']]);
$pdf->useTemplate($tplIdx, 0, 0, $size['width'], $size['height']);

// Navy RGB(17, 81, 126) -> #11517E
$pdf->SetTextColor(17, 81, 126);
$pdf->SetFont('aealarabiya', 'B', 26);

$name = 'Dr. Sarah Mohammed Al-Ghamdi';
$pdf->SetXY(0, 95);
$pdf->Cell($size['width'], 15, $name, 0, 1, 'C');

$pdf->Output(__DIR__ . '/test_output.pdf', 'F');
echo "PDF test output generated successfully!\n";
