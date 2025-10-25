// Skills modal functionality
function setupModal() {
  const modal = document.getElementById("skills-modal");
  const closeBtn = document.querySelector(".close-modal");

  // Close modal when clicking the X button
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function openSkillsModal(categoryTitle, skills) {
  const modal = document.getElementById("skills-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalSkillsGrid = document.getElementById("modal-skills-grid");

  // Set modal title
  modalTitle.textContent = categoryTitle;

  // Clear and populate skills
  modalSkillsGrid.innerHTML = "";

  skills.forEach((skill) => {
    const skillCard = document.createElement("div");
    skillCard.className = "skill-card";
    skillCard.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.title}</h3>
            <p>${skill.description}</p>
        `;
    modalSkillsGrid.appendChild(skillCard);
  });

  // Show modal
  modal.style.display = "block";

  // Prevent body scroll
  document.body.style.overflow = "hidden";

  // Setup hover effects for modal skills
  setupSkillCardHover();
}

function closeModal() {
  const modal = document.getElementById("skills-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Experience modal functionality
function setupExperienceModal() {
  const modal = document.getElementById("experience-modal");
  const closeBtn = modal.querySelector(".close-modal");

  // Close modal when clicking the X button
  closeBtn.addEventListener("click", closeExperienceModal);

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeExperienceModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeExperienceModal();
    }
  });
}

function openExperienceModal(exp) {
  const modal = document.getElementById("experience-modal");

  // Update modal title
  document.getElementById("experience-modal-title").textContent =
    exp.posisi + " - " + exp.perusahaan;

  // Update modal content
  const modalContent = document.getElementById("experience-detail");
  modalContent.innerHTML = `
        <div class="experience-header">
            <div class="experience-position">
                <h2>${exp.posisi}</h2>
                <h3>${exp.perusahaan}</h3>
            </div>
            <div class="experience-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <div>
                        <label>Periode</label>
                        <span>${exp.periode}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <label>Durasi</label>
                        <span>${exp.durasi}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-briefcase"></i>
                    <div>
                        <label>Tipe</label>
                        <span>${exp.tipe}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-home"></i>
                    <div>
                        <label>Mode Kerja</label>
                        <span>${exp.mode_kerja}</span>
                    </div>
                </div>
                <div class="meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <label>Lokasi</label>
                        <span>${exp.lokasi}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="experience-responsibilities">
            <h3><i class="fas fa-tasks"></i> Tanggung Jawab</h3>
            <ul>
                ${exp.tanggung_jawab
                  .map((responsibility) => `<li>${responsibility}</li>`)
                  .join("")}
            </ul>
        </div>

        <div class="experience-skills">
            <h3><i class="fas fa-tools"></i> Skills Yang Digunakan</h3>
            <div class="skills-used">
                ${exp.skills
                  .map((skill) => `<span class="skill-tag">${skill}</span>`)
                  .join("")}
            </div>
        </div>

        <div class="experience-description">
            <h3><i class="fas fa-info-circle"></i> Deskripsi Pekerjaan</h3>
            <p>${exp.deskripsi}</p>
        </div>
    `;

  // Show modal
  modal.style.display = "block";

  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function closeExperienceModal() {
  const modal = document.getElementById("experience-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Toggle all certifications (show more/less)
function toggleAllCertifications() {
  const certContainer = document.getElementById("cert-grid");
  const showMoreBtn = document.querySelector(".show-more-btn");
  const certifications = portfolioData.keahlian.sertifikasi;
  const maxCertDisplay = 6;

  if (showMoreBtn.textContent.includes("Show More")) {
    // Show all certifications
    certContainer.innerHTML = "";
    certifications.forEach((cert) => {
      const certItem = document.createElement("div");
      certItem.className = "cert-item";
      certItem.innerHTML = `
                <i class="${cert.icon}"></i>
                <span>${cert.title}</span>
            `;
      certContainer.appendChild(certItem);
    });
    showMoreBtn.textContent = "Show Less";
  } else {
    // Show only first 6 certifications
    certContainer.innerHTML = "";
    certifications.slice(0, maxCertDisplay).forEach((cert) => {
      const certItem = document.createElement("div");
      certItem.className = "cert-item";
      certItem.innerHTML = `
                <i class="${cert.icon}"></i>
                <span>${cert.title}</span>
            `;
      certContainer.appendChild(certItem);
    });
    showMoreBtn.textContent = `Show More (${
      certifications.length - maxCertDisplay
    } More)`;
  }
}