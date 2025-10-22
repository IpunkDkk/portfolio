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

  // Update name tag
  document.getElementById("tag-name").textContent =
    portfolioData.profile.nama;
  document.getElementById("tag-title").textContent =
    portfolioData.profile.jabatan;

  // Update lanyard configuration
  updateLanyardConfiguration();

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
    setupExperienceModal();
  }, 100);
}

// Fallback content if JSON fails to load
function updateWithFallbackContent() {
  console.log("Using fallback content");
  // You can add default content here if needed
}

// Update lanyard configuration from JSON data
function updateLanyardConfiguration() {
  const lanyard = portfolioData.profile.lanyard;
  if (!lanyard) return;

  // Update lanyard content
  const tagTitle = document.getElementById('lanyard-title');
  const tagIcon = document.querySelector('.tag-header i');
  const tagId = document.getElementById('lanyard-id');
  const tagValid = document.getElementById('lanyard-valid');

  if (tagTitle) tagTitle.textContent = lanyard.judul;
  if (tagIcon && lanyard.icon) {
    tagIcon.className = lanyard.icon;
  }
  if (tagId) tagId.textContent = `ID: ${lanyard.id}`;
  if (tagValid) tagValid.textContent = `Valid: ${lanyard.valid}`;

  // Update lanyard CSS
  const lanyardElement = document.querySelector('.lanyard');
  if (lanyardElement) {
    lanyardElement.style.width = `${lanyard.lebar}px`;
    lanyardElement.style.height = `${lanyard.panjang}px`;
    lanyardElement.style.top = `-${lanyard.panjang}px`;
    lanyardElement.style.background = `linear-gradient(180deg, ${lanyard.warna}, ${adjustBrightness(lanyard.warna, -20)})`;
  }
}

// Helper function to adjust color brightness
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Update footer year dynamically
function updateFooterYear() {
  const footerText = document.querySelector('.footer p');
  if (footerText) {
    const currentYear = new Date().getFullYear();
    const originalText = footerText.textContent;
    const updatedText = originalText.replace('2024', currentYear);
    footerText.textContent = updatedText;
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadPortfolioData();
  updateFooterYear();
});