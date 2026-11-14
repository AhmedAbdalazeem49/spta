<?php
require __DIR__ . '/../backend/vendor/autoload.php';

use setasign\Fpdi\Tfpdf\Fpdi;

$pdf = new Fpdi('L', 'mm', 'A4');
$pdf->SetMargins(0, 0, 0);
$pdf->SetAutoPageBreak(false);

$templatePath = __DIR__ . '/../backend/storage/app/templates/conference-workshops-template.pdf';
$pageCount = $pdf->setSourceFile($templatePath);
$tplIdx = $pdf->importPage(1);
$size = $pdf->getTemplateSize($tplIdx);

$pageWidth = $size['width'];
$pageHeight = $size['height'];

$pdf->AddPage('L', [$pageWidth, $pageHeight]);
$pdf->useTemplate($tplIdx, 0, 0, $pageWidth, $pageHeight);

$pdf->AddFont('DejaVu', 'B', 'DejaVuSans-Bold.ttf', true);
$pdf->AddFont('DejaVu', '', 'DejaVuSans.ttf', true);

// 1. Participant Name (moved down by 15px to Y = 82.5 mm)
$name = 'Dr. Sarah Mohammed Al-Ghamdi';
$pdf->SetTextColor(17, 81, 126); // Navy #11517E
$pdf->SetFont('DejaVu', 'B', 23);
$pdf->SetXY(0, 82.5);
$pdf->Cell($pageWidth, 12, $name, 0, 1, 'C');

// 2. Workshop Title (moved down by 8-10px to Y = 116.5 mm)
$workshopTitle = 'Clinical Reasoning in Cervicothoracic Disorders: Integrating Clinical Practice Guidelines into Complex Patient Management';
$pdf->SetTextColor(17, 81, 126); // Navy or Dark Slate
$pdf->SetFont('DejaVu', 'B', 14);

// Center the title horizontally using MultiCell within 235mm width
$titleBoxWidth = 235;
$titleX = ($pageWidth - $titleBoxWidth) / 2;
$pdf->SetXY($titleX, 116.5);
$pdf->MultiCell($titleBoxWidth, 6.8, $workshopTitle, 0, 'C');

// 3. Accreditation Number (moved up by 5px and placed inline to the right of label)
$accreditationNumber = 'ACA-20260003112';
$pdf->SetTextColor(17, 81, 126);
$pdf->SetFont('DejaVu', 'B', 14);
$pdf->SetXY(156.0, 137.5);
$pdf->Cell(80, 7.5, $accreditationNumber, 0, 0, 'L');

$outPath = __DIR__ . '/test_ws_output.pdf';
$pdf->Output($outPath, 'F');
echo "Generated workshop test cert at: $outPath, size=" . filesize($outPath) . "\n";
