// CV Generator - PDF Format
function generateCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = portfolioData;

    // Set font untuk dukungan karakter Indonesia
    doc.setFont("helvetica");

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

    // Helper function untuk menambah section
    function addSection(title, content, fontSize = 10) {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = margin;
        }

        // Section title
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title, margin, yPosition);
        yPosition += 8;

        // Section content
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", "normal");

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

    // Header Section
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(data.profile.nama.toUpperCase(), margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(data.profile.jabatan, margin, yPosition);
    yPosition += 6;

    doc.setFontSize(10);
    doc.text(data.profile.lokasi, margin, yPosition);
    yPosition += 6;
    doc.text("Email: " + data.profile.kontak.email, margin, yPosition);
    yPosition += 6;
    doc.text("Phone: " + data.profile.kontak.phone, margin, yPosition);
    yPosition += 6;
    doc.text("LinkedIn: " + data.profile.kontak.linkedin, margin, yPosition);
    yPosition += sectionGap + 5;

    // Add separator line
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += sectionGap;

    // Profil Section
    addSection("PROFIL", data.profile.summary);

    // Pengalaman Kerja Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PENGALAMAN KERJA", margin, yPosition);
    yPosition += 10;

    data.pengalaman.forEach(exp => {
        if (yPosition > pageHeight - 60) {
            doc.addPage();
            yPosition = margin;
        }

        // Position dan Company
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(exp.posisi.toUpperCase(), margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(exp.perusahaan, margin, yPosition);
        yPosition += 6;

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
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PENDIDIKAN", margin, yPosition);
    yPosition += 10;

    data.pendidikan.forEach(edu => {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = margin;
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(edu.jenjang.toUpperCase() + " - " + edu.jurusan, margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(edu.universitas, margin, yPosition);
        yPosition += 6;
        doc.text(edu.periode, margin, yPosition);
        yPosition += 8;
    });

    // Skills Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("KEAHLIAN", margin, yPosition);
    yPosition += 10;

    Object.values(data.keahlian.categories).forEach(category => {
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = margin;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(category.title + ":", margin, yPosition);
        yPosition += 6;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
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
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SERTIFIKASI", margin, yPosition);
    yPosition += 10;

    data.keahlian.sertifikasi.slice(0, 10).forEach(cert => {
        if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
        }

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(cert.title, margin, yPosition);
        yPosition += 5;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(cert.issuer + " | " + cert.issued, margin, yPosition);
        yPosition += 7;
    });

    // Footer dengan tanggal generate
    const currentDate = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const totalExperience = data.pengalaman.reduce((total, exp) => {
        const match = exp.durasi.match(/(\d+)/);
        return total + (match ? parseInt(match[1]) : 0);
    }, 0);

    const footerText = `Generated on ${currentDate} | Total Experience: ${totalExperience}+ years | Certifications: ${data.keahlian.sertifikasi.length}`;

    // Footer di bottom of last page
    const lastPageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(footerText, margin, lastPageHeight - 10);

    // Save PDF
    const cleanName = data.profile.nama.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '_');
    doc.save(`CV_${cleanName}_${new Date().toISOString().split('T')[0]}.pdf`);
}