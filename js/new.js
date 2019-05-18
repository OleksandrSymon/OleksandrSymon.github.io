function pageTransitionAPI() {
  function pageTransition(event) {
    event.preventDefault();

    const href = $(this).attr("href");
    window.history.pushState(null, null, href);

    $.ajax({
      url: href,
      success: function(data) {
          $("section").fadeOut(200, function() {
              const newContent = $(data).filter("section").html();


              $("section").html(newContent);
              $("section").fadeIn(200);

              // Create the event
              var event = new CustomEvent("name-of-event", { "detail": "Example of an event" });
              // Dispatch/Trigger/Fire the event
              document.dispatchEvent(event);
            });
        }
    });
  }

  var menuLinks = document.querySelectorAll(".menu a");
  for (var i = 0; i < menuLinks.length-1; i++) {
    menuLinks[i].addEventListener("click", pageTransition, event);
  }
}

pageTransitionAPI();
