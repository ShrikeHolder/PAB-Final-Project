# 👋 START HERE - Nusa Media Project Guide

> **Selamat datang di Nusa Media!** Panduan ini membantu Anda memulai dengan cepat.

---

## ⚡ Quick Start (5 menit)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm start
```

### 3️⃣ Run on Device
```bash
# Scan QR code dengan Expo Go app
# ATAU
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
```

**Selesai! 🎉 Aplikasi Nusa Media sudah running!**

---

## 📚 Documentation Guide

Baca file-file ini sesuai kebutuhan Anda:

### 🎯 Untuk Pemula
**Start:** `README.md`
- Overview proyek
- Feature list
- Quick start
- Folder structure

### 🔍 Untuk Developer
**Next:** `QUICK_REFERENCE.md`
- File locations
- Common tasks
- Code snippets
- Tips & tricks

### 🏗️ Untuk Implementasi
**Then:** `IMPLEMENTATION_GUIDE.md`
- Fitur yang sudah ada
- Cara customization
- Best practices
- Enhancement ideas

### 🎨 Untuk Design
**Check:** `STYLE_GUIDE.md`
- Color system
- Typography
- Components
- Accessibility

### ✅ Untuk Verification
**Review:** `PROJECT_CHECKLIST.md`
- Feature checklist
- Testing guide
- Deployment ready
- Quality metrics

### 📊 Untuk Overview
**Summary:** `PROJECT_MANIFEST.md`
- File inventory
- Statistics
- Architecture
- Status report

---

## 🎯 Main Features

### 🏠 Home Page
- Daftar semua berita terbaru
- Filter berdasarkan kategori (9 kategori)
- Pull-to-refresh untuk update
- Bookmark artikel favorit
- Professional news card design

### 📚 Saved Page
- Lihat semua artikel yang dibookmark
- Hapus bookmark dengan mudah
- Counter artikel tersimpan
- Empty state guidance
- Smooth navigation

### 🎨 Design Excellence
- Professional red color (#AA0002)
- Responsive untuk semua ukuran layar
- Smooth animations & transitions
- Material Design icons
- Proper spacing & typography

---

## 📁 Folder Structure

```
screens/              ← Page components (Home, Saved, dll)
components/           ← Reusable UI components (NewsCard, dll)
context/              ← State management (Context API)
data/                 ← Mock data & articles
constants/            ← App constants & categories
hooks/                ← Custom React hooks
utils/                ← Helper functions
theme/                ← Design tokens & colors
assets/               ← Images & SVG icons
```

**Lihat:** `QUICK_REFERENCE.md` untuk file locations detail.

---

## 🔧 Common Tasks

### ➕ Tambah Artikel Baru
1. Buka `data/newsData.js`
2. Tambah object di array `newsArticles`
3. Isi: id, title, description, category, date, imageUrl, content

**Contoh:**
```javascript
{
  id: 9,
  title: "Judul Berita",
  description: "Deskripsi singkat",
  category: "Teknologi",
  date: "2 jam yang lalu",
  imageUrl: "https://...",
  content: "Konten lengkap",
}
```

### 🏷️ Tambah Kategori Baru
1. Buka `constants/newsConstants.js`
2. Tambah kategori di `NEWS_CATEGORIES` array

### 🎨 Ubah Warna Brand
1. Buka `theme/colors.js`
2. Ubah `primary: "#AA0002"` ke warna baru

### 🔄 Test Bookmark Feature
1. Di Home page: Klik bookmark icon
2. Artikel akan tersimpan
3. Di Saved page: Lihat artikel yang tersimpan
4. Klik bookmark icon lagi untuk hapus

---

## 🚀 Development Tips

### 💡 Hot Reload
- Edit file → Otomatis reload di app
- Tekan `r` untuk hard reload
- Tekan `a` atau `i` untuk re-run

### 🐛 Debugging
- Buka Dev Menu: Tekan `m` (Android) atau `d` (iOS)
- Gunakan `console.log()` untuk debugging
- Check terminal untuk error messages

### 📱 Testing
- Test di multiple devices
- Test di landscape & portrait
- Test dengan data banyak
- Test dengan data kosong (empty state)

### ⚡ Performance
- Gunakan React DevTools
- Monitor list rendering
- Check for console warnings
- Optimize images

---

## 🎯 Project Status

✅ **Completed**
- Home screen dengan kategori filter
- Saved screen dengan bookmark
- NewsCard component
- State management (Context API)
- Professional UI/UX design
- Complete documentation

🔜 **Ready for Enhancement**
- Search functionality
- Detail page
- User authentication
- Server integration
- Dark mode

---

## 📋 Next Steps

### 👨‍💻 Untuk Developer
1. Setup project (`npm install && npm start`)
2. Baca `QUICK_REFERENCE.md`
3. Explore folder structure
4. Test all features
5. Modify/add articles

### 🎓 Untuk Learning
1. Read `IMPLEMENTATION_GUIDE.md`
2. Study the code
3. Understand state management
4. Learn component patterns
5. Practice customization

### 📱 Untuk Deployment
1. Test on real devices
2. Build APK/IPA
3. Submit to app stores
4. Monitor performance
5. Gather feedback

---

## 🆘 Need Help?

### Dokumentasi
| File | Gunakan untuk |
|------|---|
| `README.md` | Project overview |
| `QUICK_REFERENCE.md` | Quick lookup |
| `IMPLEMENTATION_GUIDE.md` | Detailed info |
| `STYLE_GUIDE.md` | Design system |
| `PROJECT_CHECKLIST.md` | Feature check |

### Troubleshooting
- Check `PROJECT_CHECKLIST.md` untuk common issues
- Lihat console log untuk error messages
- Restart dev server: `Ctrl+C` then `npm start`
- Clear cache: `npm start -- --clear` 

### Resources
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- JavaScript: https://javascript.info/

---

## 🎨 File yang Harus Diketahui

### 📺 Untuk UI/Pages
- `screens/home.js` - Home page dengan news list
- `screens/saved.js` - Saved page dengan bookmarks
- `components/newsCard.js` - News card component

### 📊 Untuk Data
- `data/newsData.js` - Mock articles (edit untuk add news)
- `constants/newsConstants.js` - Categories & config

### 🌍 Untuk State & Logic
- `context/newsContext.js` - Bookmark state management
- `hooks/useNews.js` - Custom hooks
- `utils/formatters.js` - Helper functions

### 🎨 Untuk Styling
- `theme/colors.js` - Colors & spacing
- `App.js` - Main app component

---

## ⚙️ Troubleshooting Quick Fix

### ❌ Masalah: Icons tidak muncul
✅ **Solusi:**
```bash
npm install @expo/vector-icons
npm start
```

### ❌ Masalah: Images tidak load
✅ **Solusi:** Pastikan URL valid (gunakan unsplash atau CDN)

### ❌ Masalah: Scroll lag
✅ **Solusi:** FlatList sudah optimized, check mock data size

### ❌ Masalah: Bookmark tidak bekerja
✅ **Solusi:** Check context API di App.js wrapper

### ❌ Masalah: Hot reload tidak bekerja
✅ **Solusi:** Tekan `r` atau `Ctrl+C` lalu `npm start` lagi

---

## 🏆 Checklist Pertama Kali

- [ ] `npm install` - Install dependencies
- [ ] `npm start` - Start development
- [ ] Scan QR code dengan Expo Go
- [ ] Lihat Home page
- [ ] Test kategori filter
- [ ] Test bookmark (save artikel)
- [ ] Lihat Saved page
- [ ] Test remove bookmark
- [ ] Read documentation
- [ ] Celebrate! 🎉

---

## 💡 Pro Tips

1. **Understand State Flow** - Articles → Card → Bookmark → Saved
2. **Use Filter** - Category filter untuk organize articles
3. **Professional Design** - Consistent colors & spacing
4. **Responsive** - Works di semua ukuran layar
5. **Well Documented** - 6 doc files untuk reference
6. **Extensible** - Easy to add features
7. **Production Ready** - Already optimized
8. **Learning Value** - Great untuk belajar React Native

---

## 🎓 Learning Path

**Beginner** → Read `README.md` + run project
**Intermediate** → Study code + read `QUICK_REFERENCE.md`
**Advanced** → Understand architecture + read `IMPLEMENTATION_GUIDE.md`
**Expert** → Enhance features + read `STYLE_GUIDE.md`

---

## 📞 Final Tips

✅ **Baca dokumentasi terlebih dahulu**
✅ **Setup dan jalankan project**
✅ **Explore folder structure**
✅ **Test semua features**
✅ **Customize sesuai kebutuhan**
✅ **Refer back ke docs saat diperlukan**

---

## 🚀 Siap untuk Mulai?

### Option 1: Cepat (5 menit)
```bash
npm install && npm start
```

### Option 2: Lengkap (20 menit)
```bash
npm install                    # Install
npm start                      # Start dev
# Scan QR code
# Read QUICK_REFERENCE.md
# Test features
```

### Option 3: Mendalam (1 jam)
```bash
npm install                    # Install
npm start                      # Start dev
# Read README.md
# Read QUICK_REFERENCE.md
# Read IMPLEMENTATION_GUIDE.md
# Explore code
# Test features
# Make modifications
```

---

## 🎉 Ready?

```
     ╔═══════════════════════════════════╗
     ║   NUSA MEDIA - SIAP DILUNCURKAN   ║
     ║                                   ║
     ║   ✅ Code siap                    ║
     ║   ✅ Dokumentasi lengkap          ║
     ║   ✅ Features complete            ║
     ║   ✅ Quality tinggi                ║
     ║                                   ║
     ║   Mulai dengan: npm install       ║
     ║   Kemudian: npm start             ║
     ║                                   ║
     ║   Happy Coding! 🚀                ║
     ╚═══════════════════════════════════╝
```

---

**Nusa Media - Berita Terpercaya Indonesia**  
*Aplikasi mobile profesional untuk membaca berita*

---

## 📚 File Reference Quick Menu

| Kebutuhan | File |
|-----------|------|
| Cepat mulai | README.md |
| File locations | QUICK_REFERENCE.md |
| Detail implementasi | IMPLEMENTATION_GUIDE.md |
| Design system | STYLE_GUIDE.md |
| Feature check | PROJECT_CHECKLIST.md |
| Overview lengkap | PROJECT_MANIFEST.md |
| Ini | START_HERE.md |

**Pilih satu dan mulai!** 👇
