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
    return rank + " " + Math.round(ranking * 10) + "%";
}
// Create card buttons
function createCardButtons(button1, action1, button2, action2, movie, button3, action3, button4, action4) {
   
    var numBtns = button4 ? "four" : button3 ? "three" : "two";
    var buttons = $("<div>")
        // .attr("style", "background-color:black;margin:0px;align-items:center;justify-content:center;display:flex;")
        .attr("style", "margin:0px;align-items:center;justify-content:center;display:flex;")
    // .addClass(`ui  ${numBtns} bottom attached buttons card-buttons`);
    // .addClass(`ui icon buttons card-buttons`);
    var button1 = createButton(button1, movie, action1);
    var button2 = createButton(button2, movie, action2);
    if (button4) {
        var button3 = createButton(button3, movie, action3);
        var button4 = createButton(button4, movie, action4);

        buttons.append(button1, button2, button3, button4);
    } else if (button3) {
        var button3 = createButton(button3, movie, action3);

        buttons.append(button1, button2, button3);
    }
    else {
        var divider = $("<div>").addClass("or");
        buttons.append(button1, button2);
    }
    return buttons;
}

function getButtonAltText(iconName, movie) {

    if (iconName == "archive") {
        return "Archive";
    }
    else if (iconName == "play") {
        return "Watch Trailer";
    }
    else if (iconName == "trash") {
        return "Delete Movie";
    }
    else if (iconName == "calendar plus") {
        return "Add to Calendar";
    } else if (iconName == "users") {
        return "Show Cast";
    }
    else {
        return "Move " + movie.title + " to " + movie.nextState();
    }
    return "Unknown";
}
function createButton(iconName, movie, actionmethod) {
    var button = $("<button>")
        .addClass("ui button icon")
        // .text(text)
        .attr("data-movie-id", movie.id)
        .attr("alt", getButtonAltText(iconName, movie))
        .attr("title", getButtonAltText(iconName, movie))
        // .attr("style", "background-color: black; color: white;")
        .on("click", function (event) {
            var newMovie = Movie.loadMovie($(this).attr("data-movie-id"));
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

    // Create card
    var movieCard = $("<div>")
        .addClass("card movie-card-tiny")
    // .attr("style", "margin:1px;");
    // .attr("style", "height:m 300px;");
    // Create card image
    var image = $("<div>")
        .addClass("ui image")
        // .attr("src", movie.poster)
        .attr("alt", "Movie poster: " + movie.title)
        .attr("style", "background-image: url(" + movie.poster + "); background-size: cover; background-position: center; height: 450px;");

    var a = $("<a>")
        .addClass("ui movie-link-a")
        .attr("href", movie.link());
    a.append(image);

    // Create card content
    var cardContent = $("<div>")
        .addClass("content movie-card-tiny-content")
    // .attr(`style`, `background-color: black; color: white;`);
    // Create card header
    // var movieHeader = $("<div>")
    //     .addClass("header movie-card-tiny-body")
    // .attr("style", "background-color: rgba(0, 151, 19, 0.1)");
    // .attr("style", "padding: 10px; margin: 0px; opacity: 0.1;")
    // .attr("style", "background-image: url(" + movie.poster + "); background-size: cover; background-position: center; height: 200px;");
    var movieImageIcons = $("<div>")
        .addClass("sub header image-icons movie-card-tiny-image-icons")

    image.prepend(movieImageIcons);
    var movieTitle = $("<h2>")
        .addClass("header movie-card-tiny-title")
        .text(movie.title)
    // .attr("style", "height:55px;font-size:large;background-color:black;color:white;padding: 10px; margin: 0px; text-shadow: 0 0 3px #000000, 0 0 5px #000000;");
    // .attr("style", "height:55px;font-size;padding: 10px; margin: 0px; text-shadow: 0 0 3px #000000, 0 0 5px #000000;");
    // movieHeader.append(movieTitle);
    a.append(movieTitle);
    var cardMeta = $("<div>")
        .addClass("sub header movie-card-tiny-meta");

    var movieRanking = $("<p>")
        .text(rankingIcon(movie.ranking))
        // .attr("style", "color: white; background-color:black;padding: 0px; margin: 0px;");
        .attr("style", "padding: 0px; margin: 0px;");
    // notesLink.prepend(notesImage);

    // movieSubHeader.append(notesLink);
    var plot = movie.plot ? movie.plot.substring(0, 200) : "No plot available";
    var movieDescription = $("<p>")
        .addClass("description movie-card-tiny-content")
        // .attr("style", "color: white; padding: 1px; margin: 0px; height: 80px;")
        .attr("style", "padding: 1px; margin: 0px; height: 80px;")
        .text(plot + "...");

    // cardMeta.append(movieDescription);
    cardContent.append(a);
    cardContent.append(cardMeta);
    cardMeta.append(movieRanking);
    cardContent.append(movieDescription);


    var movieExtraContent = $("<div>")
        .addClass("extra-content");
    var releaseDate = $("<p>")
        .addClass("release-date")
        .text(moment(movie.release_date).format("YYYY"));
        movieExtraContent.append(releaseDate);  

    // Append card elements
    movieCard.append(image, cardContent, movieExtraContent);

    return movieCard;
}
function createMovieTinyCard(movie) {
    
    // Create card
    var movieCard = $("<div>")
        .addClass("card movie-card-tiny")
        .attr("style", "width: 170px;");
    // Create card image
    var image = $("<div>")
        .addClass("ui image")
        // .attr("src", movie.poster)
        .attr("alt", "Movie poster: " + movie.title)
        .attr("style", "background-image: url(" + movie.poster + "); background-size: cover; background-position: center; height: 250px; width: 200px;");

    var a = $("<a>")
        .addClass("ui movie-link-a")
        .attr("href", movie.link());
    a.append(image);

    // Create card content
    var cardContent = $("<div>")
        .addClass("content movie-card-tiny-content")
        .attr(`style`, `padding: 1px; margin: 1px;`);
    // Create card header
    var movieHeader = $("<div>")
        .addClass("header movie-card-tiny-body")
    // .attr("style", "background-image: url(" + movie.poster + "); background-size: cover; background-position: center; height: 200px;");
    var movieImageIcons = $("<div>")
        .addClass("sub header image-icons movie-card-tiny-image-icons")

    image.prepend(movieImageIcons);
    var movieTitle = $("<h4>")
        .addClass("title movie-card-tiny-title")
        .text(movie.title)//.substring(0, 30))
        // .attr("style", "color: white; background-color:black;padding: 10px; margin: 0px; height: 50px; overflow: hidden;");
        .attr("style", "padding: 0px; margin: 0px; height: 35x;");
    movieHeader.append(movieTitle);

    var cardMeta = $("<div>")
        .addClass("meta movie-card-tiny-meta");


    // notesLink.prepend(notesImage);

    // movieSubHeader.append(notesLink);
    var plot = movie.plot ? movie.plot.substring(0, 100) : "No plot available";
    var movieDescription = $("<p>")
        .addClass("description movie-card-tiny-content")
        .attr("style", "padding: 1px; margin: 1px; font-size:x-small; hheight: 30px")//.text(plot + "...");
    movieDescription.text(plot + "...");
    // Create movie description <p> element



    // .attr("style", "color: black; padding: 5px; margin: 0px; height: 30px;")

    // cardContent.append(cardMeta, movieDescription);
    // cardContent.append(cardMeta);

    var releaseDate = $("<p>")
        .addClass("release-date")
        .text(moment(movie.release_date).format("YYYY"));
    var movieExtraContent = $("<div>")
        .addClass("extra-content")
        // .attr("style", "background-color: black; color: white;padding: 0px; margin: 0px;");
        .attr("style", "padding: 0px; margin: 0px;")
    movieExtraContent.append(releaseDate);

    cardMeta.append(movieDescription);
    cardContent.append(cardMeta);
    cardContent.append(movieExtraContent);
    // Append card elements
    // movieCard.append(image, movieHeader, cardContent, movieExtraContent);
    movieCard.append(image, movieHeader, cardContent);

    return movieCard;
}

function showNotes(movie) {
    // $("#my-comments").attr("style","background-image: url(" + movie.poster + "); background-size: cover; background-position: center;");

    var movieNotes = movie.getNotes();
  
    for (var i = 0; i < movieNotes.length; i++) {
        var note = movieNotes[i];
        var movieNote = createNote(note);
        $("#my-comments").append(movieNote);
    }

    $("#comments-modal").modal("show");
    $("#comments-button").on("click", function () {
        var note = $("#comments-text").val();
       
        var aNote = movie.addNote(note);
        // $("#comments-modal").modal("hide");
        movie.store();
        $("#comments-text").val("");
        var movieNote = createNote(aNote);
        $("#my-comments").append(movieNote);
    });
    $("#comments-clear-button").on("click", function () {
        var note = $("#comments-text").val();
        var aNote = movie.myNotes = [];
        // $("#comments-modal").modal("hide");
        movie.store();
        $("#my-comments").empty();

    });
}

function createNote(note) {

    var comment = $("<div>")
        .addClass("comment");
    var avatar = $("<a>")
        .addClass("avatar");
    var avatarIcon = $("<i>")
        .addClass("ui user icon");
    avatar.append(avatarIcon);
    var content = $("<div>")
        .addClass("content");
    var author = $("<a>")
        .addClass("author")
        // .attr("style", "color:black")
        .text("Me");
    var metadata = $("<div>")
        .addClass("metadata");
    var date = $("<span>")
        .addClass("date")
        .text(note[0]);
    metadata.append(note[0]);
    var text = $("<div>")
        .addClass("text")
        .text(note[1]);
    var actions = $("<div>")
        .addClass("actions");
    // var reply = $("<a>")
    //     .addClass("reply")
    //     .text("Reply");
    // actions.append(reply);
    content.append(author, metadata, text, actions);
    comment.append(avatar, content);
    return comment;
}

function findSocial(movie, cardLinks) {
    // Add provider images to card
    createSocialLinks(cardLinks, movie);

}

function createSocialLinks(cardLinks, movie) {

    var socialKeys = movie.social ? Object.keys(movie.social) : [];
    for (var i = 0; i < socialKeys.length; i++) {
        var socialKey = socialKeys[i];
        if (socialKey) {
            var socialLink = movie.social[socialKey];
            var socialLogo = SOCIAL_MEDIA_LOGOS[socialKey];
            var socialLink = $("<a>")
                .attr("href", socialLink)
                .attr("target", "_blank")
            var socialImage = $("<img>")
                .addClass("ui avatar image movie-card-small-avatar")
                .attr("src", socialLogo)
                .attr("alt", i + " " + socialKey + " logo");
            socialLink.append(socialImage);
            cardLinks.prepend(socialLink);
        }

    }
}

function findProviders(movie, cardLinks) {
    // Add provider images to card
    createProviderLinks(cardLinks, movie);
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
        if (!cardLinks)
            console.log("No cardLinks", movie);
        cardLinks.prepend(providerLink);
    }

}

    // Add providerLink to the beggining of the cardLinks