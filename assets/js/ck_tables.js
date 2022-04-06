let pdfTable = $("#pdfTable").DataTable({
  lengthChange: false,
  searching: false,
  processing: true,
  ordering: false,
  serverSide: true,
  bInfo: false,
  ajax: {
    url: "controllers/ck_tableController.php", // json datasource
    type: "POST", // method  , by default get
    data: { getPDF: true },
    error: function () {
      // error handling
    },
  },
  createdRow: function (data) {},
  columnDefs: [
    { className: "text-left", targets: [1] },
    { className: "text-center", targets: [0, 2, 3, 4, 5, 6] },
  ],
  fixedColumns: true,
  deferRender: true,
  scrollY: 500,
  scroller: {
    loadingIndicator: true,
  },
  stateSave: false,
});

function deletePDF(id) {
  Swal.fire({
    title: "Are you sure that you want to delete this file?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "controllers/ck_tableController.php",
        type: "POST",
        data: {
          deletePDF: true,
          id: id,
        },
        success: function (response) {
          if (response == "1") {
            Swal.fire({
              title: "Success!",
              text: "File has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              location.reload();
            });
          } else if (response == "2") {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong with the server. Try again later",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (response == "3") {
            Swal.fire({
              title: "Error!",
              text: "File not found inside the server",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
      });
    }
  });
}

function filter() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filter");
  filter = input.value.toUpperCase();
  table = document.getElementById("pdfTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
