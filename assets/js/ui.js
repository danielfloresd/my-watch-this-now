var myfoundMoviesCards = {};
var myToBeWatchedMoviesCards = {};
// Create movie card
function createMovieAvatarCard(movie) {
    var item = $("<div>").addClass("item");
    var image = $("<img>")
        .addClass("ui avatar image")
        .attr("src", movie.poster)
        .attr("alt", movie.title)
    var a = $("<a>").attr("href", movie.link());
    a.append(image);

    item.append(a);
    return item;
}

function createMovieTextCard(movie) {
    var item = $("<div>").addClass("card movie-text-card");
    var image = $("<img>")
        .addClass("ui floated right avatar image")
        .attr("src", movie.poster)
        .attr("alt", movie.title)
    var a = $("<a>").attr("href", movie.link());
    // a.append(image);
    var content = $("<div>")
        .addClass("extra content movie-text-card-body")
    //     .attr("style", "height:95%;");
    var header = $("<p>")
        .addClass("title movie-text-card-title")
        .text(movie.title)

    a.append(header);
    content.append(image, header);
    item.append(content);
    return item;
}

function createMovieMiniCard2(movie) {
    var item = $("<div>").addClass("card");
    var image = $("<img>")
        .addClass("ui tiny image right floated")
        .attr("src", movie.poster)
        .attr("alt", "Movie: " + movie.title)
        .attr("data-title", movie.title)
        .attr("data-content", movie.plot)
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var content = $("<div>").addClass("content");
    var header = $("<p>").addClass("").text("⭐" + movie.title.substring(0, 30));

    content.append(header);
    item.append(a, header);
    return item;
}

function createMovieMiniCard(movie) {
    var numChars = 50;
    var movieCard = $("<div>")
        .addClass("ui card movie-mini-card")
    // .attr("style", "max-height: 150px;");

    var image = $("<img>").addClass("right floated mini ui image").attr("src", movie.poster).attr("alt", "Movie: " + movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("header movie-card-mini-body")
    var title = movie.title;//.substring(0,numChars);

    var movieTitle = $("<p>")
        .addClass("movie-card-mini-title")
        .text(title)

    movieCard.append(movieBody.append(a, movieTitle));
    return movieCard;
}

// Helper fuction to convert movie ranking to heart emoji list

function createMovieTinyCard(movie) {

    var movieCard = $("<div>").addClass("card movie-card-tiny");
    var image = $("<img>").addClass("right floated tiny ui image").attr("src", movie.poster).attr("alt", "Movie poster: " + movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("header movie-card-tiny-body")

    var movieTitle = $("<h4>")
        .addClass("title movie-card-tiny-title")
        .text(movie.title.substring(0, 30))

    var plot = movie.plot ? movie.plot.substring(0, 50) : "No plot available";
    var moviePlot = $("<p>")
        .addClass("content")
        .text(plot + "...");
    movieCard.append(movieBody.append(a, movieTitle), moviePlot);
    return movieCard;
}

// Create card buttons
function createCardButtons(button1, action1, button2, action2, movie, button3, action3) {
    var numBtns = button3 ? "three" : "two";
    var buttons = $("<div>").addClass(`ui ${numBtns} bottom attached buttons card-buttons`);
    var button1 = createButton(button1, movie, action1);
    var button2 = createButton(button2, movie, action2);
    if (button3) {
        var button3 = createButton(button3, movie, action3);
        buttons.append(button1, button2, button3);
    } else {
        buttons.append(button1, button2);
    }
    return buttons;
}

// Create card buttons
function createCardLinks(button1, action1, button2, action2, movie, button3, action3) {
    var links = $("<div>").addClass("header card-links");
    var link1 = createLink(button1, movie, action1);
    var link2 = createLink(button2, movie, action2);
    if (button3) {
        var link3 = createLink(button3, movie, action3);
        links.append(link1, link2, link3);
    } else {
        links.append(link1, link2);
    }
    return links;
}

// fuction createButton
function createLink(iconName, movie, actionmethod) {

    var button = $("<a>")
        .addClass("ui movie-link-a")
        // .text(iconName)
        .attr("data-movie", movie.toString())

        .on("click", function (event) {
            var newMovie = Movie.parse($(this).attr("data-movie"));
            // console.log("Clicked-----",newMovie);
            actionmethod(newMovie);
        });
    // <i class="cloud icon"></i>
    var icon = $("<i>").addClass(iconName + " icon");
    button.append(icon);
    return button;
}

function findProviders(movie) {
    // Add provider images to card
    var card = myfoundMoviesCards[movie.id];
    if (card) {
        // Get data attribute from card data-has-links
        var hasLinks = card.attr("data-has-links");
        if (!hasLinks) {
            var cardLinks = card.children(".movie-card-small-body");
    
            createProviderLinks(cardLinks, movie);
        }
    }

    card = myToBeWatchedMoviesCards[movie.id];
    if (card) {
        card = myToBeWatchedMoviesCards[movie.id];
        var hasLinks = card.attr("data-has-links");
        if (!hasLinks) {
            cardLinks = card.children(".movie-card-tiny-body");
            createProviderLinks(cardLinks, movie);
        }
    }
}

function createProviderLinks(cardLinks, movie) {

    var providerNum = movie.providers ? movie.providers.length : 0;
    //Handle only 4 providers for now
    if (providerNum > 3)
        providerNum = 3;

    for (var i = 0; i < providerNum; i++) {
        var pr = movie.providers[i];
        var providerLogo = movie.providersLogos[i];
        var providerLink = $("<a>")
            .attr("href", PROVIDERS_URL[pr])
            .attr("target", "_blank")
        var providerImage = $("<img>")
            .addClass("ui avatar image movie-card-small-avatar")
            .attr("src", providerLogo)
            .attr("alt", i + " " + pr + " logo");
        providerLink.append(providerImage);

        // Add providerLink to the beggining of the cardLinks
        cardLinks.prepend(providerLink);
    }

}

function createActorCard(actor, character, actorImage) {
    var actorCard = $("<div>").addClass("ui card actor-card");
    var actorImage = $("<img>").addClass("ui tiny image").attr("src", actorImage).attr("alt", "Actor: " + actor + " playing " + character);
    var actorBody = $("<div>").addClass("content");
    var actorName = $("<a>").addClass("header").text(actor);
    var actorCharacter = $("<div>").addClass("meta").text(character);
    actorBody.append(actorName, actorCharacter);
    // actorBody.append(actorName);
    actorCard.append(actorImage, actorBody);
    return actorCard;
}

function found(movie) {
    // Hide loader

    var results = $("#search-results");
    var card = createMovieSmallCard(movie);
    var buttons = createCardButtons("save", setToBeWatched, "play", trailer, movie, "users", cast);

    card.append(buttons);
    // card.append(buttons);
    myfoundMoviesCards[movie.id] = card;
    results.append(card);
    $("#loader-modal").modal("hide");
    $("#resultsmodal").modal("show");
}

// Add addToWatched function will add the movie to the watched list
function setToBeWatched(movie) {
    movie.state = "to-be-watched";
    movie.store();
    // findStreamingMovies(movie);
    reloadMovies();
}

function setWatching(movie) {
    movie.state = "watching";
    movie.store();
    reloadMovies();
}

function setWatched(movie) {
    movie.state = "watched";
    movie.store();
    reloadMovies();
}
// Add toBeWatched function will add the movie to the database

function toBeWatched(movie) {
    var results = $("#to-be-watched");

    var card = createMovieTinyCard(movie);
    var buttons = createCardButtons("eye", setWatching, "archive", deleteMovie, movie, "calendar plus", scheduleMovie);

    myToBeWatchedMoviesCards[movie.id] = card;
    // Get card children by class name
    searchProvidersMovie(movie);

    card.append(buttons);
    results.append(card);
}

// Add watched function will add the movie to the database
function watching(movie) {

    var results = $("#watching");

    var card = createMovieTinyCard(movie);
    var buttons = $("<div>");//.addClass("ui buttons");
    var watchedButton = createButton("check", movie, setWatched);
    var deleteButton = createButton("archive", movie, deleteMovie);
    var buttons = createCardButtons("check", setWatched, "archive", deleteMovie, movie, "calendar plus", scheduleMovie);
    // buttons.append(watchedButton, deleteButton);
    card.append(buttons);
    results.append(card);

}

// Add watched function will add the movie to the database
function watched(movie) {
    var results = $("#watched");
    var card = createMovieTinyCard(movie);
    var buttons = $("<div>");//.addClass("ui two buttons");
    var button1 = createButton("archive", movie, archive);

    button1.text("👎");

    var button2 = createButton("heart", movie, archive);
    button2.text("👍");
    var rating = $("<div>").addClass("ui star rating").attr("data-rating", 0).attr("data-max-rating", "5");
    var buttons = createCardButtons("thumbs up outine", archive, "thumbs down outline", archive, movie, "star", archive);
    card.append(rating);
    // buttons.append(button2, button1, rating);
    card.append(buttons);
    results.append(card);
}

// Function to watch trailer
function trailer(movie) {

    if (isMobile()) {
        watchTrailer(movie.id);
    } else {
        $("#video-player").empty()
        $("#trailer-title").text(movie.title);
        var plot = movie ? movie.plot : "No plot available";
        $("#trailer-description").text(movie.plot);
        $("#trailer-modal").modal("show");
        watchTrailerEmbed(movie.id, $("#video-player"));
    }
}

function providers(movie) {
    console.log("providers", movie);
    $("#provider-modal-images").empty();
    for (var i = 0; i < movie.providers.length; i++) {
        $("#provider-modal-images")
            .append($("<img>")
                .attr("src", movie.providersLogos[i]))
            .addClass("ui tiny image");

    }
    $("#provider-modal").modal("show");
}

// Add removeMovie function will remove the movie from the database
function deleteMovie(movie) {

    // Get confirmation from the user
    var confirmation = confirm("Are you sure you want to delete " + movie.title + "?");
    if (confirmation) {
        movie.remove();
        reloadMovies();
    }
}

function archive(movie) {
    movie.archive();
    movie.remove();
    reloadMovies();
}

// Add good movie function
function ratings(movie) {
    movie.rating = 5;
    movie.store();

    console.log("rating", movie);
    // reloadMovies();
}

function badMovie(movie) {

}

function cast(movie) {
    console.log("Searching for cast:", movie);
    searchCast(movie)
}


function findCast(movie) {
    $("#movie-modal-description").empty();
    console.log("cast found:", movie);
    var castNum = movie.cast.length > 20 ? 20 : movie.cast.length;
    for (var i = 0; i < castNum; i++) {
        var actor = movie.cast[i];
        var actorImage = movie.castImages[i];
        var character = movie.castCharacters[i];
        var actorCard = createActorCard(actor, character, actorImage);
        $("#movie-modal-description").append(actorCard);
    }
    $("#movie-modal-title").text(movie.title + " cast");
    $("#movie-modal").modal("show");

}


function scheduleMovie(movie) {
    $("#schedule-modal").modal("show");
    $("#schedule-modal-title").text("Schedule " + movie.title);
    $("#schedule-modal-img").attr("src", movie.poster);
    // Set todays date as the default date in the input field
    $("#schedule-date")
        .val(moment().format("YYYY-MM-DD") + " 17:00")
        .attr("min", moment().format("YYYY-MM-DD hh:mm"));
    $("#schedule-modal-description").text("Select the date you want to watch " + movie.title);

    $("#saveScheduleBtn").on("click", function () {
        var date = $("#schedule-date").val();
        var dateTime = moment(date).format("YYYY-MM-DD HH:mm");
        var movieUrl = "https://www.themoviedb.org/movie/" + movie.id;


        var movieEvent = {
            id: movie.id,
            title: movie.title,
            start: dateTime,
            description: movie.title + " " + dateTime
            // url: movieUrl
        };

        console.log("movieEvent", movieEvent);

        // Store event in localStorage
        var events = JSON.parse(localStorage.getItem("events")) || [];
        // Check if the event is already in the localStorage
        // Delete previous event if it exists
        for (var i = 0; i < events.length; i++) {
            if (events[i].title === movie.title)
                events.splice(i, 1);
        }

        events.push(movieEvent);
        localStorage.setItem("events", JSON.stringify(events));
        $("#schedule-modal").modal("hide");
        // 
        // reloadMovies();
    });
    reloadMovies();
    setTimeout(function () {
        $('.ui.modal').modal('refresh');
    }, 300);
}

// Add function to reload local storage and reload the page
function reloadMovies() {

    $("#to-be-watched").empty();
    $("#watching").empty();
    $("#watched").empty();
    var movies = Movie.loadMovies();
    movies.forEach(function (movie) {
        // console.log(movie);
        if (movie.isToBeWatched()) {
            toBeWatched(movie);
        } else if (movie.isWatching()) {
            watching(movie);
        } else if (movie.isWatched()) {
            watched(movie);
        }
    });
}


function initUI() {

    $("#searchBtn").on("click", function (event) {
        var keyword = $("#keyword").val().trim();
        console.log("click");
        $("#search-results").empty();
        $("#loader-modal").modal("show");

        // Clear movie card cache
        myfoundMoviesCards = {};

        var movies = searchMovie(keyword, $("#results"));

        // setTimeout(function () {
        //     $('.ui.modal').modal('refresh');
        // }, 300);

        // Comment end here to disable search results modal
    });

    $("#clearSearchBtn").on("click", function (event) {
        $("#keyword").val("");
        clearHistory();
    });

    $("#keyword").on("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#searchBtn").click();
        }
    });

    $("#results-close").on("click", function (event) {
        $("#search-results").empty();
        $("resultsmodal").modal("hide");
    });

    $("#trailer-close").on("click", function (event) {
        $("#video-player").attr("src", "");
        $("#trailer-modal").modal("hide");
    });

    // If the document is ready reload
}

$(document).ready(function () {
    // Reload the page
    initUI();
    reloadMovies();
});