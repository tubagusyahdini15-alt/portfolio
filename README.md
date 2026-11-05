# Portofolio Desain Grafis

Website portofolio statis (HTML, CSS, JavaScript) bertema gelap.

## Struktur folder

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── foto-profil.jpg    (foto untuk bagian Beranda dan Profil)
    ├── foto-kontak.jpg    (foto untuk bagian Kontak, boleh sama dengan foto-profil)
    ├── karya-1.jpg
    ├── karya-2.jpg
    └── ... sampai karya-10.jpg
```

## Yang perlu Anda ganti di index.html

1. **Nama**: cari `NAMA` dan `NAMA ANDA`.
2. **Angka statistik** di Beranda (tahun pengalaman, proyek, klien): ubah `data-count` dan teks di dalamnya.
3. **Profil**: sesuaikan teks Tentang Saya, Software Skills, Pendidikan (SMA/SMK), Pengalaman (isi `20XX`), dan persentase Bahasa.
4. **Karya**: ganti gambar di folder `images/`, lalu ubah judul dan kategori. Class `big`, `tall`, `wide` mengatur ukuran kotak di galeri. Tambah atau hapus blok `<article class="card">` sesuai jumlah karya.
5. **Kontak**: ganti `email@anda.com` dan semua `USERNAME`.

Tips gambar: simpan dalam format JPG atau WebP, lebar sekitar 1200 px, ukuran di bawah 500 KB per file agar halaman cepat dibuka. Selama gambar belum ada, halaman menampilkan kotak placeholder.

## Cara upload ke GitHub dan aktifkan GitHub Pages

1. Buat repository baru di GitHub bernama `USERNAME.github.io` (ganti `USERNAME` dengan username GitHub Anda). Atur sebagai Public.
2. Upload semua file (termasuk folder `images`) lewat tombol **Add file > Upload files**, lalu **Commit changes**.
3. Buka **Settings > Pages**. Pada **Branch**, pilih `main` dan folder `/ (root)`, lalu **Save**.
4. Tunggu 1 sampai 2 menit. Portofolio bisa dibuka di `https://USERNAME.github.io`.

Jika memakai nama repository lain (misalnya `portfolio`), alamatnya menjadi `https://USERNAME.github.io/portfolio`.
