$(function() {
    $("#frame_mes0").swipe({
        swipe: function(event, direction, distance, duration, fingerCount) {
            switch (direction)
            {
                case "right":
                    $.mobile.changePage("#frame_mes1", {transition: "slide", reverse: true});
                    break;
            }
        },
        fingers: 'all',
        allowPageScroll:"vertical"
    });
    $("#frame_mes1").swipe({
        swipe: function(event, direction, distance, duration, fingerCount) {
           
            switch (direction)
            {
                case "right":
                    $.mobile.changePage("#frame_mes2", {transition: "slide", reverse: true});
                    break;
                case "left":
                    $.mobile.changePage("#frame_mes0", {transition: "slide", reverse: false});
                    break;
            }
        },
        fingers: 'all',
        allowPageScroll:"vertical"
    });
    $("#frame_mes2").swipe({
        swipe: function(event, direction, distance, duration, fingerCount) {
            switch (direction)
            {
                case "left":
                    $.mobile.changePage("#frame_mes1", {transition: "slide", reverse: false});
                    break;
            }
        },
        fingers: 'all',
        allowPageScroll:"vertical"
    });
});    