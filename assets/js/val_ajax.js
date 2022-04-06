//Create a function for AJAX requests
function insertCoordinates(first, second, cocId) {
  $.ajax({
    type: "POST",
    url: "controllers/val_highlightPDFController.php",
    data: {
      insertHighlight: 1,
      cocId: cocId,
      first: first,
      second: second,
    },
    success: function (data) {
      console.log(data);
      Swal.fire({
        title: "Success!",
        text: data + " coordinate(s) have been saved.",
        icon: "success",
      }).then((result) => {
        location.reload();
      });
    },
  });
}
