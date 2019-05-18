var lcAPI = loadContentAPI();

document.querySelectorAll("header a")[1].addEventListener("click", lcAPI.load, event);
window.addEventListener("keyup", lcAPI.hide, event);


function loadContentAPI() {
  var content = document.querySelector(".content"),
      loaded = document.querySelector(".loaded");

  function load(event) {
    if (window.innerWidth < 961) {
      return;
    }

    const href = $(this).attr("href");

    event.preventDefault();

    $.ajax({
      url: href,
      success: function(data) {
        var contentToLoad, contentToLoadH;

        contentToLoad = $(data).filter("section").html();
        $(".loaded").html(contentToLoad);
        contentToLoadH = $(".loaded").innerHeight();

        loaded.style.display = "block";
        content.style.transition = contentToLoadH * .001 + "s ease";
        content.style.marginTop = contentToLoadH + "px";
      }
    });
  }

  function hide(event) {
    if (loaded.style.display != "none") {
      if (event.keyCode == '27') {
        content.style.marginTop = "";

        setTimeout(function() {
          content.style.transition = "";
          loaded.style.display = "none";
        }, 1000);
      }
    }
  }

  var publicAPI = {
    load: load,
    hide: hide
  };

  return publicAPI;
}
