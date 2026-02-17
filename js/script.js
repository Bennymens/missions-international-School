// Combine all JS code from home.js, academics.js, admissions.js here
// Add your interactive scripts below

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Functionality
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Accordion functionality for FAQ Section
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const item = question.parentElement;

      // Optional: Close other items
      const activeItem = document.querySelector(".faq-item.active");
      if (activeItem && activeItem !== item) {
        activeItem.classList.remove("active");
      }

      item.classList.toggle("active");
    });
  });

  // Scholarship Modal Functionality
  const scholarshipCards = document.querySelectorAll(".scholarship-card");
  const modalCloseButtons = document.querySelectorAll(".modal-close");

  scholarshipCards.forEach((card) => {
    card.addEventListener("click", function () {
      const scholarshipType = this.getAttribute("data-scholarship");
      const modalId = `${scholarshipType}-modal`;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("active");
      }
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".scholarship-modal").classList.remove("active");
    });
  });

  // Close modal when clicking outside content
  document.querySelectorAll(".scholarship-modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
      }
    });
  });

  // News Slideshow Functionality
  initNewsSlideshow();
});

// News Slideshow Variables and Functions
let currentSlide = 0;
const slides = document.querySelectorAll(".news-slide");
const dots = document.querySelectorAll(".dot");

function initNewsSlideshow() {
  if (slides.length === 0) return;

  // Auto-advance slides every 5 seconds
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function changeSlide(direction) {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide += direction;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function goToSlide(index) {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");

  currentSlide = index;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}
