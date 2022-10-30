// Script for now playing page

function createNowPlayingCards(results) {

    var movies = getNowPlaying();
    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        var movieCard = createMovieSmallCard(movie);
        // Add label for archivedAt date
        console.log("1.- Archived at: ",movie); // This is undefined
        var archivedAt = movie.archivedAt ? movie.archivedAt : new Date();
        console.log("2.- Archived at: ",archivedAt); // This is undefined
        var dateTime = moment(archivedAt).format("YYYY-MM-DD HH:mm");
        var archivedAtLabel = $("<h2>").addClass("badge badge-secondary").text("Watched at "+dateTime);   
        movieCard.append(archivedAtLabel);  // Add label to card
        // Create Link to delete movie from archive
        var deleteLink = createLink("trash",movie,deleteFromArchive); // Create link to delete movie from archive
        movieCard.append(deleteLink);  // Add label to card
        var buttons = createCardButtons("save", setToBeWatchedNowPlaying, "play", trailer, movie);
        movieCard.append(buttons);
        results.append(movieCard);
    }

}

function getNowPlaying() {
    return Movie.loadArchive();
}

function setToBeWatchedNowPlaying(movie) {
    movie.state = "to-be-watched";
    movie.archivedAt = null; // Set archivedAt to null when unarchiving
    movie.store();

}

function deleteFromArchive(movie) {
// Get confirmation from user
    var confirmation = confirm("Are you sure you want to delete this movie from the archive?"); // Get confirmation from user
    if(confirmation) { // If user confirms
        movie.removeArchive()
        reloadNowPlaying(); // Reload now playing page
    }
}

function trailer(movie) {
    trailerNowPlaying(movie);
}


function reloadNowPlaying() {
    $("#now-playing").empty();
    createNowPlayingCards($("#now-playing"));
    // searchNowPlaying();
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

    createNowPlayingCards($("#now-playing"));

}

$(document).ready(function () {
    // Reload the page
    initNowPlaying();
    reloadNowPlaying();

    // Add archive-clear listener
    $("#archive-clear").on("click",function(event) {
        var confirmation = confirm("Are you sure you want to clear the archive?"); // Get confirmation from user
        if(confirmation) { // If user confirms
            Movie.clearArchive();
            reloadNowPlaying(); // Reload now playing page
        }
    });
});