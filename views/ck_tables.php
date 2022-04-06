<main>
    <div class="d-flex flex-column justify-content-center">
        <div class="col-md-12 mt-3 px-4">
            <div class="pb-3">
                <a href="../../index.php?title=Dashboard" class="btn btn-outline-light text-dark"><i class="fas fa-angle-left"></i> Back</a>
            </div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h4 class="text-center">PDF Highlight</h4>
                </div>
                <div class="card-body">
                    <div class="row mb-3 ml-1">
                        <div class="form-group mb-3">
                            <label for="userFirstname">Filter & Search</label>
                            <div class="col-sm">
                                <input type="name" class="form-control" id="filter" name="filter" onkeyup="filter()">
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover text-center text-nowrap" id="pdfTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th class="text-nowrap text-center">coc ID</th>
                                    <th class="text-nowrap text-center">coc Number</th>
                                    <th class="text-wrap text-center">coc Lot Number</th>
                                    <th class="text-wrap text-center">Date Uploaded</th>
                                    <th class="text-wrap text-center">Employee ID</th>
                                    <th class="text-wrap text-center">Identifier</th>
                                    <th class="text-wrap text-center">Doc 2</th>
                                    <th class="text-wrap text-center">Highlight 1</th>
                                    <th class="text-wrap text-center">Highlight 2</th>
                                    <th class="text-wrap text-center">Highlight 3</th>
                                    <th class="text-wrap text-center">Highlight 4</th>
                                    <th class="text-wrap text-center">Highlight 5</th>
                                    <th class="text-wrap text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>