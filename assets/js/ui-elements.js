// Add function to dermine if page is mobile
function isMobile() {
    // If screen size is small return true
    if ($(window).width() < 768) {
        return true;
    } else {
        return false;
    }
}
function rankingIcon(ranking) {
    var heartEmojies = ["💛", "💙", "💚", "💜", "💜", "❤️", "❤️", "❤️", "❤️"];
    var emojieCount = 0;
    var rank = "";
    for (var i = 0; i < Math.round(ranking); i++) {
        rank += heartEmojies[emojieCount];
        emojieCount++;
        if (emojieCount >= heartEmojies.length) {
            emojieCount = 0;
        }
    }
    return rank + " " + ranking;
}
// Create card buttons
function createCardButtons(button1, action1, button2, action2, movie, button3, action3) {
    var numBtns = button3 ? "three" : "two";
    var buttons = $("<div>")
        // .addClass(`ui  ${numBtns} bottom attached buttons card-buttons`);
        .addClass(`ui icon buttons card-buttons`);
    var button1 = createButton(button1, movie, action1);
    var button2 = createButton(button2, movie, action2);
    if (button3) {
        var button3 = createButton(button3, movie, action3);
        var divider1 = $("<div>").addClass("or");
        var divider2 = $("<div>").addClass("or");
        buttons.append(button1, button2, button3);
    } else {
        var divider = $("<div>").addClass("or");
        buttons.append(button1,button2);
    }
    return buttons;
}


function createButton(iconName, movie, actionmethod) {
    var button = $("<button>")
        .addClass("ui button")
        // .text(text)
        .attr("data-movie", movie.toString())
        .attr("alt", movie.title + " " + iconName)
        .attr("title", movie.title + " " + iconName)
        .on("click", function (event) {
            var newMovie = Movie.parse($(this).attr("data-movie"));
            //    Get event target element
            var target = $(event.target);
            // Set button to loading
            // Hack to change button text if it is save button
            if (iconName === "save") {
                target.addClass("green");
                target.text("✔");
            }
            // Get target children
            var children = target.children()[0];
            actionmethod(newMovie);
        });
    var icon = $("<i>")
        .addClass(iconName + " icon")
        .on("click", function (event) {
            event.stopPropagation();
            // Get parent button
            var parent = $(this).parent();
            // Send click event to parent
            parent.trigger("click");
        });
    button.append(icon);
    return button;
}


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

function createMovieSmallCard(movie) {
    var movieCard = $("<div>")
        .addClass("card movie-small-card");
    var image = $("<img>")
        .addClass("right floated small ui image")
        .attr("src", movie.poster)
        .attr("alt", "Movie poster:"+ movie.title);
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
    var movieRanking = $("<p>")
        .text(rankingIcon(movie.ranking));
    movieExtraContent.append(moviePlot, movieRanking);
 
    movieCard.append(movieBody.append(a, movieTitle), movieExtraContent);
    return movieCard;
}

function createMovieTinyCard(movie) {

    var movieCard = $("<div>").addClass("card movie-card-tiny");
    var image = $("<img>").addClass("right floated tiny ui image").attr("src", movie.poster).attr("alt", "Movie poster: " + movie.title);
    var a = $("<a>").attr("href", movie.link());
    a.append(image);
    var movieBody = $("<div>")
        .addClass("header movie-card-tiny-body")

    var movieTitle = $("<h3>")
        .addClass("title movie-card-tiny-title")
        .text(movie.title.substring(0, 30))

    var plot = movie.plot ? movie.plot.substring(0, 150) : "No plot available";
    var moviePlot = $("<p>")
        // .addClass("content")
        .text(plot + "...");
    movieCard.append(movieBody.append(a, movieTitle), moviePlot);
    return movieCard;
}