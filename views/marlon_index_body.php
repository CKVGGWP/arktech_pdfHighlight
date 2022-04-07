<body>
    <div class="d-flex flex-column justify-content-center">
        <div class="col-md-12 mt-3 px-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h4 class="text-center">PDF Highlight</h4>
                    <hr>
                    <div class="btn-toolbar justify-content-between">
                        <div class="d-grid d-md-flex gap-2 justify-content-md-start">
                            <button type="button" class="btn btn-outline-dark" id="previous">Previous</button>
                            <button type="button" class="btn btn-outline-dark" id="next">Next</button>
                            <!--                             <button type="button" class="btn btn-outline-dark">All Pages</button> -->
                        </div>
                        <div class="d-grid d-md-flex gap-2 justify-content-md-end">
                            <button class="btn btn-primary" type="button" id="save">Save</button>
                            <button class="btn btn-success" type="button" id="refresh">Refresh</button>
                            <button class="btn btn-danger" type="button" id="reset">Reset All</button>
                        </div>
                        <!--                     </div> -->
                    </div>
                    <div class="card-body">
                        <!--                     <div class="row mb-3 ml-1"> -->
                        <p id="pages"></p>

                        <div id="my_canvas">
                            <div id="selection"></div>
                            <div class="selected"></div>
                        </div>
                        <!--                     </div> -->
                    </div>
                </div>
            </div>
        </div>
</body>