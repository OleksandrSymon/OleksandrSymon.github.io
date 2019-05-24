var lbAPI, ajaxSuccess = false;


setupLightbox();

document.addEventListener("ajax-success", function(e) {
    ajaxSuccess = true;

    if (window.location.pathname.split('/').pop() === 'index.html') {
       document.querySelector(".lightbox").style.display = "none";
    }
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
  }

  if (window.innerWidth < 961) {
    window.open("portfolio.html");
    window.slideIndex = slideIndex;
  } else {
    lbAPI.openSlide(slideIndex);
  }
}
