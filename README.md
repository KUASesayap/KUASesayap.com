# Buku Tamu Digital KUA Kecamatan Sesayap — GitHub Pages

Versi ini dibuat khusus untuk **GitHub Pages**. Semua file website berada langsung dalam satu folder tanpa folder `assets`.

## Struktur

```text
Buku_Tamu_Digital_KUA_Sesayap_GitHub/
├── index.html
├── admin.html
├── config.js
├── Code.gs
├── logo-kemenag.png
├── kepala-kua.jpeg
├── .nojekyll
└── README.md
```

## 1. Upload ke GitHub

Buat repository baru, lalu upload seluruh isi folder ini ke **root repository**. Jangan upload folder pembungkusnya; file `index.html` harus berada di root.

## 2. Aktifkan GitHub Pages

Di repository GitHub buka:

**Settings → Pages → Build and deployment → Source: Deploy from a branch**

Pilih:

- Branch: `main`
- Folder: `/ (root)`

Klik **Save**. Setelah beberapa saat GitHub memberikan alamat website.

## 3. Hubungkan Google Sheets

1. Buat Google Sheet baru.
2. Buka **Extensions → Apps Script**.
3. Salin isi `Code.gs` ke Apps Script.
4. Jalankan/deploy sebagai **Web app**.
5. Pilih **Execute as: Me**.
6. Untuk akses, pilih **Anyone** sesuai kebutuhan layanan publik.
7. Salin URL Web App yang berakhiran `/exec`.

## 4. Masukkan URL Apps Script

Buka `config.js` dan ubah:

```js
API_URL: "PASTE_APPS_SCRIPT_WEB_APP_URL_HERE"
```

menjadi URL Web App, contoh:

```js
API_URL: "https://script.google.com/macros/s/XXXXXXXX/exec"
```

File `index.html` dan `admin.html` **tidak perlu diedit lagi** untuk URL database.

## 5. Isi akun media sosial

Masih di `config.js`, ganti:

```js
WHATSAPP: "WHATSAPP_URL",
INSTAGRAM: "INSTAGRAM_URL",
TIKTOK: "TIKTOK_URL"
```

dengan akun resmi KUA Sesayap.

Contoh WhatsApp:

```js
WHATSAPP: "https://wa.me/628xxxxxxxxxx"
```

## 6. Fitur yang tersedia

- Form buku tamu tanpa NIK.
- Nama, HP/WhatsApp, alamat, keperluan, bertemu dengan, dan keterangan.
- Total jumlah tamu terdaftar.
- Persentase tujuan/keperluan kunjungan.
- Statistik diperbarui otomatis setiap 10 detik.
- Setelah pengisian berhasil, statistik publik langsung diperbarui dari respons Apps Script.
- Dashboard admin dengan pencarian dan filter tanggal.
- Export CSV.
- Logo Kementerian Agama dan foto Kepala KUA langsung berada di root.
- Ikon WhatsApp, Instagram, dan TikTok pada halaman publik.

## Catatan penting

GitHub Pages hanya menjadi **hosting website statis**. Data tamu tetap disimpan di Google Sheets melalui Google Apps Script.

Jika mengubah `Code.gs`, lakukan **Deploy → Manage deployments → Edit → New version → Deploy** agar perubahan API aktif.

Jika mengubah `config.js`, cukup commit/push ke GitHub; GitHub Pages akan memperbarui website.
