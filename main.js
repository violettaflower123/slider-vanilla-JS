$(document).ready(function () {
  // slider
  const slideImage = document.querySelectorAll(".slider__item");
  const slidesContainer = document.querySelector(".slider__box");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const navigationDots = document.querySelector(".slider__dots");

  let numberOfImages = slideImage.length;
  let slideWidth = slideImage[0].clientWidth;
  let currentSlide = 0;

  // set up the slider

  function init() {
    slideImage.forEach((img, i) => {
      img.style.left = i * 100 + "%";
    });

    slideImage[0].classList.add("active");

    createNavigationDots();
  }

  init();

  // create navigation dots
  function createNavigationDots() {
    for (let i = 0; i < numberOfImages; i++) {
      const dot = document.createElement("div");
      dot.classList.add("slider__single-dot");
      navigationDots.appendChild(dot);
    }
    navigationDots.children[0].classList.add("active");
  }

  // go to slide
  function goToSlide(slideNumber) {
    slidesContainer.style.transform =
      "translateX(-" + slideWidth * slideNumber + "px)";
    currentSlide = slideNumber;

    setActiveClass();
  }

  // set active class
  function setActiveClass() {
    //on photo
    let currentActive = document.querySelector(".slider__item.active");
    currentActive.classList.remove("active");
    slideImage[currentSlide].classList.add("active");

    // on navigation dot
    let currentDot = document.querySelector(".slider__single-dot.active");
    currentDot.classList.remove("active");
    navigationDots.children[currentSlide].classList.add("active");
  }

  nextButton.addEventListener("click", () => {
    console.log(slideWidth);
    if (currentSlide >= 8) {
      goToSlide(0);
      return;
    }
    currentSlide++;
    goToSlide(currentSlide);
  });

  prevButton.addEventListener("click", () => {
    if (currentSlide <= 0) {
      goToSlide(numberOfImages - 3);
      return;
    }
    currentSlide--;
    goToSlide(currentSlide);
  });

  slideImage.forEach((item) => {
    item.addEventListener("touchstart", handleTouchStart, false);
    item.addEventListener("touchmove", handleTouchMove, false);
  });

  // свайпы на мобилке
  let x1 = null;

  function handleTouchStart(event) {
    const firstTouch = event.touches[0];

    x1 = firstTouch.clientX;
  }

  function handleTouchMove(event) {
    if (!x1) {
      return false;
    }
    let x2 = event.touches[0].clientX;

    let xDiff = x2 - x1;

    if (xDiff > 0) {
      if (currentSlide <= 0) {
        goToSlide(numberOfImages - 1);
        return;
      }
      currentSlide--;
      goToSlide(currentSlide);
    } else {
      if (currentSlide >= numberOfImages - 1) {
        goToSlide(0);
        return;
      }
      currentSlide++;
      goToSlide(currentSlide);
    }
    x1 = null;
  }
});
