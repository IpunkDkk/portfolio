// CV Generator - PDF Format
function generateCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = portfolioData;

    // Set font untuk ATS compatibility
    doc.setFont("times");

    // Margin settings
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - (margin * 2);

    let yPosition = margin;
    const lineHeight = 6;
    const sectionGap = 10;

    // Helper function untuk text wrap
    function wrapText(text, fontSize = 10) {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        return lines;
    }

    // Helper function untuk menambah section - ATS friendly
    function addSection(title, content, fontSize = 10) {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = margin;
        }

        // Section title - ATS friendly (bold, all caps)
        doc.setFontSize(14);
        doc.setFont("times", "bold");
        doc.text(title.toUpperCase(), margin, yPosition);
        yPosition += 4;

        // Add separator line
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 8;

        // Section content
        doc.setFontSize(fontSize);
        doc.setFont("times", "normal");

        if (Array.isArray(content)) {
            content.forEach(line => {
                if (yPosition > pageHeight - 20) {
                    doc.addPage();
                    yPosition = margin;
                }
                const wrapped = wrapText(line, fontSize);
                wrapped.forEach(wrappedLine => {
                    if (yPosition > pageHeight - 20) {
                        doc.addPage();
                        yPosition = margin;
                    }
                    doc.text(wrappedLine, margin, yPosition);
                    yPosition += lineHeight;
                });
                yPosition += 2;
            });
        } else {
            const wrapped = wrapText(content, fontSize);
            wrapped.forEach(line => {
                if (yPosition > pageHeight - 20) {
                    doc.addPage();
                    yPosition = margin;
                }
                doc.text(line, margin, yPosition);
                yPosition += lineHeight;
            });
        }

        yPosition += sectionGap;
    }

    // Header Section - ATS friendly
    doc.setFontSize(20);
    doc.setFont("times", "bold");
    doc.text(data.profile.nama.toUpperCase(), margin, yPosition);
    yPosition += 10;

    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text(data.profile.jabatan, margin, yPosition);
    yPosition += 8;

    // Contact info - ATS friendly format
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    const contactLine = `${data.profile.lokasi} | ${data.profile.kontak.email} | ${data.profile.kontak.phone} | ${data.profile.kontak.linkedin}`;
    doc.text(contactLine, margin, yPosition);
    yPosition += sectionGap + 5;

    // Profil Section
    addSection("PROFIL", data.profile.summary);

    // Pengalaman Kerja Section
    addSection("PENGALAMAN KERJA", "");
    yPosition -= sectionGap;

    data.pengalaman.forEach(exp => {
        if (yPosition > pageHeight - 60) {
            doc.addPage();
            yPosition = margin;
        }

        // Position (sub-header)
        doc.setFontSize(11);
        doc.setFont("times", "bold");
        doc.text(exp.posisi.toUpperCase(), margin, yPosition);
        yPosition += 5;

        doc.setFontSize(10);
        doc.setFont("times", "normal");
        doc.text(exp.perusahaan, margin, yPosition);
        yPosition += 5;

        // Meta info
        const metaText = `${exp.periode} | ${exp.durasi} | ${exp.tipe} | ${exp.mode_kerja}`;
        const wrappedMeta = wrapText(metaText, 9);
        wrappedMeta.forEach(line => {
            doc.text(line, margin, yPosition);
            yPosition += 5;
        });

        // Tanggung jawab
        yPosition += 3;
        exp.tanggung_jawab.forEach(responsibility => {
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
            }
            const wrapped = wrapText("• " + responsibility, 9);
            wrapped.forEach(line => {
                if (yPosition > pageHeight - 20) {
                    doc.addPage();
                    yPosition = margin;
                }
                doc.text(line, margin, yPosition);
                yPosition += 5;
            });
        });

        // Skills
        yPosition += 3;
        const skillsText = "Skills: " + exp.skills.join(", ");
        const wrappedSkills = wrapText(skillsText, 9);
        wrappedSkills.forEach(line => {
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
            }
            doc.text(line, margin, yPosition);
            yPosition += 5;
        });

        // Deskripsi
        if (exp.deskripsi) {
            yPosition += 3;
            const wrappedDesc = wrapText(exp.deskripsi, 9);
            wrappedDesc.forEach(line => {
                if (yPosition > pageHeight - 20) {
                    doc.addPage();
                    yPosition = margin;
                }
                doc.text(line, margin, yPosition);
                yPosition += 5;
            });
        }

        yPosition += 8;
    });

    // Pendidikan Section
    addSection("PENDIDIKAN", "");
    yPosition -= sectionGap;

    data.pendidikan.forEach(edu => {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = margin;
        }

        // Education item (sub-header)
        doc.setFontSize(11);
        doc.setFont("times", "bold");
        doc.text(edu.jenjang.toUpperCase() + " - " + edu.jurusan, margin, yPosition);
        yPosition += 5;

        doc.setFontSize(10);
        doc.setFont("times", "normal");
        doc.text(edu.universitas, margin, yPosition);
        yPosition += 6;
        doc.text(edu.periode, margin, yPosition);
        yPosition += 8;
    });

    // Skills Section
    addSection("KEAHLIAN", "");
    yPosition -= sectionGap;

    Object.values(data.keahlian.categories).forEach(category => {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = margin;
        }

        // Skill category (sub-header)
        doc.setFontSize(11);
        doc.setFont("times", "normal");
        doc.text(category.title + ":", margin, yPosition);
        yPosition += 5;

        doc.setFontSize(9);
        doc.setFont("times", "normal");
        category.skills.forEach(skill => {
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
            }
            doc.text("• " + skill.title, margin + 5, yPosition);
            yPosition += 5;
        });
        yPosition += 5;
    });

    // Sertifikasi Section (max 10)
    addSection("SERTIFIKASI", "");
    yPosition -= sectionGap;

    data.keahlian.sertifikasi.slice(0, 10).forEach(cert => {
        if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
        }

        doc.setFontSize(10);
        doc.setFont("times", "bold");
        doc.text(cert.title, margin, yPosition);
        yPosition += 5;

        doc.setFontSize(9);
        doc.setFont("times", "italic");
        doc.text(cert.issuer + " | " + cert.issued, margin, yPosition);
        yPosition += 7;
    });

  
    // Save PDF
    const cleanName = data.profile.nama.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '_');
    doc.save(`CV_${cleanName}_${new Date().toISOString().split('T')[0]}.pdf`);
}