function lightboxAPI() {
  /*
   *  'lb' — short for lightbox
   *
   */

  var prevIndex = 0,
      curIndex = 0,
      lbOpened = false,
      slideInDown = false;

  var lbItemsHeights = [],
      maxH = 0;

  var lb = document.querySelector(".lightbox"),
      lbItems = document.querySelectorAll(".lb-item");


  findMaxItemsHeight();

  window.addEventListener("resize", function() {
      if (lbOpened)
        openLightbox();
      else
        lb.style.marginTop = -lb.clientHeight + "px";
  });

  function findMaxItemsHeight() {
    for (var i = 0; i < lbItems.length; i++) {
      lbItems[i].style.display = "block";
      lbItemsHeights.push( lbItems[i].clientHeight );
      lbItems[i].style.display = "none";
    }

    maxH = lbItemsHeights.reduce(function(acc, curVal) {
      return Math.max(acc, curVal);
    });

    document.querySelector(".lb-items-wrapper").style.height = maxH + "px";
    lb.style.marginTop = -lb.clientHeight + "px";
  }

  function updateCurIndex(newIndex) {
    prevIndex = curIndex;

    if (newIndex < 0) {
      curIndex = lbItems.length - 1;
    } else if (newIndex > lbItems.length - 1) {
      curIndex = 0;
    } else curIndex = newIndex;
  }

  function openSlide(index) {
    slideInDown = lbOpened ? false : true;
    updateCurIndex(index);
    openLightbox();
  }

  function nextPrevSlide(n) {
    slideInDown = false;
    updateCurIndex(curIndex + n);
    openLightbox();
  }

  function openLightbox() {
    var curItem = lbItems[curIndex],
        curItemImg = curItem.querySelector("img");

    var lbItemNav = document.querySelector(".lb-item-nav");

    var lbPaddingTp = Number(window.getComputedStyle(lb)["padding-top"].split("px")[0]),
        lbPaddingBtm = Number(window.getComputedStyle(lb)["padding-bottom"].split("px")[0]),
        curHeightsDiff = 0;


    findMaxItemsHeight();

    lbItems[prevIndex].style.display = "none";
    lbItems[curIndex].style.display = "block";

    document.querySelector(".lb-title").innerHTML = "<h3>" + curItemImg.alt + "</h3>";

    curHeightsDiff = lb.clientHeight - (curItem.clientHeight + lbPaddingTp + lbPaddingBtm);

    if (window.innerWidth >= 960) {
      document.querySelector(".lb-items-wrapper").style.height = maxH + "px";

      document.querySelector(".lb-title").style.top = curHeightsDiff + "px";
      document.querySelector(".lb-nav").style.top = curHeightsDiff + "px";

      lbItemNav.style.height = curItemImg.clientHeight + "px";
      lbItemNav.style.width = curItemImg.clientWidth + "px";
      lbItemNav.style.left = curItemImg.offsetLeft + "px";
      lbItemNav.style.top = curHeightsDiff + "px";
    } else {
      document.querySelector(".lb-items-wrapper").style.height = curItem.clientHeight + "px";

      curHeightsDiff = 0;
      slideInDown = false;
    }

    lb.style.transition = slideInDown ? curItem.clientHeight * 0.0008 + "s ease" : "";
    lb.style.marginTop = -curHeightsDiff + "px";

    lbOpened = true;
    document.dispatchEvent(new CustomEvent("lb-changedstate", {detail: {lbOpened: true, curIndex: curIndex}}));
  }

  function hideLightbox() {
    if (window.innerWidth < 961) slideInDown = false;
    else slideInDown = true;

    lb.style.transition = slideInDown ? lbItems[curIndex].clientHeight * 0.0008 + "s ease" : "";
    lb.style.marginTop = -lb.clientHeight + "px";

    lbOpened = false;
    document.dispatchEvent(new CustomEvent("lb-changedstate", {detail: {lbOpened: false, curIndex: curIndex}}));
  }

  function escHandler(event) {
    if (lbOpened && event.keyCode == '27') hideLightbox();
  }

  function removeEscHandler() {
    window.removeEventListener("keyup", escHandler);
  }

  function addKeyboardNav() {
    window.addEventListener("keyup", function(event) {
      if (lbOpened) {
        if (event.keyCode == '39') nextPrevSlide(1);
        if (event.keyCode == '37') nextPrevSlide(-1);
      }
    });

    window.addEventListener("keyup", escHandler);
  }

  function setupHammerManager(element) {
    var myOptions = {
      threshold: element.clientWidth * 0.25,
      direction: Hammer.DIRECTION_HORIZONTAL
    };

    var hammerManager = new Hammer.Manager(element);

    hammerManager.add(new Hammer.Swipe(myOptions));

    hammerManager.on('swipeleft', function(event) {
      if (lbOpened) nextPrevSlide(1);
    });

    hammerManager.on('swiperight', function(event) {
      if (lbOpened) nextPrevSlide(-1);
    });
  }

  var publicAPI = {
    openSlide: openSlide,
    nextPrevSlide: nextPrevSlide,
    addKeyboardNav: addKeyboardNav,
    removeEscHandler: removeEscHandler,
    setupHammerManager: setupHammerManager,
  };

  return publicAPI;
}
