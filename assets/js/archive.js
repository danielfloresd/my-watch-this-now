// Script for now playing page
function createMovieSmallCard(movie) {
    var movieCard = $("<div>")
        .addClass("card fluid movie-small-card");
    var image = $("<img>")
        .addClass("right floated small ui image")
        .attr("src", movie.poster)
        .attr("alt", "Movie poster:" + movie.title);
    var a = $("<a>")
        .attr("href", movie.link());
    a.append(image);

    var movieBody = $("<div>")
        .addClass("eader movie-card-small-body");

    var movieTitle = $("<h3>")
        .addClass("itle movie-card-small-title")
        .text(movie.title);
    var movieExtraContent = $("<div>")
        .addClass("extra-content");
    var plot = movie.plot ? movie.plot.substring(0, 200) : "No plot available";

    var moviePlot = $("<p>").addClass("description movie-card-small-content").text(plot + "...");
    // var movieRanking = $("<p>")
    //     .text(rankingIcon(movie.ranking));
    movieExtraContent.append(moviePlot);

    movieCard.append(movieBody.append(a, movieTitle), movieExtraContent);
    return movieCard;
}
function createArchiveCards(results) {

    var movies = getArchive();
    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        var movieCard = createMovieTinyCard(movie);
        // Add label for archivedAt date
        var archivedAt = movie.archivedAt ? movie.archivedAt : new Date();
        var dateTime = moment(archivedAt).format("YYYY-MM-DD HH:mm A");
      
        var archivedAtLabel = $("<p>")
            .addClass("badge badge-secondary")
            .attr("style", "position: absolute; top: 0; right: 0; margin: 5px;background-color: black; color: white; opacity: 0.7;")
            .text("Watched at " + dateTime);
        // <div class="ui rating" data-max-rating="1"></div>
        var rating = $("<div>")
            .addClass("content")
            .append($("<div>")
                .addClass("ui star rating")
                .attr("id", "rating-" + movie.id));

        // Get card title and add rating to it
        var cardTitle = movieCard.find(".movie-card-tiny-title"); // Get card title
        cardTitle.append(rating); // Add rating to card title
        // movieCard.append(rating); // Add rating to card
        movieCard.append(archivedAtLabel);  // Add label to card

        // Create Link to delete movie from archive
        // / Add label to card
        var buttons = createCardButtons("save", setToBeWatchedArchive, "play", trailer, movie, "trash", deleteFromArchive); // Create buttons to save and play trailer");
        movieCard.append(buttons);
        results.append(movieCard);

        $("#rating-" + movie.id).rating({
            initialRating: movie.rating ? movie.rating : 0,
            maxRating: 5,
            // onRate: function (value) {
            //     movie.rating = value;
            //     movie.archive();
            // }
        });
        var cardLinks = movieCard.children(".description");

        searchSocial(movie, cardLinks);
        searchProvidersMovie(movie,cardLinks);
    }

}

function getArchive() {
    var movies = Movie.loadArchive();
    // Sort movies by newest first
    movies.sort(function (a, b) {
        return new Date(b.archivedAt) - new Date(a.archivedAt);
    });

    return movies;
}

function setToBeWatchedArchive(movie) {
    movie.state = "to-be-watched";
    movie.archivedAt = null; // Set archivedAt to null when unarchiving
    movie.store();

    movie.removeArchive(); // Remove movie from archive
    reloadArchive(); // Reload now playing page

}

function deleteFromArchive(movie) {
    // Get confirmation from user
    var confirmation = confirm("Are you sure you want to delete this movie from the archive?"); // Get confirmation from user
    if (confirmation) { // If user confirms
        movie.removeArchive()
        reloadArchive(); // Reload now playing page
    }
}

function trailer(movie) {
    trailerArchive(movie);
}


function reloadArchive() {
    $("#now-playing").empty();
    createArchiveCards($("#now-playing"));
    // searchArchive();
}
function trailerArchive(movie) {

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
function initArchive() {

    createArchiveCards($("#now-playing"));

}

$(document).ready(function () {
    // Reload the page
    initArchive();
    reloadArchive();

    // Add archive-clear listener
    $("#archive-clear").on("click", function (event) {
        var confirmation = confirm("Are you sure you want to clear the archive?"); // Get confirmation from user
        if (confirmation) { // If user confirms
            Movie.clearArchive();
            reloadArchive(); // Reload now playing page
        }
    });
});
