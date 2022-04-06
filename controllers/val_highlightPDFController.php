<?php

require("../models/ck_database.php");
require("../models/val_highlightPDF.php");

$highlightPDF = new HighlightPDF();

if(isset($_POST['insertHighlight'])){
	$firstCoordinate = $_POST['first'];
	$secondCoordinate = $_POST['second'];
	$cocId = $_POST['cocId'];
	$insertHighlight = $highlightPDF->insertHighlight($firstCoordinate, $secondCoordinate, $cocId);
	echo ($insertHighlight);
	// echo $firstCoordinate;
}

