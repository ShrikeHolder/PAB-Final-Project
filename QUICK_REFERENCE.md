# 🚀 NUSA MEDIA - QUICK REFERENCE

## File Locations Quick Reference

### 📺 Screens (Look here for UI pages)
```
screens/
  ├── home.js          👈 Main news list with categories
  ├── saved.js         👈 Bookmarked articles
  ├── detailNews.js    👈 Single article detail (optional)
  ├── wallet.js
  ├── dashboard.js
  └── calendar.js
```

### 🧩 Components (Reusable UI parts)
```
components/
  ├── newsCard.js      👈 Article card component (IMPORTANT!)
  ├── header.js        👈 Top header
  ├── footer.js        👈 Bottom navigation
  ├── button.js
  └── separator.js
```

### 🌍 State & Context
```
context/
  └── newsContext.js   👈 Global state for bookmarks

hooks/
  └── useNews.js       👈 Custom hooks
```

### 📊 Data & Config
```
data/
  └── newsData.js      👈 Article mock data (edit here to add news)

constants/
  └── newsConstants.js 👈 App categories & constants

theme/
  └── colors.js        👈 Design colors & spacing
```

### 📚 Utilities
```
utils/
  └── formatters.js    👈 Date & text formatting functions
```

---

## 🎯 Common Tasks

### ➕ Add New Article
```javascript
// File: data/newsData.js
{
  id: 9,
  title: "Your Article Title",
  description: "Short description here",
  category: "Teknologi",  // Or any category
  date: "2 jam yang lalu",
  imageUrl: "https://images.unsplash.com/...",
  content: "Full article content...",
}
```

### 🎨 Add New Category
```javascript
// File: constants/newsConstants.js
export const NEWS_CATEGORIES = [
  "Semua",
  "Teknologi",
  "Your New Category",  // ← Add here
  ...
];
```

### 🎭 Change Brand Color
```javascript
// File: theme/colors.js
primary: "#AA0002",  // ← Change this hex code
```

### 📝 Update App Tagline
```javascript
// File: constants/newsConstants.js
export const APP_CONFIG = {
  name: "Nusa Media",
  tagline: "Your new tagline here",  // ← Edit this
  version: "1.0.0",
};
```

---

## 📱 Feature Usage

### 🔖 Bookmark an Article
```
1. User taps the bookmark icon
2. NewsCard calls onSave callback
3. Home/Saved page toggles article in context
4. useNews hook updates savedArticles array
5. Saved page re-renders with new article
```

### 🏷️ Filter by Category
```
1. User taps category chip
2. setSelectedCategory updates state
3. filteredNews filters newsArticles array
4. FlatList re-renders with filtered data
```

### 🔄 Pull to Refresh
```
1. User swipes down
2. onRefresh callback fires
3. setRefreshing(true) shows spinner
4. After 2 seconds, spinner hides
5. Data stays the same (mock data)
```

---

## 🔗 Component Dependencies

```
App.js
├── NewsProvider (from newsContext.js)
├── Header
├── Home
│   ├── FlatList
│   │   ├── NewsCard
│   │   │   ├── useNews (hook)
│   │   │   └── MaterialIcons
│   │   └── Category Filter
│   └── useNews (hook)
├── Saved
│   ├── FlatList
│   │   └── NewsCard
│   └── useNews (hook)
├── Footer
└── Other Screens (Wallet, Dashboard, etc.)
```

---

## 🛠️ Key Functions & Hooks

### useNews() Hook
```javascript
const { savedArticles, toggleSaveArticle, isSaved } = useNews();

// savedArticles: Array of bookmarked articles
// toggleSaveArticle(article): Add/remove article
// isSaved(articleId): Check if bookmarked
```

### NewsCard Component
```javascript
<NewsCard
  id={item.id}
  title={item.title}
  description={item.description}
  category={item.category}
  date={item.date}
  imageUrl={item.imageUrl}
  isSaved={isSaved(item.id)}
  onSave={handleSaveArticle}
  onPress={() => navigateToDetail()}
/>
```

---

## 🎨 Styling Imports

```javascript
// Colors
import { colors } from '../theme/colors';
colors.primary      // #AA0002
colors.dark         // #222222
colors.white        // #ffffff
colors.lightGray    // #f0f0f0

// Spacing
import { spacing } from '../theme/colors';
spacing.xs  // 4px
spacing.sm  // 8px
spacing.md  // 12px
spacing.lg  // 16px

// Font sizes
import { fontSizes } from '../theme/colors';
fontSizes.sm    // 12px
fontSizes.base  // 14px
fontSizes.lg    // 16px
fontSizes.xl    // 18px
fontSizes['2xl'] // 20px
fontSizes['3xl'] // 24px
```

---

## 📝 Common Code Snippets

### Filter Articles by Category
```javascript
const filteredNews = selectedCategory === "Semua"
  ? newsArticles
  : newsArticles.filter((a) => a.category === selectedCategory);
```

### Toggle Bookmark
```javascript
const handleSaveArticle = (articleId) => {
  const article = newsArticles.find((a) => a.id === articleId);
  if (article) toggleSaveArticle(article);
};
```

### Check if Saved
```javascript
const bookmarked = isSaved(articleId);
<MaterialIcons 
  name={bookmarked ? "bookmark" : "bookmark-border"}
  color={bookmarked ? "#AA0002" : "#999"}
/>
```

---

## 🚀 Start App Development

### Step 1: Install
```bash
npm install
```

### Step 2: Start
```bash
npm start
```

### Step 3: Choose Platform
```
press a → Android
press i → iOS
press w → Web
press q → Quit
```

### Step 4: Edit Code
```
Edit any file → Hot reload automatically
```

---

## 📂 File Tree

```
20 total files created/updated:

NEW SCREENS (2):
  ✅ screens/home.js
  ✅ screens/saved.js

NEW COMPONENTS (1):
  ✅ components/newsCard.js

NEW CONTEXT (1):
  ✅ context/newsContext.js

NEW DATA (1):
  ✅ data/newsData.js

NEW CONFIG (4):
  ✅ constants/newsConstants.js
  ✅ hooks/useNews.js
  ✅ utils/formatters.js
  ✅ theme/colors.js

NEW SETUP (2):
  ✅ setup.sh (Mac/Linux)
  ✅ setup.bat (Windows)

NEW CONFIG (2):
  ✅ .eslintrc.json
  ✅ .prettierrc.json

NEW DOCS (5):
  ✅ README.md
  ✅ IMPLEMENTATION_GUIDE.md
  ✅ PROJECT_CHECKLIST.md
  ✅ PROJECT_SUMMARY.md
  ✅ STYLE_GUIDE.md

UPDATED (1):
  ✅ App.js (added NewsProvider)

Total: 20 files
Lines of Code: ~1,200+
```

---

## ⚡ Performance Tips

### ✅ Good Practices Used
- FlatList with keyExtractor
- useCallback for callbacks
- Component memoization ready
- Optimized re-renders

### 🚀 Optional Future Optimizations
- React.memo for components
- useMemo for expensive operations
- Image caching
- Lazy loading

---

## 🐛 Troubleshooting

### Icons Not Showing?
```javascript
// Make sure @expo/vector-icons is installed
npm install @expo/vector-icons
```

### Images Not Loading?
```javascript
// Check URL format
https://images.unsplash.com/photo-xxx?w=500&h=280&fit=crop
```

### Styles Not Applied?
```javascript
// Check imports
import { StyleSheet } from 'react-native';
// Use StyleSheet.create() for best performance
```

### Navigation Not Working?
```javascript
// Check App.js has proper routing
// Verify screen names match in changePage()
```

---

## 📞 Quick Support

### Documentation Files
| File | Purpose |
|------|---------|
| README.md | Overview & quick start |
| IMPLEMENTATION_GUIDE.md | Detailed implementation |
| PROJECT_CHECKLIST.md | Feature checklist |
| PROJECT_SUMMARY.md | Project statistics |
| STYLE_GUIDE.md | Design system |
| This File | Quick reference |

### External Resources
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- JavaScript: https://javascript.info/

---

## 🎯 Next Steps

1. ✅ Setup complete
2. ✅ Code ready
3. ✅ Documentation done
4. 👉 Run: `npm start`
5. 👉 Test all features
6. 👉 Add more articles
7. 👉 Deploy to app store

---

## 💡 Pro Tips

💡 Use categories to organize articles by topic
💡 Bookmark feature helps users save favorites
💡 Pull-to-refresh feels native and smooth
💡 Empty state guides users what to do
💡 Professional design impresses users
💡 Code is well-documented for maintenance
💡 Easy to extend with new features

---

**Happy Coding! 🚀**

Nusa Media - Berita Terpercaya Indonesia
*December 8, 2025*
