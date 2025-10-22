// Timeline animation on scroll (for dynamic content)
function setupTimelineObserver() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
}

// Add scroll reveal animation (for dynamic content)
function setupRevealObserver() {
  const revealElements = document.querySelectorAll(
    ".skill-card, .education-card, .contact-item, .cert-item, .timeline-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
    revealObserver.observe(element);
  });
}

// Add counter animation for stats (for dynamic content)
let hasCounted = false;

function countUp(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateNumber() {
    start += increment;
    if (start < target) {
      element.textContent =
        Math.floor(start) + (element.textContent.includes("+") ? "+" : "%");
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "%");
    }
  }

  updateNumber();
}

function setupStatsObserver() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          statNumbers.forEach((stat) => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ""));
            countUp(stat, number);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutSection = document.querySelector(".about");
  if (aboutSection) {
    statsObserver.observe(aboutSection);
  }
}

// Add hover effect to skill cards (for dynamic content)
function setupSkillCardHover() {
  const skillCards = document.querySelectorAll(".skill-card, .cert-item");
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero");
  const speed = scrolled * 0.3;

  if (parallax) {
    if (scrolled > 0) {
      parallax.style.transform = `translateY(${speed}px)`;
    } else {
      parallax.style.transform = "translateY(0)";
    }
  }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add smooth reveal for sections on scroll
const sectionsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "all 0.8s ease";
  sectionsObserver.observe(section);
});