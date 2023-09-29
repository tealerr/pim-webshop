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
  slideshowTimer = setInterval(showSlides, 3000); // เปลี่ยนรูปทุก 3 วินาที (แก้ไขตามต้องการ)
}

function stopSlideshow() {
  clearInterval(slideshowTimer);
}

// Add click event listeners to dots
let dots = document.getElementsByClassName("dot");
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    slideIndex = i; // กำหนด slideIndex เพื่อให้ตรงกับรูปที่ถูกคลิก
    showSlides();
    stopSlideshow();
  });
}

// Start the slideshow
startSlideshow();

// Pause the slideshow when the mouse enters
document
  .querySelector(".slideshow-container")
  .addEventListener("mouseenter", function () {
    stopSlideshow();
  });

// Resume the slideshow when the mouse leaves
document
  .querySelector(".slideshow-container")
  .addEventListener("mouseleave", function () {
    startSlideshow();
  });
