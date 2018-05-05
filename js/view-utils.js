
let ViewUtils = (() => {
    let util = {};

    util.showFetchingData = () => {
        let html = `
            <div class="mx-auto text-muted mt-5" style="font-size:1.75rem;font-weight:200;">Searching...</div>
        `;
        $("#movie-list").html(html);
    };

    util.showDataFetched = () => {
        $("#movie-list").html("");
    };

    util.displayMovie = (movie) => {
        let html = `
            <div class="col-12 col-sm-4 col-md-3 mt-3">
                <div class="card w-100 shadow-sm" title="${movie.Title}" style="font-family:'Montserrat';" id="movie-item-${movie.imdbID}" onclick="displayMovieDetails('${movie.imdbID}')">
                    <div class="card-header" style="background-image:url(${movie.Poster === "N/A" ? "" : movie.Poster});background-color:${'#'+(Math.random()*0xFFFFFF<<0).toString(16)};"></div>
                    <div class="card-body p-2">
                        <h6 class="card-title m-0" style="font-weight:600;">${movie.Title} (${movie.Year})</h6>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
        `;
        $("#movie-list").append(html);
    };

    util.clearMovieList = () => {
        $("#movie-list").html("");
    };

    util.displayMovieDetails = (movie) => {
        // console.log(movie);
        $("#movie-details .image img").attr("src", movie.Poster === "N/A" ? "images/dummy.png" : movie.Poster);
        $("#movie-details .rating .votes").text(movie.imdbVotes);
        $("#movie-details .rating .value").text(movie.imdbRating);
        $("#movie-details .title").text(movie.Title);
        $("#movie-details .genre").text(movie.Genre);
        $("#movie-details .starring").text(`Starring: ${movie.Actors}`);
        $("#movie-details .released").text(`Release Date: ${movie.Released}`);
        $("#movie-details .runtime").text(`Runtime: ${movie.Runtime}`);
        $("#movie-details .plot").text(movie.Plot === "N/A" ? "" : movie.Plot);
        $("#movie-details").css("left", "0");
    };

    util.showLoadMoreBtn = () => {
        let loadMoreBtn = $("#load-more-btn");
        if (loadMoreBtn.hasClass("d-none")) {
            loadMoreBtn.removeClass("d-none");
            loadMoreBtn.addClass("d-block");
        }
        if (loadMoreBtn.hasClass("disabled")) {
            loadMoreBtn.removeClass("disabled");
            loadMoreBtn.text("Load More");
        }
    };

    util.hideLoadMoreBtn = () => {
        let loadMoreBtn = $("#load-more-btn");
        if (loadMoreBtn.hasClass("d-block")) {
            loadMoreBtn.removeClass("d-block");
            loadMoreBtn.addClass("d-none");
        }
    };

    util.disableLoadMoreBtn = () => {
        let loadMoreBtn = $("#load-more-btn");
        if (loadMoreBtn.hasClass("disabled") === false) {
            loadMoreBtn.addClass("disabled");
            loadMoreBtn.text("Loading...")
        }
    };

    util.showError = (error) => {
        // console.log(error);
        if (error === "timeout" || error === "error") {
            error = "Oops! Something went wrong. Please try again.";
        }
        let html = `
            <div class="mx-auto text-muted mt-5" style="font-size:1.25rem;font-weight:200;">${error}</div>
        `;
        $("#movie-list").html(html);
    };

    return util;
})();