# Nusa Media - Aplikasi Berita Mobile

Aplikasi mobile modern untuk membaca berita terpercaya Indonesia dengan antarmuka yang profesional dan responsif, dibangun menggunakan React Native dan Expo.

## 🎯 Fitur Utama

### Home Page
- **Daftar Berita Terbaru**: Tampilkan semua berita dengan desain kartu yang menarik
- **Filter Kategori**: Pilih kategori berita favorit (Teknologi, Bisnis, Gadget, dll)
- **Search Box**: Fitur pencarian (siap untuk implementasi lanjutan)
- **Pull to Refresh**: Refresh berita dengan swipe ke bawah
- **Responsive Design**: Layout yang sempurna di semua ukuran layar

### Saved Page
- **Bookmark Berita**: Simpan berita favorit dengan satu klik
- **Manajemen Koleksi**: Lihat semua berita yang telah disimpan
- **Empty State**: Tampilan menarik ketika belum ada berita tersimpan
- **Quick Remove**: Hapus bookmark dengan mudah

## 📱 Struktur Proyek

```
PAB-Final-Project/
├── components/
│   ├── newsCard.js          # Komponen kartu berita
│   ├── header.js            # Header dengan menu
│   ├── footer.js            # Footer navigasi
│   ├── button.js            # Tombol reusable
│   └── separator.js         # Pemisah
├── screens/
│   ├── home.js              # Halaman utama
│   ├── saved.js             # Halaman berita tersimpan
│   ├── wallet.js            # Halaman dompet
│   ├── dashboard.js         # Halaman dashboard
│   └── calendar.js          # Halaman kalender
├── context/
│   └── newsContext.js       # Context API untuk state management
├── data/
│   └── newsData.js          # Mock data berita
├── theme/
│   └── colors.js            # Konfigurasi warna dan tema
├── App.js                   # Root component
├── app.json                 # Konfigurasi Expo
├── package.json             # Dependencies
└── README.md               # Dokumentasi
```

## 🎨 Desain & Styling

### Palet Warna
- **Primary**: #AA0002 (Merah Nusa Media)
- **Dark**: #222222 (Teks utama)
- **Light Gray**: #f0f0f0 (Background)
- **White**: #ffffff (Kartu)

### Komponen Utama

#### NewsCard
Kartu berita profesional dengan:
- Gambar thumbnail (200px height)
- Badge kategori
- Judul berita
- Deskripsi singkat
- Tanggal publikasi
- Tombol bookmark

#### Home Screen
Fitur:
- Logo Nusa Media dengan tagline
- Search box
- Filter kategori horizontal
- List berita dengan infinite scroll
- Pull-to-refresh

#### Saved Screen
Fitur:
- Header dengan icon bookmark
- Counter artikel tersimpan
- List berita yang dibookmark
- Empty state guidance

## 🛠️ Teknologi

### Dependencies
- **react-native**: Framework UI mobile
- **react-native-gesture-handler**: Gesture handling
- **react-native-reanimated**: Animasi smooth
- **react-native-safe-area-context**: Safe area management
- **expo**: Build dan development
- **expo-icons**: Material Design Icons
- **@gluestack-ui/themed**: UI Components

### State Management
- Context API untuk manajemen state berita tersimpan
- Custom hook `useNews()` untuk akses context

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 14+
- Expo CLI (`npm install -g expo-cli`)
- Mobile device dengan Expo Go app ATAU Android/iOS emulator

### Setup
```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Untuk Android
npm run android

# Untuk iOS
npm run ios

# Untuk Web
npm run web
```

## 📝 Implementasi Fitur

### 1. Home Page
```javascript
// Filter kategori dan tampilkan berita
- State: selectedCategory, refreshing
- Functions: onRefresh, handleSaveArticle
- Context: useNews hook
```

### 2. Saved Page
```javascript
// Kelola berita yang dibookmark
- State: savedArticles (dari context)
- Functions: handleRemoveArticle
- UI: Empty state jika tidak ada berita
```

### 3. State Management
```javascript
// Context API
- savedArticles: Array berita yang disimpan
- toggleSaveArticle: Fungsi toggle bookmark
- isSaved: Check apakah berita sudah disimpan
```

## 🔄 Data Flow

```
App.js (NewsProvider)
  ├── Home Screen
  │   ├── NewsCard (onSave)
  │   └── useNews (toggleSaveArticle)
  │
  └── Saved Screen
      ├── NewsCard (onSave)
      └── useNews (savedArticles, toggleSaveArticle)
```

## 🎯 Fitur Siap Dikembangkan

1. **Detail Berita**: Buka halaman detail saat klik berita
2. **Share Berita**: Bagikan berita ke social media
3. **Search**: Implementasi search functionality
4. **User Authentication**: Login dan profile
5. **Notifikasi**: Push notification untuk berita baru
6. **Dark Mode**: Theme gelap
7. **Caching**: Offline reading capability
8. **Pagination**: Load more berita secara otomatis

## 📸 Screenshot

### Home Screen
- Header dengan Nusa Media logo
- Search box
- Kategori horizontal scrollable
- List berita dengan thumbnail

### Saved Screen
- Header informatif
- List berita yang dibookmark
- Empty state dengan CTA button

## 🐛 Troubleshooting

### Icons tidak muncul
```javascript
// Pastikan material icons ter-install
npm install @expo/vector-icons
```

### Image tidak load
```javascript
// Gunakan valid image URL dari Unsplash atau CDN lain
// Format: https://images.unsplash.com/...?w=500&h=280&fit=crop
```

## 📄 Lisensi

Proyek ini adalah tugas akademik untuk PAB (Pemrograman Aplikasi Bergerak).

## 👨‍💻 Author

Dibuat untuk memenuhi tugas besar PAB Final Project.

---

**Happy Coding! 🚀**
