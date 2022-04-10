// Modified by CK and Val
var url = window.location.href;
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let cocDisplayId = getParameterByName("cocid");
let pdfName = getParameterByName("docs");
let pageNumber = getParameterByName("page");

//MARLON HIGHLIGHT PDF SCRIPT START
var pdfjsLib = window["pdfjs-dist/build/pdf"];
$("#selection").hide();

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';

let page = 1;

function renderPDF(url, canvasContainer) {
  function renderPage(page) {
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");
    var scale = 1.0;
    var viewport = page.getViewport({ scale: scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    canvas.style.transform = "scale(1,1)";
    canvas.style.transformOrigin = "0% 0%";

    var canvasWrapper = document.createElement("div");

    canvasWrapper.appendChild(canvas);

    const renderContext = {
      canvasContext: ctx,
      viewport,
    };

    canvasContainer.appendChild(canvasWrapper);

    page.render(renderContext);
  }

  function renderPages(pdfDoc) {
    // for (let num = 1; num <= pdfDoc.numPages; num += 1)
    pdfDoc.getPage(page).then(renderPage);

    if (page === pdfDoc.numPages) {
      $("#next").attr("disabled", true);
      $("#next").text("End of Document");
    } else {
      $("#next").attr("disabled", false);
      $("#next").text("Next Page");
    }

    if (page === 1) {
      $("#previous").attr("disabled", true);
      $("#previous").text("Start of Document");
    } else {
      $("#previous").attr("disabled", false);
      $("#previous").text("Previous Page");
    }

    var pageNumber = document.getElementById("pages");
    pageNumber.innerHTML = "Page " + page + " of " + pdfDoc.numPages;
  }

  pdfjsLib.disableWorker = true;
  pdfjsLib.getDocument(url).promise.then(renderPages);
}

$(document).ready(function (e) {
  renderPDF(
    "../../../V4/cocprint/coc_documents/" + getParameterByName("docs"),
    document.getElementById("my_canvas")
  );

	selection();
 	setTimeout(function () {
		displayCoordinates(cocDisplayId, pdfName);
  	}, 1100);

  $("#refresh").on("click", function () {
    location.reload();
  });
  // document.querySelector("#previous").addEventListener("click");
  // document.querySelector("#next").addEventListener("click");

  $("#next").on("click", function () {
    $(".pg"+page).addClass("d-none");
    page++;
    $(".pg"+page).removeClass("d-none");
  
    $("#my_canvas div").last().remove();
    renderPDF(
      "../../../V4/cocprint/coc_documents/" + getParameterByName("docs"),
      document.getElementById("my_canvas")
    );
  });

  $("#previous").on("click", function () {
    $(".pg"+page).addClass("d-none");
    page--;
    $(".pg"+page).removeClass("d-none");
  
    $("#my_canvas div").last().remove();
    renderPDF(
      "../../../V4/cocprint/coc_documents/" + getParameterByName("docs"),
      document.getElementById("my_canvas")
    );
  });
});


var count = 1;
var l = "";
var t = "";
var w = "";
var h = "";

var first = "";
var second = "";
var firstCoord = [];
var secondCoord = [];
var pageNum = [];

var x1, x2, y1, y2, end;

function selection() {
  end = true;
  $("#my_canvas").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $("#selection").show();
    var parentOffset = $(this).offset();

    // first = $("#coordinates").text();
  	first = e.pageX + "," + e.pageY;
    if (typeof e.originalEvent.targetTouches != "undefined") {
      e = e.originalEvent.targetTouches[0];
    }
    x1 = e.pageX - parentOffset.left;
    y1 = e.pageY - parentOffset.top;

    end = false;
  });

  $("#my_canvas").on("mouseup touchend", function (e) {
    e.preventDefault();
    // second = $("#coordinates").text();
    second = e.pageX + "," + e.pageY;
    $("#selection").hide();

    var parentOffset = $(this).offset();
    x2 = e.pageX - parentOffset.left;
    y2 = e.pageY - parentOffset.top;

    l = x2 > x1 ? x1 : x2;
    t = y2 > y1 ? y1 : y2;
    w = x2 > x1 ? x2 - x1 : x1 - x2;
    h = y2 > y1 ? y2 - y1 : y1 - y2;
    
  
    end = true;

    $("#selection")
      .css("margin-left", l)
      .css("margin-top", t)
      .css("width", w)
      .css("height", h);

    if (first != second) {
      if (firstCoord.length < 5) {
        $("#selection").after(
          '<div class="selected pg'+page+'" id="select' + count + '"></div>'
        );

        $("#select" + count)
          .css("margin-left", l)
          .css("margin-top", t)
          .css("width", w)
          .css("height", h);

        // alert("START: " + first + " - END: " + second);
        firstCoord.push(first);
        secondCoord.push(second);
        pageNum.push(page);

        count++;
      } else {
        Swal.fire({
          title: "Error!",
          text: "You can only select 5 coordinates.",
          icon: "error",
        });
      }
    }
  });

  $("#my_canvas").on("mousemove touchmove", function (e) {
    e.preventDefault();
    getCoordinates(e);

    if (typeof e.originalEvent.targetTouches != "undefined") {
      e = e.originalEvent.targetTouches[0];
    }

    if (end) return false;
    var parentOffset = $(this).offset();

    x2 = e.pageX - parentOffset.left;
    y2 = e.pageY - parentOffset.top;

    l = x2 > x1 ? x1 : x2;
    t = y2 > y1 ? y1 : y2;
    w = x2 > x1 ? x2 - x1 : x1 - x2;
    h = y2 > y1 ? y2 - y1 : y1 - y2;

    $("#selection")
      .css("margin-left", l)
      .css("margin-top", t)
      .css("width", w)
      .css("height", h);
  });

  $(".selected")
    .css("margin-left", l)
    .css("margin-top", t)
    .css("width", w)
    .css("height", h);
}

function getCoordinates(a) {
  var x = a.clientX;
  var y = a.clientY;
  var z = x + " , " + y;
  $("#coordinates").text(z);
}

//MARLON HIGHLIGHT PDF SCRIPT END

function displayCoordinates(cocDisplayId, pdfName) {
  $.ajax({
    type: "POST",
    url: "controllers/ck_tableController.php",
    data: {
      displayCoordinates: 1,
      cocDisplayId: cocDisplayId,
      pdfName: pdfName,
    },
    success: function (data) {
      let coordinates = JSON.parse(data);
      // console.log(coordinates);
      for (let i = 0; i < coordinates.length; i++) {
        let coordinatesArray = coordinates[i].split(",");
        let x1 = coordinatesArray[0];
        let y1 = coordinatesArray[1];
        let x2 = coordinatesArray[2];
        let y2 = coordinatesArray[3];
        let pg = coordinatesArray[4];
        //////////////////////////////////////////////////////////firstCoo
        if (x1 != "" && y1 != "" && x2 != "" && y2 != "") {
          firstCoord.push(x1 + "," + y1);
          secondCoord.push(x2 + "," + y2);
          pageNum.push(pg);
        }
        /////////////////////////////////////////////////////////////////
        if (coordinates[i] != "") {
        
          var parentOffset = $("#my_canvas").offset();
          x1 = x1 - parentOffset.left;
          y1 = y1 - parentOffset.top;
          x2 = x2 - parentOffset.left;
          y2 = y2 - parentOffset.top;

          var left = x2 > x1 ? x1 : x2;
          var top = y2 > y1 ? y1 : y2;
          var width = x2 > x1 ? x2 - x1 : x1 - x2;
          var height = y2 > y1 ? y2 - y1 : y1 - y2;
		  
          if(pg!=1){
          	$("#selection").after(
            	'<div class="marked pg'+pg+' d-none" id="select' + i + '"></div>'
          	);
          }else{
          	$("#selection").after(
            	'<div class="marked pg'+pg+'" id="select' + i + '"></div>'
          	);
          }

          $("#select" + i)
            .css("margin-left", left + "px")
            .css("margin-top", top + "px")
            .css("width", width + "px")
            .css("height", height + "px");
        }
      }
    },
  });
}

//MOVED BY VAL
$("#save").on("click", function () {
  $(this).html("Saving...");
  $(this).blur();
  var insertion = insertCoordinates(
    firstCoord,
    secondCoord,
    getParameterByName("cocid"),
    pageNum
  );
  console.log(insertion);
});

$("#reset").on("click", function () {
  Swal.fire({
    title:
      "Are you sure that you want to remove all the coordinates of " +
      pdfName +
      "?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "controllers/ck_tableController.php",
        data: {
          resetCoordinates: 1,
          cocDisplayId: cocDisplayId,
          pdfName: pdfName,
        },
        success: function (data) {
          console.log(data);
          if (data == "1") {
            Swal.fire({
              title: "Success!",
              text: "Coordinates have been removed from " + pdfName + ".",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            }).then((result) => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong in removing the coordinates.",
              icon: "error",
            });
          }
        },
      });
    }
  });
});
