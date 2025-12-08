# 🎨 NUSA MEDIA - STYLE GUIDE

## Design System untuk Aplikasi Nusa Media

---

## 🎯 Brand Identity

### Logo & Branding
- **App Name**: Nusa Media
- **Tagline**: Berita Terpercaya Indonesia
- **Brand Color**: #AA0002 (Red)
- **Secondary Color**: #222222 (Dark)

### Mission
Menyediakan aplikasi berita mobile yang modern, profesional, dan mudah digunakan untuk pembaca berita terpercaya di Indonesia.

---

## 🎨 Color System

### Primary Colors
```
Primary Red:    #AA0002
   ├─ Used for: Main buttons, badges, highlights
   ├─ Contrast: ✅ Excellent on white & light gray
   └─ Brand Identity: Core brand color

Dark Charcoal:  #222222
   ├─ Used for: Headings, main text
   ├─ Contrast: ✅ High contrast on white
   └─ Readability: Optimal

Light Gray:     #f0f0f0
   ├─ Used for: Backgrounds, inactive states
   ├─ Contrast: ✅ Good for text
   └─ Purpose: Subtle backgrounds
```

### Secondary Colors
```
Pure White:     #ffffff
   ├─ Used for: Cards, content areas
   ├─ Purpose: Clean, minimal aesthetic
   └─ Elevation: Base layer

Medium Gray:    #999999
   ├─ Used for: Secondary text, placeholders
   ├─ Contrast: ✅ Readable but subtle
   └─ Purpose: De-emphasized content

Border Gray:    #e6e6e6
   ├─ Used for: Dividers, borders
   ├─ Purpose: Subtle separation
   └─ Contrast: ✅ Visible but not dominant
```

### Semantic Colors
```
Success:  #4CAF50 (for positive actions)
Error:    #F44336 (for errors)
Warning:  #FF9800 (for warnings)
Info:     #2196F3 (for information)
```

---

## 📏 Typography System

### Font Stack
```javascript
// Recommended
fontFamily: "System" // Native system font

// Weights
- Regular: 400
- Semi-bold: 600
- Bold: 700
- Extra Bold: 800
```

### Type Scale
```
Size xs:    11px  │ Usage: Small labels, captions
Size sm:    12px  │ Usage: Secondary text
Size base:  14px  │ Usage: Body text
Size lg:    16px  │ Usage: Subheadings
Size xl:    18px  │ Usage: Headings
Size 2xl:   20px  │ Usage: Large headings
Size 3xl:   24px  │ Usage: Section titles
Size 4xl:   32px  │ Usage: Page titles
```

### Font Usage

#### Headlines
```javascript
{
  fontSize: 24,
  fontWeight: "700",
  color: "#222222",
  lineHeight: 32,
}
```

#### Subheadings
```javascript
{
  fontSize: 18,
  fontWeight: "700",
  color: "#222222",
  lineHeight: 28,
}
```

#### Body Text
```javascript
{
  fontSize: 14,
  fontWeight: "400",
  color: "#666666",
  lineHeight: 22,
}
```

#### Caption/Small Text
```javascript
{
  fontSize: 12,
  fontWeight: "600",
  color: "#999999",
}
```

---

## 📐 Spacing System

### Spacing Scale
```
xs:    4px    │ Minimal spacing
sm:    8px    │ Small gaps
md:    12px   │ Standard padding
lg:    16px   │ Card padding, section gaps
xl:    20px   │ Section spacing
2xl:   24px   │ Major spacing
3xl:   32px   │ Large section gaps
```

### Usage Examples
```javascript
// Card padding
padding: 16

// Section gap
marginVertical: 24

// List item spacing
marginHorizontal: 12

// Button padding
paddingHorizontal: 16,
paddingVertical: 12

// Screen padding
paddingHorizontal: 16,
paddingTop: 20
```

---

## 🔘 Components

### Button Styles

#### Primary Button
```javascript
{
  backgroundColor: "#AA0002",
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

Text: {
  color: "#ffffff",
  fontSize: 14,
  fontWeight: "600",
}
```

#### Secondary Button
```javascript
{
  backgroundColor: "#f0f0f0",
  borderWidth: 1,
  borderColor: "#e6e6e6",
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 8,
}

Text: {
  color: "#222222",
  fontSize: 14,
  fontWeight: "600",
}
```

#### Icon Button
```javascript
{
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
}

Size: 20-24px (icons)
Color: "#AA0002" (active), "#999999" (inactive)
```

### Card Styles

#### News Card
```javascript
{
  backgroundColor: "#ffffff",
  borderRadius: 12,
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  overflow: "hidden",
}

Padding: 12-16px
Border Radius: 12px
Elevation: 3 (Android), shadow (iOS)
```

### Badge Styles

#### Category Badge
```javascript
{
  backgroundColor: "#AA0002",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
}

Text: {
  color: "#ffffff",
  fontSize: 11,
  fontWeight: "600",
  textTransform: "uppercase",
}
```

---

## 🎭 Interactive States

### Button States
```
Default:   backgroundColor: "#AA0002"
Active:    opacity: 0.8
Disabled:  opacity: 0.5
Press:     activeOpacity: 0.7
```

### Card States
```
Default:   Normal display
Pressed:   activeOpacity: 0.7
Selected:  borderWidth: 2, borderColor: "#AA0002"
Loading:   opacity: 0.6
```

---

## 📱 Layout Patterns

### Screen Container
```javascript
container: {
  flex: 1,
  backgroundColor: "#f8f8f8",
}

content: {
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 12,
}
```

### Header Pattern
```javascript
header: {
  backgroundColor: "#ffffff",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#e6e6e6",
}

title: {
  fontSize: 20,
  fontWeight: "700",
  color: "#222222",
}
```

### List Item Pattern
```javascript
listItem: {
  backgroundColor: "#ffffff",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#f0f0f0",
}

title: {
  fontSize: 14,
  fontWeight: "600",
  color: "#222222",
  marginBottom: 4,
}

subtitle: {
  fontSize: 12,
  color: "#999999",
}
```

---

## 🎨 Elevation & Shadows

### Shadow Levels

#### Level 1 (Subtle)
```javascript
elevation: 1,
shadowColor: "#000",
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.1,
shadowRadius: 1,
```

#### Level 2 (Medium)
```javascript
elevation: 3,
shadowColor: "#000",
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.15,
shadowRadius: 3,
```

#### Level 3 (Prominent)
```javascript
elevation: 5,
shadowColor: "#000",
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.2,
shadowRadius: 5,
```

---

## 🔄 Animation & Transitions

### Standard Durations
```
Short:   200ms   (hover, quick feedback)
Normal:  300ms   (standard transitions)
Long:    500ms   (page transitions)
```

### Common Animations
```javascript
// Fade in
opacity: Animated.value(0 → 1)
duration: 300

// Slide in
translateX: Animated.value(-100 → 0)
duration: 300

// Scale
scale: Animated.value(0.9 → 1)
duration: 300
```

---

## ♿ Accessibility

### Text Contrast
```
AAA (Large):  3:1 minimum
AAA (Normal): 4.5:1 minimum (body text)
AA (Normal):  4.5:1 (all text)
```

All primary colors meet AAA standards.

### Touch Targets
```
Minimum: 44x44 dp
Recommended: 48x48 dp

hitSlop: {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}
```

### Screen Reader Support
```javascript
accessibilityLabel: "Bookmark article"
accessibilityHint: "Double tap to bookmark"
accessibilityRole: "button"
```

---

## 🖼️ Image Guidelines

### Image Sizes
```
Hero Image:     500w × 280h (16:9 ratio)
Thumbnail:      200px height
Icon:           20-24px
Logo:           48px
```

### Image Optimization
```
Format:    JPEG for photos, PNG for graphics
Quality:   80-85% quality
CDN:       Unsplash for mock, CDN in production
Fallback:  Placeholder image
```

---

## 🎯 Responsive Design

### Breakpoints
```
Mobile:  0 - 599px   (default)
Tablet:  600 - 1199px
Desktop: 1200px+
```

### Safe Area Handling
```javascript
edges={["top", "bottom"]}

// Respects:
// - Notches
// - Safe areas
// - Navigation bars
```

---

## ✅ Component Checklist

When creating new components, ensure:

- [ ] Follows color system
- [ ] Uses spacing scale
- [ ] Proper typography
- [ ] Accessible (contrast, size)
- [ ] Responsive
- [ ] Documented with JSDoc
- [ ] Consistent with existing components
- [ ] Tested on multiple devices
- [ ] No hardcoded colors
- [ ] Uses reusable styles

---

## 🎨 Design Tokens

```javascript
// Usage in components
import { colors, spacing, fontSizes } from '../theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 12,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: "700",
    color: colors.text.primary,
  },
});
```

---

## 📚 References

- Material Design: https://material.io/
- Apple Human Interface: https://developer.apple.com/design/
- Contrast Checker: https://webaim.org/resources/contrastchecker/

---

**This style guide ensures consistency across Nusa Media application.**

*Last Updated: December 8, 2025*
