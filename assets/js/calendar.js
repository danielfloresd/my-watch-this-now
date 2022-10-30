var calendar; // Global variable
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var initialView = isMobile() ? 'listWeek' : 'dayGridMonth';
    calendar = new FullCalendar.Calendar(calendarEl, {
        eventDidMount: function (info) {
            var tooltip = new Tooltip(info.el, {
                title: info.event.extendedProps.description,
                placement: 'top',
                trigger: 'hover',
                container: 'body'
            });
        },
        eventClick: function (info) {
            var eventObj = info.event;
            var start = moment(eventObj.start).format('YYYY-MM-DD HH:mm');
            showMovie(eventObj.id, start); // Show movie details in modal window
        },
        initialDate: moment().format('YYYY-MM-DD'),
        events: getEvents(),
        eventDisplay: 'block', // show the event title even on the day view
        eventColor: '#d75788',
        eventBackgroundColor: '#d75788', // an option!
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        nowIndicator: true, // highlights the current time on the calendar
        initialView: initialView,
        editable: false, // enable draggable events
        // themeSystem: 'bootstrap',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
    });

    // $(".cal-view").on("click", function () {
    //     var view = $(this).data("view");
    //     calendar.changeView(view);
    // });

    addEventListeners();

    calendar.render();
});


function showMovie(id, start) {
    var movie = Movie.loadMovie(id);

    if (movie) {
      
        $("#movie-modal-title")
            .attr("data-movie-id", movie.id)
            .attr("data-movie", movie.toString()) // Set movie id in modal window
        $("#movie-modal-title").text(movie.title);
        $("#movie-plot").text(movie.plot);
        $("#movie-modal-img").attr("src", movie.poster);
        $("#movie-date").val(start); // Set date in modal window
        // $("#movie-trailer").attr("src", movie.trailer);
        $("#movie-modal").modal("show");
    }
}


function getEvents() {
    // Load events from localStorage
    var events = JSON.parse(localStorage.getItem('events')) || [];
  
    return events;
}



function deleteEvent(id) {
    // Remove event from localStorage
    var events = JSON.parse(localStorage.getItem('events'));
    events.forEach(function (event, index) {
        if (event.id == id) {
            events.splice(index, 1);
        }
    });
    localStorage.setItem('events', JSON.stringify(events));
}

function saveEvent(event) {
    // Save event to localStorage
    var events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

function addEventListeners() {

    $("#save-movie-button").on("click", function () {

        var movie = Movie.parse($("#movie-modal-title").attr("data-movie")); // Get movie id from modal window
    
        // var movieId = $("#movie-modal").attr("data-movie-id"); // Get movie id from modal window
        // var movie = Movie.loadMovie(movieId);
        var date = $("#movie-date").val();
        var dateTime = moment(date).format("YYYY-MM-DD HH:mm");
        var movieUrl = "https://www.themoviedb.org/movie/" + movie.id;


        var movieEvent = {
            id: movie.id,
            title: movie.title,
            start: dateTime,
            description: movie.title + " " + dateTime
            // url: movieUrl
        };

        deleteEvent(movieEvent.id);
        saveEvent(movieEvent); // Save event to localStorage
        $("#movie-movie-modal").modal("hide");
        // window.location.reload(); // Reload page to show new event
        calendar.render(); // Reload calendar to show new event
        // 
        // reloadMovies();
    });

    $("#delete-movie-button").on("click", function () {
        var movie = Movie.parse($("#movie-modal-title").attr("data-movie")); // Get movie id from modal window
        deleteEvent(movie.id);
        $("#movie-movie-modal").modal("hide");
        // window.location.reload(); // Reload page to show new event
        calendar.render(); // Reload calendar to show new event
    });
}