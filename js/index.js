var lbAPI,
    ajaxSuccess = false,
    lbFirstOpen = false;

var iframe, player; // variables for controling vimeo player


setupLightbox();

document.addEventListener("ajax-success", function(event) {
    ajaxSuccess = true;

    if (window.location.pathname.split('/').pop() === 'index.html') {
       document.querySelector(".lightbox").style.display = "none";
    }
});

// vimeo player settings
iframe = document.getElementById("vimeoPlayer");
player = new Vimeo.Player(iframe);

document.addEventListener("lb-changedstate", function(event) {
  if (event.detail.lbOpened === true && event.detail.curIndex != 0)
    player.pause();

  if (event.detail.lbOpened === false && event.detail.curIndex === 0)
    player.pause();
});


function setupLightbox() {
  lbAPI = lightboxAPI();

  window.lbAPI.addKeyboardNav();

  if(window.innerWidth < 961) {
    window.lbAPI.setupHammerManager(document.querySelector('.lb-items-wrapper'));
  }
}

function openSlide(slideIndex) {
  if (ajaxSuccess) {
    document.querySelector(".lightbox").style.display = "";
    setupLightbox();
    ajaxSuccess = false;
    lbFirstOpen = false;
  }

  if (lbFirstOpen === false) {
    document.dispatchEvent(new CustomEvent("resize-ytPlayer"));
    lbFirstOpen = true;
  }

  if (window.innerWidth < 961) {
    window.open("portfolio.html");
    window.slideIndex = slideIndex;
  } else {
    lbAPI.openSlide(slideIndex);
    $("html, body").animate({ scrollTop: 0 });
  }
}
