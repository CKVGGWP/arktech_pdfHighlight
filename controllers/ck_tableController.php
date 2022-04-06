<?php

include('../models/ck_database.php');
include('../models/ck_table.php');

$pdf = new PDFViewer();

if (isset($_POST['getPDF'])) {
    echo $pdf->getTable();
}

if (isset($_POST['deletePDF'])) {
    $id = $_POST['id'];

    echo $pdf->deletePDF($id);
}

if (isset($_POST['displayCoordinates'])) {
    $cocDisplayId = $_POST['cocDisplayId'];
    $pdfName = $_POST['pdfName'];

    echo $pdf->displayCoordinates($cocDisplayId, $pdfName);
}

if (isset($_POST['resetCoordinates'])) {
    $cocDisplayId = $_POST['cocDisplayId'];
    $pdfName = $_POST['pdfName'];

    echo $pdf->resetCoordinates($cocDisplayId, $pdfName);
}
