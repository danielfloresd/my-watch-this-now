// function isMobile() {
//     // If screen size is small return true
//     if ($(window).width() < 768) {
//         return true;
//     } else {
//         return false;
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var initialView = isMobile() ? 'listWeek' : 'dayGridMonth';
    var calendar = new FullCalendar.Calendar(calendarEl, {
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
            console.log("Event clicked:", eventObj.url);
            var start = moment(eventObj.start).format('YYYY-MM-DD hh:mm');
            var delEvent = window.confirm("Would you like to delete " + eventObj.title + "@" + start);
            if (delEvent) {
                eventObj.remove();
                // Remove event from localStorage
                var events = JSON.parse(localStorage.getItem('events'));
                events.forEach(function (event, index) {
                    if (event.title == eventObj.title) {
                        events.splice(index, 1);
                    }
                });
                localStorage.setItem('events', JSON.stringify(events));

            } else {
                // alert("Event not deleted");
            }
        },
        initialDate: moment().format('YYYY-MM-DD'),
        events: getEvents(),
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        nowIndicator: true, // highlights the current time on the calendar
        initialView: initialView
    });

    $(".cal-view").on("click", function () {
        var view = $(this).data("view");
        calendar.changeView(view);
    });

    calendar.render();
});


function getEvents() {
    // Load events from localStorage
    var events = JSON.parse(localStorage.getItem('events')) || [];
    console.log(events);
    return events;
}