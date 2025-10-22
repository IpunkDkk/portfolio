# Portfolio Trio Agung Purwanto

Portfolio website modern dan elegan yang dibangun dengan HTML, CSS, dan JavaScript murni. Data portofolio dimuat dari file JSON untuk memudahkan pengelolaan konten.

## 📁 Struktur Folder

```
portfolio/
├── index.html                 # File utama
├── assets/
│   ├── css/
│   │   └── styles.css       # Stylesheet utama
│   ├── js/
│   │   └── script.js       # JavaScript utama
│   └── data/
│       └── portfolio-data.json # Data portfolio
└── README.md               # Dokumentasi ini
```

## 🚀 Fitur

- **Desain Responsif**: Tampilan optimal di desktop, tablet, dan mobile
- **Data Driven**: Konten dimuat dari file JSON
- **Animasi Halus**: Scroll animations, parallax effects, dan transitions
- **Navigation Interaktif**: Smooth scrolling dan mobile menu
- **Contact Form**: Form kontak dengan validasi
- **Timeline Experience**: Pengalaman kerja dengan timeline interaktif
- **Performance Optimized**: Optimized untuk loading cepat

## 📝 Cara Mengubah Data

### 1. Buka file JSON
Edit file `assets/data/portfolio-data.json` untuk mengubah konten portfolio:

```json
{
  "profile": {
    "nama": "Trio Agung Purwanto",
    "jabatan": "Full Stack Developer",
    "lokasi": "Pamekasan, East Java, Indonesia",
    "kontak": {
      "phone": "+62 853-3004-3948",
      "email": "ipunka37@gmail.com",
      "linkedin": "https://www.linkedin.com/in/trio-agung-purwanto"
    }
  }
}
```

### 2. Struktur Data

#### Profile Data
- `nama`: Nama lengkap
- `jabatan`: Posisi/profesi
- `lokasi`: Lokasi tempat tinggal
- `kontak`: Informasi kontak (phone, email, linkedin)
- `summary`: Ringkasan tentang diri

#### Keahlian
- `top_skills`: Daftar keahlian utama dengan icon dan deskripsi
- `sertifikasi`: Daftar sertifikasi dengan icon

#### Pengalaman
Array dari objek pengalaman kerja:
- `posisi`: Nama posisi
- `perusahaan`: Nama perusahaan
- `periode`: Periode kerja
- `deskripsi`: Deskripsi pekerjaan

#### Pendidikan
Array dari objek pendidikan:
- `jenjang`: Jenjang pendidikan
- `jurusan`: Jurusan/program studi
- `universitas`: Nama universitas
- `periode`: Tahun belajar
- `icon`: Font Awesome icon class

#### Settings
Pengaturan umum untuk teks di seluruh website.

## 🎨 Kustomisasi

### Mengubah Warna
Edit file `assets/css/styles.css` dan ubah CSS variables di bagian `:root`:

```css
:root {
    --primary-color: #2563eb;    /* Warna utama */
    --secondary-color: #1e40af;  /* Warna sekunder */
    --accent-color: #3b82f6;    /* Warna aksen */
    /* ... */
}
```

### Menambah/Menghapus Section
1. Edit `index.html` untuk menambah/menghapus section
2. Update `assets/data/portfolio-data.json` untuk data baru
3. Update `assets/js/script.js` untuk load data baru

## 📱 Mobile Optimization

Portfolio sudah dioptimalkan untuk mobile dengan:
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-friendly buttons dan links
- Optimized typography untuk layar kecil

## 🔧 Development

### Local Development
1. Clone atau download repository
2. Buka `index.html` di browser modern
3. Edit file JSON untuk mengubah konten
4. Refresh browser untuk melihat perubahan

### Requirements
- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet untuk Font Awesome dan Google Fonts
- Local server untuk menghindari CORS issues (optional)

## 📸 Screenshots

*(Tambahkan screenshot dari portfolio Anda)*

## 🤝 Kontribusi

Jika ingin menambah fitur atau memperbaiki bug:
1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📄 License

Project ini tersedia under MIT License. Lihat file `LICENSE` untuk detail.

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- Email: ipunka37@gmail.com
- LinkedIn: https://www.linkedin.com/in/trio-agung-purwanto

---

**Dibuat dengan ❤️ oleh Trio Agung Purwanto**