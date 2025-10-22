// Load portfolio data from JSON
let portfolioData = {};

// Load JSON data
async function loadPortfolioData() {
  try {
    const response = await fetch("assets/data/portfolio-data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    portfolioData = await response.json();
    updatePortfolioContent();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    // Fallback to default content if JSON fails to load
    updateWithFallbackContent();
  }
}

// Update portfolio content with JSON data
function updatePortfolioContent() {
  // Update page title
  document.getElementById("site-title").textContent =
    portfolioData.settings.site_title;

  // Update hero section
  document.getElementById("hero-title").textContent =
    portfolioData.settings.hero_title;
  document.getElementById("hero-subtitle").textContent =
    portfolioData.settings.hero_subtitle;
  document.getElementById("hero-description").textContent =
    portfolioData.profile.lokasi;
  document.getElementById("profile-jabatan").textContent =
    portfolioData.profile.jabatan;

  // Update section titles
  document.getElementById("about-title").textContent =
    portfolioData.settings.about_title;
  document.getElementById("skills-title").textContent =
    portfolioData.settings.skills_title;
  document.getElementById("certifications-title").textContent =
    portfolioData.settings.certifications_title;
  document.getElementById("experience-title").textContent =
    portfolioData.settings.experience_title;
  document.getElementById("education-title").textContent =
    portfolioData.settings.education_title;
  document.getElementById("contact-title").textContent =
    portfolioData.settings.contact_title;

  // Update sections
  updateAboutSection();
  updateSkillsSection();
  updateCertificationsSection();
  updateExperienceSection();
  updateEducationSection();
  updateContactSection();

  // Setup observers and interactions after content is loaded
  setTimeout(() => {
    setupTimelineObserver();
    setupRevealObserver();
    setupStatsObserver();
    setupSkillCardHover();
  }, 100);
}

// Fallback content if JSON fails to load
function updateWithFallbackContent() {
  console.log("Using fallback content");
  // You can add default content here if needed
}

// Initialize portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadPortfolioData();
});