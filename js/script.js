
let checkYearLength = (elem) => {
    if (elem.value.length > 4)
        elem.value = elem.value.slice(0, 4);
};

let initiateSearch = () => {
    let query = {
        type: $("#search-type .option-item.selected").data("value"),
        year: $("#search-year").val(),
        term: $("#search-input").val()
    };

    console.log(query.type);

    if (query.term === "") return;

    ViewUtils.clearMovieList();
    ViewUtils.hideLoadMoreBtn();

    MovieUtils.get(query, (error, data) => {
        if (error) {
            ViewUtils.showError(error);
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
        if (error) {
            ViewUtils.showLoadMoreBtn();
        }
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

    $(document).keydown(e => {
        if (e.keyCode === 8 && $("#movie-details").css("left") === "0px") {
            $("#movie-details").css("left", "100%");
        }
    });

    $(".option-group").each(function () {
        let placeholder = $(this).find(".option-placeholder");
        let optionList = $(this).find(".option-list");
        let optionItem = $(this).find(".option-item");
        let selected = $(this).find(".option-item.selected");

        placeholder.text(selected.text());
        placeholder.data("value", selected.data("value"));
        $(this).click(e => {
            e.stopPropagation();
            if ($(window).innerWidth() < 576) return;
            if (optionList.css("display") === "none") {
                optionList.css("display", "flex");
            } else {
                optionList.css("display", "none");
            }
        });
        optionItem.click(function () {
            optionItem.each(function () {
                if ($(this).hasClass("selected")) $(this).removeClass("selected");
            });
            $(this).addClass("selected");
            placeholder.text($(this).text());
            placeholder.data("value", $(this).data("value"));
        });
    });

    $(document).click(e => {
        if ($(window).innerWidth() > 575) $(".option-group .option-list").css("display", "none");
    });

});