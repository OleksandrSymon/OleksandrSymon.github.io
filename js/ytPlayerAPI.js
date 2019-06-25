var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    height: '390',
    width: '640',
    videoId: '8e9LipGYpcs'
  });
}

window.addEventListener("resize", function() {
  resizePlayer();
});

document.addEventListener("resize-ytPlayer", function() {
  resizePlayer();
});

document.addEventListener("pauseYtplayer", function() {
  player.pauseVideo();
})

function resizePlayer() {
  var playerWidth = document.querySelector(".lb-items-wrapper").clientWidth;

  if (window.innerWidth >= 961) playerWidth *= .9;

  document.querySelector("#ytplayer").style.width = playerWidth + "px";
  document.querySelector("#ytplayer").style.height = playerWidth * .56 + "px";
}
