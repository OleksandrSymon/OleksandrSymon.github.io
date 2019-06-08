window.addEventListener("resize", function() {
  resizePlayer();
});

document.addEventListener("resize-ytPlayer", function() {
  resizePlayer();
});


function resizePlayer() {
  var playerWidth = document.querySelector(".lb-items-wrapper").clientWidth;

  if (window.innerWidth >= 961) playerWidth *= .9;

  document.querySelector("#ytplayer").style.width = playerWidth + "px";
  document.querySelector("#ytplayer").style.height = playerWidth * .56 + "px";
}
