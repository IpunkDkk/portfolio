// Update about section
function updateAboutSection() {
  const summary = portfolioData.profile.summary;
  const words = summary.split(" ");
  const midPoint = Math.floor(words.length / 2);

  document.getElementById("about-summary-1").textContent =
    words.slice(0, midPoint).join(" ") + " ";
  document.getElementById("about-summary-2").textContent = words
    .slice(midPoint)
    .join(" ");

  // Update stats
  const statsContainer = document.getElementById("about-stats");
  statsContainer.innerHTML = "";

  portfolioData.stats.forEach((stat) => {
    const statItem = document.createElement("div");
    statItem.className = "stat-item";
    statItem.innerHTML = `
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
    statsContainer.appendChild(statItem);
  });
}

// Update skills section
function updateSkillsSection() {
  // Update skill headers
  const skillsHeadersContainer = document.getElementById("skills-headers");
  skillsHeadersContainer.innerHTML = "";

  // Get categories dynamically from JSON
  const categories = portfolioData.keahlian.categories;
  const categoryKeys = Object.keys(categories);
  const maxSkillsDisplay = 4;

  // Show first 4 skill categories
  categoryKeys.slice(0, maxSkillsDisplay).forEach((categoryKey) => {
    const category = categories[categoryKey];

    const headerCard = document.createElement("div");
    headerCard.className = "skill-header-card";
    headerCard.setAttribute("data-category", categoryKey);
    headerCard.innerHTML = `
            <i class="${category.icon}"></i>
            <h3>${category.title}</h3>
            <p>${category.description}</p>
            <span class="skill-count">${category.skills.length} Skills</span>
        `;

    headerCard.addEventListener("click", () =>
      openSkillsModal(category.title, category.skills)
    );
    skillsHeadersContainer.appendChild(headerCard);
  });

  // Add show more button if there are more than 4 categories
  if (categoryKeys.length > maxSkillsDisplay) {
    let showingAll = false;

    // Create show more button
    const showMoreBtn = document.createElement("button");
    showMoreBtn.className = "show-more-btn";
    showMoreBtn.textContent = `Show More (${
      categoryKeys.length - maxSkillsDisplay
    } More)`;
    showMoreBtn.onclick = () => {
      if (showingAll) {
        // Show only first 4
        skillsHeadersContainer.innerHTML = "";
        categoryKeys.slice(0, maxSkillsDisplay).forEach((categoryKey) => {
          const category = categories[categoryKey];
          const headerCard = document.createElement("div");
          headerCard.className = "skill-header-card";
          headerCard.setAttribute("data-category", categoryKey);
          headerCard.innerHTML = `
                    <i class="${category.icon}"></i>
                    <h3>${category.title}</h3>
                    <p>${category.description}</p>
                    <span class="skill-count">${category.skills.length} Skills</span>
                `;

          headerCard.addEventListener("click", () =>
            openSkillsModal(category.title, category.skills)
          );
          skillsHeadersContainer.appendChild(headerCard);
        });
        showMoreBtn.textContent = `Show More (${
          categoryKeys.length - maxSkillsDisplay
        } More)`;
        showingAll = false;
      } else {
        // Show all categories
        skillsHeadersContainer.innerHTML = "";
        categoryKeys.forEach((categoryKey) => {
          const category = categories[categoryKey];
          const headerCard = document.createElement("div");
          headerCard.className = "skill-header-card";
          headerCard.setAttribute("data-category", categoryKey);
          headerCard.innerHTML = `
                    <i class="${category.icon}"></i>
                    <h3>${category.title}</h3>
                    <p>${category.description}</p>
                    <span class="skill-count">${category.skills.length} Skills</span>
                `;

          headerCard.addEventListener("click", () =>
            openSkillsModal(category.title, category.skills)
          );
          skillsHeadersContainer.appendChild(headerCard);
        });
        showMoreBtn.textContent = "Show Less";
        showingAll = true;
      }
    };

    // Add show more button after the skills-headers
    skillsHeadersContainer.insertAdjacentElement("afterend", showMoreBtn);
  }

  // Setup modal functionality
  setupModal();
}

// Update certifications section (separate function)
function updateCertificationsSection() {
  const certContainer = document.getElementById("cert-grid");
  certContainer.innerHTML = "";

  const certifications = portfolioData.keahlian.sertifikasi;
  const maxCertsDisplay = 6;

  // Show first 6 certifications
  certifications.slice(0, maxCertsDisplay).forEach((cert) => {
    const certItem = document.createElement("div");
    certItem.className = "cert-item";
    certItem.innerHTML = `
            <i class="${cert.icon}"></i>
            <h3>${cert.title}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            <p class="cert-date">${cert.issued}</p>
        `;
    certContainer.appendChild(certItem);
  });

  // Add show more button if there are more than 6 certifications
  if (certifications.length > maxCertsDisplay) {
    let showingAll = false;

    // Create show more button
    const showMoreBtn = document.createElement("button");
    showMoreBtn.className = "show-more-btn";
    showMoreBtn.textContent = `Show More (${
      certifications.length - maxCertsDisplay
    } More)`;
    showMoreBtn.onclick = () => {
      if (showingAll) {
        // Show only first 6
        certContainer.innerHTML = "";
        certifications.slice(0, maxCertsDisplay).forEach((cert) => {
          const certItem = document.createElement("div");
          certItem.className = "cert-item";
          certItem.innerHTML = `
                    <i class="${cert.icon}"></i>
                    <h3>${cert.title}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date">${cert.issued}</p>
                `;
          certContainer.appendChild(certItem);
        });
        showMoreBtn.textContent = `Show More (${
          certifications.length - maxCertsDisplay
        } More)`;
        showingAll = false;
      } else {
        // Show all certifications
        certContainer.innerHTML = "";
        certifications.forEach((cert) => {
          const certItem = document.createElement("div");
          certItem.className = "cert-item";
          certItem.innerHTML = `
                    <i class="${cert.icon}"></i>
                    <h3>${cert.title}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date">${cert.issued}</p>
                `;
          certContainer.appendChild(certItem);
        });
        showMoreBtn.textContent = "Show Less";
        showingAll = true;
      }

      // Re-attach animations after content change
      setTimeout(() => {
        setupRevealObserver();
        setupSkillCardHover();
      }, 100);
    };

    // Add show more button after the cert-grid
    certContainer.insertAdjacentElement("afterend", showMoreBtn);
  }
}

// Update experience section
function updateExperienceSection() {
  const timelineContainer = document.getElementById("timeline");
  timelineContainer.innerHTML = "";

  portfolioData.pengalaman.forEach((exp, index) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";
    timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.posisi}</h3>
                <h4>${exp.perusahaan}</h4>
                <div class="timeline-meta">
                    <div class="timeline-type">${exp.tipe}</div>
                    <div class="timeline-mode">${exp.mode_kerja}</div>
                </div>
                <div class="timeline-info">
                    <div class="timeline-date">
                        <i class="fas fa-calendar"></i>
                        ${exp.periode}
                    </div>
                    <div class="timeline-duration">
                        <i class="fas fa-clock"></i>
                        ${exp.durasi}
                    </div>
                    <div class="timeline-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${exp.lokasi}
                    </div>
                </div>
                <p>${exp.deskripsi}</p>
            </div>
        `;

    // Add click event to open modal
    timelineItem
      .querySelector(".timeline-content")
      .addEventListener("click", () => openExperienceModal(exp));

    timelineContainer.appendChild(timelineItem);
  });
}

// Update education section
function updateEducationSection() {
  const educationContainer = document.getElementById("education-grid");
  educationContainer.innerHTML = "";

  portfolioData.pendidikan.forEach((edu) => {
    const educationCard = document.createElement("div");
    educationCard.className = "education-card";
    educationCard.innerHTML = `
            <div class="edu-icon">
                <i class="${edu.icon}"></i>
            </div>
            <div class="edu-content">
                <h3>${edu.universitas}</h3>
                <h4>${edu.jenjang}</h4>
                <p>${edu.jurusan}</p>
                <span class="edu-year">${edu.periode}</span>
            </div>
        `;
    educationContainer.appendChild(educationCard);
  });
}

// Update contact section
function updateContactSection() {
  const contactContainer = document.getElementById("contact-info");
  contactContainer.innerHTML = "";

  // Create contact info array from profile data with functional links
  const kontakArray = [
    {
      icon: "fas fa-phone",
      info: portfolioData.profile.kontak.phone,
      link: `tel:${portfolioData.profile.kontak.phone.replace(/\s/g, '')}`,
      type: "phone"
    },
    {
      icon: "fas fa-envelope",
      info: portfolioData.profile.kontak.email,
      link: `mailto:${portfolioData.profile.kontak.email}`,
      type: "email"
    },
    {
      icon: "fab fa-linkedin",
      info: "LinkedIn Profile",
      link: portfolioData.profile.kontak.linkedin,
      type: "link"
    }
  ];

  kontakArray.forEach((contact) => {
    const contactItem = document.createElement("div");
    contactItem.className = "contact-item";

    if (contact.type === "phone") {
      contactItem.innerHTML = `
              <i class="${contact.icon}"></i>
              <a href="${contact.link}" title="Call ${contact.info}">${contact.info}</a>
          `;
    } else if (contact.type === "email") {
      contactItem.innerHTML = `
              <i class="${contact.icon}"></i>
              <a href="${contact.link}" title="Email ${contact.info}">${contact.info}</a>
          `;
    } else if (contact.type === "link") {
      contactItem.innerHTML = `
              <i class="${contact.icon}"></i>
              <a href="${contact.link}" target="_blank" rel="noopener noreferrer" title="Open LinkedIn profile">LinkedIn Profile</a>
          `;
    }

    contactContainer.appendChild(contactItem);
  });
}