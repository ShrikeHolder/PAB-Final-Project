# 🔧 NEWSAPI INTEGRATION GUIDE

## Setup NewsAPI untuk Nusa Media

Panduan lengkap mengintegrasikan NewsAPI.org dengan aplikasi Nusa Media Anda.

---

## 📋 Prerequisites

✅ Node.js & npm installed
✅ Project sudah setup dengan `npm install`
✅ Account di https://newsapi.org/ (gratis)

---

## 🚀 Step-by-Step Setup

### Step 1: Dapatkan API Key dari NewsAPI

1. Buka https://newsapi.org/
2. Klik "Sign up" (registrasi gratis)
3. Isi form pendaftaran dengan email Anda
4. Verify email Anda
5. Login ke dashboard
6. Copy API Key Anda (terlihat di halaman dashboard)

**API Key Format:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` (32 karakter)

### Step 2: Configure API Key di Project

#### Option A: Langsung di Service File (Simplest)

1. Buka file: `services/newsApiService.js`
2. Cari baris: `const API_KEY = "YOUR_API_KEY_HERE";`
3. Ganti dengan API key Anda:
   ```javascript
   const API_KEY = "your_actual_api_key_here";
   ```
4. Simpan file

**Contoh:**
```javascript
// ❌ SEBELUM
const API_KEY = "YOUR_API_KEY_HERE";

// ✅ SESUDAH
const API_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
```

#### Option B: Menggunakan Environment Variables (Lebih Aman)

1. Buat file `.env` di root project:
```
EXPO_PUBLIC_NEWS_API_KEY=your_actual_api_key_here
```

2. Update `services/newsApiService.js`:
```javascript
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY || "YOUR_API_KEY_HERE";
```

3. Restart dev server: `npm start`

### Step 3: Test Integrasi

1. Jalankan project: `npm start`
2. Buka Home screen
3. Perhatikan:
   - ✅ Jika tidak ada pesan warning/error = API berfungsi
   - ⚠️ Jika ada banner orange = API key belum dikonfigurasi (gunakan mock data)
   - ❌ Jika ada banner merah = Ada error dari API

---

## 🔍 API Endpoints yang Tersedia

Aplikasi Nusa Media menggunakan 2 endpoint utama:

### 1. Top Headlines
```javascript
// Dapatkan berita terbaru (default Indonesia)
getTopHeadlines({
  country: "id",        // ISO country code
  category: "technology", // Optional: business, entertainment, general, health, science, sports, technology
  pageSize: 20          // Jumlah artikel
})
```

**Categories Tersedia:**
- `business` - Bisnis
- `entertainment` - Hiburan
- `general` - Umum
- `health` - Kesehatan
- `science` - Sains
- `sports` - Olahraga
- `technology` - Teknologi

### 2. Search Everything
```javascript
// Search artikel berdasarkan query
searchEverything({
  q: "COVID-19",           // Query (required)
  language: "id",          // Bahasa (id, en, dll)
  sortBy: "publishedAt",   // publishedAt, relevancy, popularity
  pageSize: 20             // Jumlah artikel
})
```

---

## 📊 NewsAPI Pricing & Limits

### Free Tier (Gratis)
- ✅ 100 requests per hari
- ✅ 1 month of article history
- ✅ Top Headlines & Everything endpoints
- ✅ Cocok untuk development & testing

### Developer Tier ($45/month)
- ✅ 500 requests per hari
- ✅ 30 days of article history
- ✅ Semua endpoints

### Business Tier ($449/month)
- ✅ 60,000 requests per hari
- ✅ Full history available
- ✅ Premium support

**Tips:** Mulai dengan free tier, upgrade kalau dibutuhkan.

---

## 💾 Mock Data Fallback

Jika API tidak tersedia atau error:
- ✅ App secara otomatis fallback ke mock data
- ✅ User masih bisa browse berita lokal
- ✅ Banner warning menginformasikan user

**Flow:**
```
User requests articles
    ↓
Try fetch dari API
    ↓
[API Success?]
    ├─ Yes → Format & display API data
    └─ No → Fallback ke mock data (newsData.js)
```

---

## 🛠️ Troubleshooting

### ❌ Masalah: Banner "API key not configured"

**Penyebab:** API key belum diatur atau salah

**Solusi:**
1. Check `services/newsApiService.js`
2. Pastikan API key sudah diganti
3. Pastikan tidak ada spasi atau karakter extra
4. Restart app (`npm start`)

### ❌ Masalah: 401 Unauthorized Error

**Penyebab:** API key invalid atau expired

**Solusi:**
1. Check API key di https://newsapi.org/account
2. Copy API key yang benar
3. Update di `services/newsApiService.js`
4. Restart app

### ❌ Masalah: 429 Too Many Requests

**Penyebab:** Exceeded daily request limit

**Solusi:**
1. Tunggu sampai besok (daily quota reset)
2. Atau upgrade ke paid plan
3. Cek usage di https://newsapi.org/account

### ❌ Masalah: Empty articles list

**Penyebab:** Query terlalu spesifik atau tidak ada hasil

**Solusi:**
1. Coba kategori yang berbeda
2. Cek kategori mapping di `screens/home.js`
3. Gunakan kategori "general" untuk test

### ✅ Masalah: Articles tampil tapi image broken

**Penyebab:** URL image dari API tidak accessible

**Solusi:**
1. Normal behavior untuk beberapa sumber
2. App sudah handle dengan placeholder image
3. Tidak akan break app functionality

---

## 📱 Testing Checklist

Setelah setup API, test fitur berikut:

- [ ] Home page load dengan API data
- [ ] Category filter fetch data dari API
- [ ] Pull-to-refresh update articles
- [ ] Bookmark save artikel bekerja
- [ ] Saved page show bookmarked articles
- [ ] Error handling jika API down
- [ ] Fallback ke mock data jika error
- [ ] App tidak crash saat fetch

---

## 🔒 Security Best Practices

⚠️ **IMPORTANT:** Jangan commit API key ke GitHub!

### Protect Your API Key:

**Option 1: Use .env file**
```
1. Create .env file (root project)
2. Add: EXPO_PUBLIC_NEWS_API_KEY=your_key
3. Add .env to .gitignore
4. Use: const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY
```

**Option 2: Backend Proxy**
```
- Jangan expose API key di client
- Buat backend endpoint untuk proxy API calls
- Client → Your Backend → NewsAPI
```

**Option 3: API Key Rotation**
```
- Jika API key leak/exposed:
1. Go to https://newsapi.org/account
2. Regenerate new API key
3. Update app with new key
4. Old key akan invalid
```

---

## 📚 Code Examples

### Fetch Top Headlines
```javascript
import * as newsApiService from '../services/newsApiService';

// Fetch dengan kategori
const result = await newsApiService.getTopHeadlines({
  category: 'technology',
  pageSize: 20,
});

if (result.success) {
  const formatted = newsApiService.formatArticles(result.data);
  setArticles(formatted);
}
```

### Search Articles
```javascript
// Search specific topic
const result = await newsApiService.searchEverything({
  q: 'artificial intelligence',
  language: 'id',
  sortBy: 'publishedAt',
});

if (result.success) {
  const articles = newsApiService.formatArticles(result.data);
  setArticles(articles);
}
```

### Check API Status
```javascript
import * as newsApiService from '../services/newsApiService';

// Check if API is configured
const isConfigured = newsApiService.isApiKeyConfigured();

if (!isConfigured) {
  console.log('Using mock data');
}

// Get API status info
const status = newsApiService.getApiStatus();
console.log(status);
// Output: {
//   configured: true,
//   baseUrl: 'https://newsapi.org/v2',
//   apiKey: 'a1b2****',
//   message: 'API key configured'
// }
```

---

## 🌍 Multi-Country Support

NewsAPI mendukung berbagai negara. Contoh:

```javascript
// Indonesia
getTopHeadlines({ country: 'id' })

// USA
getTopHeadlines({ country: 'us' })

// UK
getTopHeadlines({ country: 'gb' })

// Lihat semua di: https://newsapi.org/docs/endpoints/top-headlines
```

---

## 📊 API Response Format

### Success Response
```javascript
{
  success: true,
  data: [
    {
      id: 1,
      title: "Article Title",
      description: "Short description",
      category: "Technology",
      date: "2 hours ago",
      imageUrl: "https://...",
      source: "Source Name",
      url: "https://full-article-url",
      author: "Author Name",
      publishedAt: "2025-12-08T10:30:00Z",
      content: "Full article content..."
    },
    // More articles...
  ],
  totalResults: 150,
  status: "ok"
}
```

### Error Response
```javascript
{
  success: false,
  error: "Error message here",
  data: []
}
```

---

## 🚀 Next Steps

### Immediate
- [ ] Get API key dari NewsAPI
- [ ] Configure API key di project
- [ ] Test integrasi
- [ ] Verify data loading

### Soon
- [ ] Implement search functionality
- [ ] Add article sharing
- [ ] Implement caching
- [ ] Add more categories

### Later
- [ ] User authentication
- [ ] Personalized news feed
- [ ] Push notifications
- [ ] Analytics tracking

---

## 📚 Resources

### Official Documentation
- NewsAPI Docs: https://newsapi.org/docs
- NewsAPI FAQ: https://newsapi.org/FAQ
- NewsAPI Status: https://status.newsapi.org/

### Related Docs
- Check `IMPLEMENTATION_GUIDE.md` untuk detail code
- Check `QUICK_REFERENCE.md` untuk code snippets
- Check `README.md` untuk project overview

---

## 💬 Common Questions

**Q: Bisakah saya menggunakan API key orang lain?**
A: Tidak disarankan. Buat account sendiri di newsapi.org

**Q: API key saya di-expose, apa yang harus saya lakukan?**
A: Regenerate di https://newsapi.org/account

**Q: Berapa request limit per hari?**
A: 100 requests/hari untuk free tier

**Q: Bisa pakai API key lokal saja (offline)?**
A: Ya, fallback ke mock data jika API tidak available

**Q: Bagaimana cara upgrade plan?**
A: Kunjungi https://newsapi.org/pricing

---

## ✅ Verification Checklist

Sebelum consider "done":

- [ ] API key diperoleh dari newsapi.org
- [ ] API key dikonfigurasi di code
- [ ] Home screen fetch data dari API
- [ ] Category filter bekerja dengan API
- [ ] Error handling sudah tested
- [ ] Mock data fallback working
- [ ] Tidak ada API key di GitHub
- [ ] Documentation diupdate
- [ ] Tested di device/emulator
- [ ] Performance acceptable

---

## 🎉 Success!

Jika Anda melihat:
✅ Berita real-time dari NewsAPI
✅ Kategori filter bekerja
✅ Tidak ada error banner
✅ Bookmark still working

**Maka NewsAPI integration sudah berhasil!** 🚀

---

**Happy Coding dengan NewsAPI!**

*Terakhir diupdate: December 8, 2025*
