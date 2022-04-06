<?php

class PDFViewer extends Database
{
    private $dir = '../../../V4/cocprint/coc_documents/';

    public function getTable()
    {
        $data = [];
        $totalData = 1;

        $sql = "SELECT * FROM cocDocuments";

        $query = $this->connect()->query($sql);

        if ($query->num_rows > 0) {
            while ($row = $query->fetch_assoc()) {
                extract($row);

                $downloadButton = '<a href="' . $this->dir . $cocNumber . '" class="btn btn-outline-primary btn-sm" download>Download</a>';
                $button = '<a href="marlon_pdfViewer.php?cocid=' . $cocId . '&docs=' . $cocNumber . '" target="_blank" class="btn btn-primary btn-sm">View</a>';
                $deleteButton = '<button type="button" class="btn btn-warning btn-sm" onclick="deletePDF(' . $cocId . ')">Delete</button>';
                $notFoundButton = '<button type="button" class="btn btn-danger btn-sm">File Not Found</button>';

                if (file_exists($this->dir . $cocNumber)) {
                    $buttons = $downloadButton . ' ' . $button . ' ' . $deleteButton;
                } else {
                    $buttons = $notFoundButton;
                }

                $data[] = [
                    $cocId,
                    $cocNumber,
                    $cocLotNumber,
                    ($dateupload == "0000-00-00 00:00:00") ? "" : date("F j, Y - H:i:s", strtotime($dateupload)),
                    $employeeId,
                    $identifier,
                    $doc2,
                    $highlight1,
                    $highlight2,
                    $highlight3,
                    $highlight4,
                    $highlight5,
                    $buttons
                ];
                $totalData++;
            }
        }

        $json_data = array(
            "draw"            => 1,   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
            "recordsTotal"    => intval($totalData),  // total number of records
            "recordsFiltered" => intval($totalData), // total number of records after searching, if there is no searching then totalFiltered = totalData
            "data"            => $data   // total data array

        );

        return json_encode($json_data);  // send data as json format
    }

    public function deletePDF($id)
    {
        $pdf = $this->getPDF($id);

        $file = $this->dir . $pdf;

        if (file_exists($file)) {
            if (unlink($file)) {
                $sql = "DELETE FROM cocDocuments WHERE cocId = '$id' AND cocNumber = '$pdf'";

                $query = $this->connect()->query($sql);

                if ($query) {
                    return "1";
                } else {
                    return "2";
                }
            }
        } else {
            return "3";
        }
    }

    private function getPDF($id)
    {
        $sql = "SELECT cocNumber FROM cocDocuments WHERE cocId = '$id'";

        $query = $this->connect()->query($sql);

        if ($query->num_rows > 0) {
            if ($row = $query->fetch_assoc()) {
                extract($row);

                return $cocNumber;
            }
        } else {
            return "3";
        }
    }

    public function displayCoordinates($id, $pdfName)
    {
        $sql = "SELECT * FROM cocDocuments WHERE cocId = '$id' AND cocNumber = '$pdfName'";

        $query = $this->connect()->query($sql);

        $coordinatesArray = [];

        if ($query->num_rows > 0) {
            while ($row = $query->fetch_assoc()) {
                extract($row);

                $coordinatesArray = [
                    $highlight1,
                    $highlight2,
                    $highlight3,
                    $highlight4,
                    $highlight5
                ];
            }
        }

        return json_encode($coordinatesArray);  // send data as json format
    }

    public function resetCoordinates($id, $pdfName)
    {
        $sql = "UPDATE cocDocuments SET highlight1 = '', highlight2 = '', highlight3 = '', highlight4 = '', highlight5 = '' WHERE cocId = '$id' AND cocNumber = '$pdfName'";

        $query = $this->connect()->query($sql);

        if ($query) {
            return "1";
        } else {
            return "2";
        }
    }
}
