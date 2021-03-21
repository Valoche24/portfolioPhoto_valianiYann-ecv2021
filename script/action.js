//Banner scroll horizontal
//https://codepen.io/dgca/pen/dpGLaK)



(function horizontalScrollingBanner() {
  var banners = document.getElementsByClassName('horizontal-scrolling-banner');
  if (!banners || banners.length === 0) {
    return;
  }
  var pxPerSecond = 80;
  setUpElements();
  scrollTheBanners();
  window.addEventListener('resize', setUpElements);

  function setUpElements() {
    for (var i = 0; i < banners.length; i++) {
      var currentBanner = banners[i];
      var helperWrapperClass = 'horizontal-scrolling-banner__helper-wrapper';
      var currentHelperWrapper = currentBanner.querySelector('.' + helperWrapperClass);
      if (currentHelperWrapper) {
        var clones = currentHelperWrapper.querySelectorAll('[data-clone]');
        Array.prototype.forEach.call(clones, function(clone) {
          clone.remove();
        });
        var childrenCount = currentHelperWrapper.children.length;
        for (var i = 0; i < childrenCount; i++) {
          currentBanner.appendChild(currentHelperWrapper.children[0]);
        }
        currentHelperWrapper.remove();
      }

      var children = currentBanner.children;

      var bannerWidth = currentBanner.getBoundingClientRect().width;
      var minWidthToCoverBanner = (bannerWidth * 13) + children[0].getBoundingClientRect().width;
      var childrenWidth = Array.prototype.reduce.call(children, function(r, child) {
        return r + child.getBoundingClientRect().width;
      }, 0);
      var currentWidth = childrenWidth;


      do {
        Array.prototype.forEach.call(children, function(child) {
          var clone = child.cloneNode();
          clone.setAttribute('aria-hidden', true);
          clone.dataset.clone = true;
          currentBanner.appendChild(clone);
        });
        currentWidth += childrenWidth;
      } while (currentWidth < minWidthToCoverBanner);

      var transitionHelperWrapper = document.createElement('div');
      transitionHelperWrapper.classList.add('horizontal-scrolling-banner__helper-wrapper');
      var childrenCount = children.length;
      for (var i = 0; i < childrenCount; i++) {
        transitionHelperWrapper.appendChild(children[0]);
      }
      currentBanner.appendChild(transitionHelperWrapper);
      transitionHelperWrapper.dataset.childrenWidth = childrenWidth;
    }
  }

  function scrollTheBanners() {
    for (var i = 0; i < banners.length; i++) {
      var helperWrapper = banners[i].firstElementChild;
      var childrenWidth = helperWrapper.dataset.childrenWidth;
      var offsetLeft = helperWrapper.offsetLeft;

      if (offsetLeft <= (childrenWidth * -1)) {
        helperWrapper.style.transitionDuration = '0s';
        helperWrapper.style.left = '0px';
        helperWrapper.style.removeProperty('transition-duration');
      } else if (helperWrapper.style.left === '' || helperWrapper.style.left === '0px') {
        setTimeout(function() {
          helperWrapper.style.transitionDuration = (childrenWidth / pxPerSecond).toFixed() + 's';
          helperWrapper.style.left = (childrenWidth * -1) + 'px';
        }, 0);
      }
    }
    requestAnimationFrame(scrollTheBanners);
  }
})();




//SCROLL BANNER STICK
// Div avec une grosse hauteur puis réduit ça hauteur lorsqu'il est stick

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("bannerScroll").style.height = "50px";
  } else {
    document.getElementById("bannerScroll").style.height = "200px";
  }
}




//MOUSE EFFECT https://www.youtube.com/watch?v=EdJZj1Wy6Dg&t=1359s

const canvasTag = document.querySelector("canvas")

canvasTag.width = window.innerWidth * 2
canvasTag.height = window.innerHeight * 2

canvasTag.style.width = window.innerWidth + "px"
canvasTag.style.height = window.innerHeight + "px"

const context = canvasTag.getContext("2d")
context.scale(2, 2)

let aimX = null
let aimY = null
let currentX = null
let currentY = null



let i = 0
const images = ["css/cursor/100balles.png"].map(src => {
  const image = document.createElement("img")
  image.src = src
  return image
})

document.addEventListener("mousemove", function (event) {
  aimX = event.pageX
  aimY = event.pageY
  if (currentX === null) {
    currentX = event.pageX
    currentY = event.pageY
  }

})



const draw = function () {
  if (currentX) {
    if (images[i].complete) {
      // FIX BUG:
      var decalageVertical = window.scrollY;
    	context.drawImage(images[i], currentX, currentY - decalageVertical, 16, 16)

  	}

    currentX = currentX + (aimX - currentX) * 0.1
    currentY = currentY + (aimY - currentY) * 0.1
  }

  requestAnimationFrame(draw)
}

draw()





//
