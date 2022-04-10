<?php

require("../models/ck_database.php");
require("../models/val_highlightPDF.php");

$highlightPDF = new HighlightPDF();

if(isset($_POST['insertHighlight'])){
	$firstCoordinate = $_POST['first'];
	$secondCoordinate = $_POST['second'];
	$cocId = $_POST['cocId'];
	$pageNum = $_POST['pageNum'];
	$insertHighlight = $highlightPDF->insertHighlight($firstCoordinate, $secondCoordinate, $cocId, $pageNum);
	echo ($insertHighlight);
	// echo $firstCoordinate;
}

