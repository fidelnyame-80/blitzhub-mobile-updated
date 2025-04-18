// Log to ensure the script is loaded
console.log("JS loaded!");

// Toggle mobile menu
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !offScreenMenu.contains(e.target) &&
    !hamMenu.contains(e.target)
  ) {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
  }
});

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0 ;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initial display
showSlide(currentSlide);

// Auto slide every 4 seconds
setInterval(nextSlide, 4000);

function toggleHamMenuVisibility() {
  const hamMenu = document.querySelector('.ham-menu'); // Use the correct class name
  if (!hamMenu) return;

  if (window.innerWidth >= 1024) { // Adjust width as needed for desktop
    hamMenu.style.display = 'none';
  } else {
    hamMenu.style.display = 'block';
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  toggleHamMenuVisibility();
});

// Run on window resize
window.addEventListener('resize', () => {
  toggleHamMenuVisibility();
});
