//Create a function for AJAX requests
function insertCoordinates(first, second) {
  $.ajax({
    type: "POST",
    url: "controllers/val_HighlightPDFController.php",
    data: {
      first: first,
      second: second,
    },
    success: function (data) {
      $("#result").html(data);
    },
  });
}
