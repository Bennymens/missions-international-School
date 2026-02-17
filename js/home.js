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

  /* ============================
       GENERIC FLOATING FLYOUT SETUP
       Handles schools, staff, and student floating submenus
       ============================ */
  let flyoutTimeout = null;

  // Ensure floating flyout containers exist on every page (some pages only had them in index.html)
  function createFlyoutsIfMissing() {
    const flyouts = [
      {
        id: "schools-flyout",
        html: `<ul>
                <li><a href="infant.html">Infant</a></li>
                <li><a href="junior.html">Junior</a></li>
                <li><a href="lower-secondary.html">Lower Secondary</a></li>
                <li><a href="upper-secondary.html">Upper Secondary</a></li>
              </ul>`,
      },
      {
        id: "staff-flyout",
        html: `<ul>
                <li><a href="staff-professional-development.html">Professional Development</a></li>
                <li><a href="staff-teaching-learning.html">Teaching & Learning</a></li>
                <li><a href="staff-wellbeing.html">Wellbeing</a></li>
              </ul>`,
      },
      {
        id: "student-flyout",
        html: `<ul>
                <li><a href="student-life.html">Student Life</a></li>
                <li><a href="activities.html">Activities</a></li>
                <li><a href="physical-education.html">Physical Education & Sports</a></li>
                <li><a href="facilities.html">Facilities</a></li>
                <li><a href="calendar.html">Calendar</a></li>
                <li><a href="news-and-events.html">News & Updates</a></li>
                <li><a href="health-and-wellness.html">Health & Wellness</a></li>
                <li><a href="security-at-mis.html">Security at MIS</a></li>
                <li><a href="school-song.html">School Song</a></li>
                <li><a href="guidance-and-counselling.html">Guidance & Counselling</a></li>
              </ul>`,
      },
    ];

    flyouts.forEach((f) => {
      if (!document.getElementById(f.id)) {
        const div = document.createElement("div");
        div.id = f.id;
        div.className = "schools-flyout";
        div.setAttribute("aria-hidden", "true");
        div.style.display = "none";
        div.innerHTML = f.html;
        document.body.appendChild(div);
      }
    });
  }

  createFlyoutsIfMissing();

  function setupFlyout(anchorSelectorOrElement, flyoutId) {
    const anchor =
      typeof anchorSelectorOrElement === "string"
        ? document.querySelector(anchorSelectorOrElement)
        : anchorSelectorOrElement;
    const flyout = document.getElementById(flyoutId);
    if (!anchor || !flyout) return;

    // find the parent top-level dropdown li (so we can keep it open)
    const parentUl = anchor.closest("ul");
    const parentTopLi = parentUl ? parentUl.closest(".has-dropdown") : null;

    function show() {
      if (window.innerWidth < 768) return; // disable on mobile
      // hide any other visible flyouts first
      document.querySelectorAll(".flyout, .schools-flyout").forEach((f) => {
        if (f !== flyout) {
          f.style.display = "none";
          f.setAttribute("aria-hidden", "true");
        }
      });

      // remove .open from other top-level menus except this flyout's parent
      document.querySelectorAll(".has-dropdown.open").forEach((li) => {
        if (li !== parentTopLi) li.classList.remove("open");
      });

      const rect = anchor.getBoundingClientRect();
      const left = rect.right + window.scrollX + 8;
      const top = rect.top + window.scrollY;
      flyout.style.left = `${left}px`;
      flyout.style.top = `${top}px`;
      flyout.style.display = "block";
      flyout.setAttribute("aria-hidden", "false");
      if (parentTopLi) parentTopLi.classList.add("open");
    }

    function hide() {
      flyout.style.display = "none";
      flyout.setAttribute("aria-hidden", "true");
      if (parentTopLi) parentTopLi.classList.remove("open");
    }

    anchor.addEventListener("mouseenter", () => {
      clearTimeout(flyoutTimeout);
      show();
    });
    anchor.addEventListener("mouseleave", () => {
      clearTimeout(flyoutTimeout);
      flyoutTimeout = setTimeout(() => {
        if (!flyout.matches(":hover")) hide();
      }, 150);
    });

    flyout.addEventListener("mouseenter", () => clearTimeout(flyoutTimeout));
    flyout.addEventListener("mouseleave", () => {
      flyoutTimeout = setTimeout(hide, 150);
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      // use DOM contains() instead of closest with element (closest expects a selector)
      if (!anchor.contains(e.target) && !flyout.contains(e.target)) {
        hide();
      }
    });

    // Hide on resize
    window.addEventListener("resize", hide);
  }

  // Setup flyouts
  setupFlyout(".has-dropdown-submenu > a", "schools-flyout");

  // Locate the specific "The MIS Experience" top-level menu reliably
  const experienceLi = Array.from(
    document.querySelectorAll(".has-dropdown"),
  ).find((li) => {
    const a = li.querySelector(":scope > a.nav-item");
    return (
      a &&
      a.textContent &&
      a.textContent.toLowerCase().includes("mis experience")
    );
  });

  if (experienceLi) {
    const submenuAnchors = experienceLi.querySelectorAll(
      ".has-dropdown-submenu > a",
    );
    if (submenuAnchors[0]) setupFlyout(submenuAnchors[0], "staff-flyout");
    if (submenuAnchors[1]) setupFlyout(submenuAnchors[1], "student-flyout");
  }

  /* ============================
       MOBILE DROPDOWN INTERACTION
       Injects + toggle buttons and handles clicks
       ============================ */
  function setupMobileDropdowns() {
    const dropdownItems = document.querySelectorAll(
      ".has-dropdown, .has-dropdown-submenu",
    );

    dropdownItems.forEach((item) => {
      // Avoid duplicate injection
      if (item.querySelector(".mobile-toggle")) return;

      const toggle = document.createElement("button");
      toggle.className = "mobile-toggle";
      toggle.setAttribute("aria-label", "Toggle Dropdown");
      toggle.setAttribute("type", "button");

      // Insert the toggle after the main link
      const link = item.querySelector(":scope > a");
      if (link) {
        link.after(toggle);
      }

      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          item.classList.toggle("is-open");
        }
      });
    });
  }

  setupMobileDropdowns();
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      document.querySelectorAll(".is-open").forEach((el) => {
        el.classList.remove("is-open");
      });
    }
  });
});
