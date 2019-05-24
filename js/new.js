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
              var event = new CustomEvent("ajax-success");

              $("section").html(newContent);
              document.dispatchEvent(event);

              $("section").fadeIn(200);
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
