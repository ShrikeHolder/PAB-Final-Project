# NUSA MEDIA - GUIDE IMPLEMENTASI

## Panduan Lengkap Implementasi Aplikasi Nusa Media

### ✅ Fitur yang Sudah Diimplementasi

#### 1. **Home Screen** ✨
Fitur:
- Logo & branding Nusa Media
- Search box untuk pencarian (UI ready)
- Filter kategori horizontal scrollable
- Daftar berita dengan thumbnail
- Pull-to-refresh functionality
- Responsive design

Lokasi: `screens/home.js`
Context: `useNews()` dari `context/newsContext.js`

#### 2. **Saved Screen** 📚
Fitur:
- Tampilkan berita yang dibookmark
- Counter artikel tersimpan
- Empty state yang menarik
- Quick remove bookmark
- Header informatif

Lokasi: `screens/saved.js`
Context: `useNews()` dari `context/newsContext.js`

#### 3. **NewsCard Component** 🎴
Fitur:
- Thumbnail image
- Category badge
- Title & description
- Date display
- Bookmark button
- Elevation shadow effect

Lokasi: `components/newsCard.js`

#### 4. **State Management** 🔄
- Context API untuk manajemen state
- Custom hook `useNews()`
- Persistent state (siap untuk localStorage)

Lokasi: `context/newsContext.js`

#### 5. **Data & Mock**
- 8 artikel contoh dengan berbagai kategori
- Real Unsplash images
- Struktur data yang scalable

Lokasi: `data/newsData.js`

### 🎨 Desain & UI/UX

#### Color Scheme
```
Primary Red: #AA0002 (Nusa Media brand)
Dark Text: #222222
Light Gray: #f0f0f0
Pure White: #ffffff
Medium Gray: #999999
```

#### Typography
```
Headlines: Bold (700) - size 20-24px
Body: Regular (400) - size 12-14px
Labels: Semi-bold (600) - size 11-12px
```

#### Spacing
```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
3xl: 32px
```

### 📁 Struktur Folder

```
components/
├── newsCard.js          # Kartu berita
├── header.js            # Header navigasi
├── footer.js            # Footer navigasi
├── button.js            # Button reusable
└── separator.js         # Separator component

screens/
├── home.js              # Home page ✅
├── saved.js             # Saved page ✅
├── detailNews.js        # Detail page (optional)
├── wallet.js            # Existing
├── dashboard.js         # Existing
└── calendar.js          # Existing

context/
└── newsContext.js       # News state management ✅

data/
└── newsData.js          # Mock data ✅

hooks/
└── useNews.js           # Custom hooks ✅

utils/
└── formatters.js        # Utility functions ✅

constants/
└── newsConstants.js     # App constants ✅

theme/
└── colors.js            # Color & spacing config ✅

assets/
├── home.svg
├── search.svg
├── saved.svg
├── profile.svg
└── burger.svg
```

### 🚀 Quick Start

1. **Install Dependencies**
```bash
npm install
# atau
yarn install
```

2. **Run Development Server**
```bash
npm start
# atau
expo start
```

3. **Open di Device**
- Scan QR code dengan Expo Go app
- Atau gunakan emulator: `press a` untuk Android, `press i` untuk iOS

4. **Test Features**
- Swipe kategori di Home
- Bookmark artikel dengan icon bookmark
- Lihat artikel tersimpan di Saved page
- Swipe pull-to-refresh

### 🔧 Customization Guide

#### Menambah Kategori Baru
Edit `constants/newsConstants.js`:
```javascript
export const NEWS_CATEGORIES = [
  "Semua",
  "Kategori Baru", // ← Tambah di sini
  ...
];
```

#### Menambah Artikel Baru
Edit `data/newsData.js`:
```javascript
{
  id: 9,
  title: "Judul artikel",
  description: "Deskripsi singkat",
  category: "Kategori",
  date: "baru saja",
  imageUrl: "https://...",
  content: "Konten lengkap",
}
```

#### Mengubah Warna Brand
Edit `theme/colors.js`:
```javascript
primary: "#YOURNEWCOLOR",
```

### 📱 Responsive Design

Aplikasi sudah responsif untuk:
- Mobile portrait (common case)
- Mobile landscape
- Tablet devices

Menggunakan:
- Dimensions API
- Flexible layout (flex)
- Padding & margin responsive

### 🔐 Best Practices

1. **Component Reusability**
   - Gunakan NewsCard untuk semua berita
   - Gunakan custom hooks untuk logic yang berulang

2. **State Management**
   - Gunakan Context API untuk global state
   - Gunakan useState untuk local state

3. **Performance**
   - FlatList dengan keyExtractor
   - useCallback untuk callbacks
   - useMemo untuk expensive computations (jika perlu)

4. **Styling**
   - Gunakan theme colors untuk consistency
   - Gunakan spacing constants
   - Avoid hardcoding colors

### 🎯 Fitur Ready untuk Dikembangkan

1. **Search Functionality**
   - Implementasi di search box
   - Gunakan `useArticleSearch` hook

2. **Detail Page**
   - Navigasi ke `screens/detailNews.js`
   - Pass article data via navigation params

3. **User Authentication**
   - Tambah login screen
   - Persist user preferences

4. **Offline Support**
   - Cache articles dengan AsyncStorage
   - Sync saat online

5. **Notifications**
   - Push notifications untuk berita baru
   - Use expo-notifications

6. **Dark Mode**
   - Tambah theme context
   - Toggle antara light/dark

### 🐛 Common Issues & Solutions

**Issue**: Icons tidak muncul
```bash
# Solution: Install vector icons
npm install @expo/vector-icons
```

**Issue**: Image tidak loading
```javascript
// Pastikan URL valid
// Gunakan defaultSource sebagai fallback
<Image defaultSource={require('./placeholder.png')} />
```

**Issue**: Scroll tidak smooth
```javascript
// Gunakan optimizations:
// - removeClippedSubviews
// - scrollEventThrottle
// - maxToRenderPerBatch
```

### 📚 Dokumentasi Dependencies

- **React Native**: UI Framework
- **Expo**: Build & deployment
- **Expo Icons**: Material Design Icons
- **Context API**: State management
- **React Native Gesture Handler**: Touch handling

### 🎓 Learning Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Context API Guide](https://react.dev/reference/react/useContext)

---

## Summary

Aplikasi Nusa Media sudah dilengkapi dengan:
✅ Home page dengan kategori filter
✅ Saved page untuk bookmark
✅ Professional design & UI
✅ State management dengan Context API
✅ Mock data & components
✅ Utilities & constants
✅ Custom hooks

Siap untuk produksi dan ready untuk pengembangan lebih lanjut!

---

**Happy Coding! 🚀 Nusa Media**
