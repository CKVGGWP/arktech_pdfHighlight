//MARLON HIGHLIGHT PDF SCRIPT START
var pdfjsLib = window["pdfjs-dist/build/pdf"];

$("#myPdf").on("change", function (e) {
  var file = e.target.files[0];
  if (file.type == "application/pdf") {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      var pdfData = new Uint8Array(this.result);

      function renderPDF(url, canvasContainer) {
        function renderPage(page) {
          const canvas = document.createElement("canvas");
          const canvasWrapper = document.createElement("div");
          canvasWrapper.className = "container";

          const ctx = canvas.getContext("2d");
          var scale = 1.5;
          var viewport = page.getViewport({ scale: scale });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          canvas.style.transform = "scale(1,1)";
          canvas.style.transformOrigin = "0% 0%";

          canvasWrapper.style.width = canvas.width + "px";
          canvasWrapper.style.height = canvas.height + "px";

          canvasWrapper.appendChild(canvas);
          const renderContext = {
            canvasContext: ctx,
            viewport,
          };
          canvasContainer.appendChild(canvasWrapper);
          page.render(renderContext);
        }

        function renderPages(pdfDoc) {
          for (let num = 1; num <= pdfDoc.numPages; num += 1)
            pdfDoc.getPage(num).then(renderPage);
        }

        pdfjsLib.disableWorker = true;
        pdfjsLib.getDocument(url).promise.then(renderPages);
      }
      var loadingTask = pdfjsLib.getDocument({ data: pdfData });
      loadingTask.promise.then(
        function (pdf) {
          console.log("PDF loaded");
          renderPDF(pdfData, document.getElementById("my_canvas")); //Call render function
          selection();
        },
        function (reason) {
          // PDF loading error
          console.error(reason);
        }
      );
    };
    fileReader.readAsArrayBuffer(file);
  }
});

var count = 1;

function selection() {
  var x1, x2, y1, y2, end;
  $("#selection").hide();
  end = true;

  var first = "";
  var second = "";
  $("#my_canvas").on("mousedown touchstart", function (e) {
    e.preventDefault();
    $("#selection").show();
    var parentOffset = $(this).offset();

    first = $("#coordinates").text();
    if (typeof e.originalEvent.targetTouches != "undefined") {
      e = e.originalEvent.targetTouches[0];
    }
    x1 = e.pageX - parentOffset.left;
    y1 = e.pageY - parentOffset.top;

    end = false;
  });

  $("#my_canvas").on("mouseup touchend", function (e) {
    e.preventDefault();
    second = $("#coordinates").text();
    $("#selection").hide();

    var parentOffset = $(this).offset();
    x2 = e.pageX - parentOffset.left;
    y2 = e.pageY - parentOffset.top;

    var l = x2 > x1 ? x1 : x2;
    var t = y2 > y1 ? y1 : y2;
    var w = x2 > x1 ? x2 - x1 : x1 - x2;
    var h = y2 > y1 ? y2 - y1 : y1 - y2;

    end = true;

    $("#selection")
      .css("margin-left", l)
      .css("margin-top", t)
      .css("width", w)
      .css("height", h);

    if (count <= 5) {
      $("#selection").after(
        '<div class="selected" id="select' + count + '"></div>'
      );

      $("#select" + count)
        .css("margin-left", l)
        .css("margin-top", t)
        .css("width", w)
        .css("height", h);

      alert("START: " + first + " - END: " + second);

      function insertCoordinates(first, second) {} //INSERT FUNCTION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      count++;
    } else {
      alert("MAX HIGHLIGHT: 5");
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

    var l = x2 > x1 ? x1 : x2;
    var t = y2 > y1 ? y1 : y2;
    var w = x2 > x1 ? x2 - x1 : x1 - x2;
    var h = y2 > y1 ? y2 - y1 : y1 - y2;

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
