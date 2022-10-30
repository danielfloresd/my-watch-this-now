// Script for now playing page

function createNowPlayingCards(results) {

    var movies = getNowPlaying();
    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        var movieCard = createMovieSmallCard(movie);
        var buttons = createCardButtons("save", setToBeWatchedNowPlaying, "play", trailer, movie);
        movieCard.append(buttons);
        results.append(movieCard);
    }

}

function setToBeWatchedNowPlaying(movie) {
    movie.state = "to-be-watched";
    movie.store();

}

function trailer(movie) {
    trailerNowPlaying(movie);
}


function reloadNowPlaying() {
    searchNowPlaying();
}
function trailerNowPlaying(movie) {

    if (isMobile()) {
        watchTrailer(movie.id);
    } else {
        $("#np-video-player").empty()
        $("#np-trailer-title").text(movie.title);
        var plot = movie ? movie.plot : "No plot available";
        $("#np-trailer-description").text(movie.plot);
        $("#np-trailer-modal").modal("show");
        watchTrailerEmbed(movie.id, $("#np-video-player"));
    }
}
function initNowPlaying() {

    $("#np-searchBtn").on("click", function (event) {

        $("#now-playing").empty();

        createNowPlayingCards($("#now-playing"));

    });

    $("#np-keyword").on("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#np-searchBtn").click();
        }
    });

}

$(document).ready(function () {
    // Reload the page
    initNowPlaying();
    reloadNowPlaying();
    $('.ui.search')
        .search({
            source: getSearchContent(),
            showNoResults: false
        });
});