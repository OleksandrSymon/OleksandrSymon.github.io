window.setHeaderMarginHeight();
window.addEventListener("resize", function() {
  window.setHeaderMarginHeight();
});

function setHeaderMarginHeight() {
  document.querySelector('.header-margin').style.height = document.querySelector('header').clientHeight + "px";
}
