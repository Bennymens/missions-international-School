document.addEventListener("DOMContentLoaded", () => {
  /* ============================
       STATS COUNTER ANIMATION
       ============================ */
  const stats = document.querySelectorAll(".stat-number");

  // Observer options
  const options = {
    threshold: 0.1, // Trigger as soon as 10% is visible
    rootMargin: "0px",
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = entry.target;
      const targetNumber = parseInt(target.getAttribute("data-target"));

      // Animation settings
      const duration = 2000; // 2 seconds for the count
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const easeOutQuad = (t) => t * (2 - t); // Smooth ease-out

      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(targetNumber * progress);

        if (parseInt(target.innerText) !== currentCount) {
          target.innerText = currentCount;
        }

        if (frame === totalFrames) {
          clearInterval(counter);
          target.innerText = targetNumber; // Ensure exact end value
        }
      }, frameDuration);

      observer.unobserve(target);
    });
  }, options);

  stats.forEach((stat) => {
    const value = stat.innerText;
    // Only animate if it's a number
    if (!isNaN(parseInt(value))) {
      stat.setAttribute("data-target", value);
      stat.innerText = "0";
      statsObserver.observe(stat);
    }
  });

  /* ============================
       MOBILE MENU TOGGLE
       ============================ */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".main-nav");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  /* ============================
       NEWS SLIDESHOW
       ============================ */
  const slides = document.querySelectorAll(".news-slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  if (slides.length > 0) {
    // Auto-advance slides every 5 seconds
    setInterval(() => {
      changeSlide(1);
    }, 5000);
  }

  // Make functions globally accessible for onclick handlers
  window.changeSlide = function (direction) {
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
  };

  window.goToSlide = function (index) {
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  };

  /* ============================
       DYNAMIC NAVBAR ON SCROLL
       ============================ */
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
