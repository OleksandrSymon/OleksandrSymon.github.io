var lbAPI, ajaxSuccess = false, lbFirstOpen = false;

setupLightbox();

document.addEventListener("ajax-success", function(event) {
    ajaxSuccess = true;

    if (window.location.pathname.split('/').pop() === 'index.html') {
       document.querySelector(".lightbox").style.display = "none";
    }
});


window.addEventListener("resize", function() {
  resizePlayer();
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
    resizePlayer();
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

function resizePlayer() {
  var playerWidth, playerHeight;

  if (window.innerWidth < 961) {
    playerWidth = document.querySelector(".lb-items-wrapper").clientWidth;
  } else {
    playerWidth = document.querySelector(".lb-items-wrapper").clientWidth * .9;
  }

  playerHeight = playerWidth * .56;

  document.querySelector("#ytplayer").style.width = playerWidth + "px";
  document.querySelector("#ytplayer").style.height = playerHeight + "px";
}
