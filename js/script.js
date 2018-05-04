
let checkYearLength = (elem) => {
    if (elem.value.length > 4)
        elem.value = elem.value.slice(0, 4);
};

let initiateSearch = () => {
    let query = {
        type: $("#search-type").val(),
        year: $("#search-year").val(),
        term: $("#search-input").val()
    };

    if (query.term === "") return;

    ViewUtils.clearMovieList();

    MovieUtils.get(query, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        if (data.status === 0) {
            ViewUtils.showFetchingData();
        } else if (data.status === 1) {
            ViewUtils.showDataFetched();
            data.movies.forEach(movie => ViewUtils.displayMovie(movie));

            if (data.morePages) ViewUtils.showLoadMoreBtn();
            else ViewUtils.hideLoadMoreBtn();
        }
    });
};

let displayingDetails = false;
let displayMovieDetails = (id) => {
    if (displayingDetails) return;
    displayingDetails = true;
    
    MovieUtils.getMovieDetails(id, (err, data) => {
        if (err) return console.log(err);
        if (data.status === 1) {
            ViewUtils.displayMovieDetails(data.movie);
            displayingDetails = false;
        }
    });
};

let loadMorePages = () => {
    MovieUtils.getMorePages((error, data) => {
        if (error) return console.log(error);
        if (data.status === 0) {
            ViewUtils.disableLoadMoreBtn();
        } else if (data.status === 1) {
            ViewUtils.showLoadMoreBtn();
            data.movies.forEach(movie => ViewUtils.displayMovie(movie));

            if (data.morePages) ViewUtils.showLoadMoreBtn();
            else ViewUtils.hideLoadMoreBtn();
        }
    });
};

$(document).ready(() => {

    $("#search-input").keydown((e) => {
        if (e.keyCode === 13) initiateSearch();
    });

    $("#movie-details .back").click(() => $("#movie-details").css("left", "100%"));

});