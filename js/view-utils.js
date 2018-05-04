
let ViewUtils = (() => {
    let util = {};

    util.showFetchingData = () => {
        let html = `
            <div class="mx-auto text-muted" style="font-size:2rem;font-weight:200;">Searching...</div>
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
                        <h4 class="card-title h6 m-0" style="font-weight:600;">${movie.Title}(${movie.Year})</h4>
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
        $("#movie-details .image img").attr("src", movie.Poster === "N/A" ? "images/dummy.png" : movie.Poster);
        $("#movie-details .rating .votes").text(movie.imdbVotes);
        $("#movie-details .rating .value").text(movie.imdbRating);
        $("#movie-details .title").text(movie.Title);
        $("#movie-details .starring").text(`Starring: ${movie.Actors}`);
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

    return util;
})();