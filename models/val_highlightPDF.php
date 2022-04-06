<?php

class HighlightPDF extends Database
{
    public function insertHighlight($firstCoordinate, $secondCoordinate, $cocId)
    {
        $data = [];

        $nums = count($firstCoordinate);

        for ($i = 1; $i <= $nums; $i++) {
            $coordinates = $firstCoordinate[$i-1] . "," . $secondCoordinate[$i-1];
            $coordinates = str_replace(' ', '', $coordinates);

            $sql = "UPDATE cocDocuments SET  highlight" . $i . " = '$coordinates' WHERE cocId = '$cocId'";
            $query = $this->connect()->query($sql);
        }

        if ($query) {
            return $nums;
        } else {
            return 0;
        }
    }
}
