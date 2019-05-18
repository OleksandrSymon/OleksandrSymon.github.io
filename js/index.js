var lbAPI = lightboxAPI();

window.lbAPI.addKeyboardNav();

if(window.innerWidth < 961) {
  window.lbAPI.setupHammerManager(document.querySelector('.lb-items-wrapper'));
}


// var fileName = window.location.pathname.split('/').pop();
// if (fileName === 'index.html') {
//
// }
