
let MovieUtils = (() => {
    let util = {};

    const apikey = "c9455792"; //9a016429
    const urlTemplate = `https://www.omdbapi.com/?apikey=${apikey}&type=movie`;

    let movies = [];
    let queryState = { page: 1, query: null };

    let getByTitle = (query, callback) => {
        let url = `${urlTemplate}&s=${query.term}${query.year ? "&y=" + query.year : ""}&page=${queryState.page}`;

        $.ajax({
            type: "GET",
            datatype: "json",
            url,
            success: data => {
                if (data.Response === "False") return callback(data.Error);

                if (data.totalResults > queryState.page * 10) queryState.page += 1;
                else queryState.page = 1;

                callback(null, { status: 1, movies: data.Search, morePages: queryState.page > 1 });

                data.Search.map(movie => movie.imdbID).forEach(id => util.getMovieDetails(id));
            },
            error: err => callback(err),
            beforeSend: () => callback(null, { status: 0 }),
            timeout: 10000
        });
    };

    let getByIMDbID = (query, callback) => {
        let url = `${urlTemplate}&i=${query.term}${query.year ? "&y=" + query.year : ""}`;

        $.ajax({
            type: "GET",
            datatype: "json",
            url,
            success: data => {
                if (data.Response === "False") return callback(data.Error);
                callback(null, { status: 1, movies: [data], morePages: false });
                util.getMovieDetails(data.imdbID);
            },
            error: err => callback(err),
            beforeSend: () => callback(null, { status: 0 }),
            timeout: 10000
        });
    };

    util.get = (query, callback) => {
        queryState = { page: 1, query };
        switch (query.type) {
            case "title": return getByTitle(query, callback);
            case "imdb-id": return getByIMDbID(query, callback);
            default: return callback("Invalid Type");
        }
    };

    util.getMovieDetails = (id, callback) => {
        let movie = movies.find(movie => movie && movie.imdbID === id);
        if (movie) return callback && callback(null, { status: 1, movie });

        let url = `${urlTemplate}&i=${id}`;

        $.ajax({
            type: "GET",
            datatype: "json",
            url,
            success: data => {
                if (data.Response === "False") return callback && callback(data.Error);
                if (callback) callback(null, { status: 1, movie: data });
                movies.push(movie);
            },
            error: err => callback && callback(err),
            beforeSend: () => callback && callback(null, { status: 0 }),
            timeout: 10000
        });
    };

    util.getMorePages = (callback) => {
        if (queryState.query === null) return callback("Sorry, we can't find more pages. Please try again.");
        getByTitle(queryState.query, callback);
    };

    return util;
})();