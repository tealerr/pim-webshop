let slideIndex = 0;
let slideshowTimer;

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");

  slideIndex++; // เพิ่มค่า slideIndex และวนเป็นลำดับ 1, 2, 3, 1, 2, 3, ...
}

function startSlideshow() {
  showSlides();
  slideshowTimer = setInterval(showSlides, 3000);
}

function stopSlideshow() {
  clearInterval(slideshowTimer);
}

let dots = document.getElementsByClassName("dot");
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    slideIndex = i;
    showSlides();
    stopSlideshow();
  });
}

startSlideshow();

document
  .querySelector(".slideshow-container")
  .addEventListener("mouseenter", function () {
    stopSlideshow();
  });

document
  .querySelector(".slideshow-container")
  .addEventListener("mouseleave", function () {
    startSlideshow();
  });
