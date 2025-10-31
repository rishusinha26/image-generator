# 🧩 Component Architecture

## Component Tree

```
App.jsx (Main Container)
├── Navbar.jsx
│   ├── Logo + Tagline
│   └── Theme Toggle Button
│
├── Hero Section (in App.jsx)
│   ├── Gradient Title
│   └── Description
│
├── PromptInput.jsx
│   ├── Textarea Input
│   ├── Generate Button
│   ├── History Toggle Button
│   └── Example Prompts
│
├── LoadingAnimation.jsx (conditional)
│   ├── Animated Icon
│   ├── Loading Text
│   ├── Progress Bar
│   └── Shimmer Cards
│
├── HistoryPanel.jsx (conditional)
│   ├── Header
│   ├── Prompt List
│   └── Click to Copy
│
├── ImageGallery.jsx
│   ├── Gallery Header
│   ├── Grid Size Controls
│   └── ImageCard.jsx (multiple)
│       ├── Image with Shimmer Loading
│       ├── Hover Overlay
│       ├── Action Buttons
│       │   ├── Favorite Button
│       │   ├── Download Button
│       │   └── Copy Prompt Button
│       ├── Prompt Text
│       └── Timestamp
│
└── Footer (in App.jsx)
```

---

## 📦 Component Details

### **App.jsx**
**Purpose**: Main application container and state management  
**State**:
- `theme` - Current theme (dark/light)
- `images` - Array of generated images
- `favorites` - Array of favorited images
- `promptHistory` - Recent prompts
- `isGenerating` - Loading state
- `showHistory` - History panel visibility

**Key Functions**:
- `toggleTheme()` - Switch between dark/light mode
- `handleGenerate()` - Simulate image generation
- `toggleFavorite()` - Add/remove favorites
- `handleDownload()` - Download image
- `handleCopyPrompt()` - Copy to clipboard

---

### **Navbar.jsx**
**Props**: `theme`, `toggleTheme`  
**Features**:
- Sticky positioning
- Backdrop blur effect
- Animated logo with gradient
- Smooth theme toggle animation

---

### **PromptInput.jsx**
**Props**: `onGenerate`, `isGenerating`, `onToggleHistory`, `showHistory`  
**Features**:
- Multi-line textarea with character count
- Disabled state during generation
- Example prompt chips
- Gradient border glow effect
- Responsive button layout

---

### **LoadingAnimation.jsx**
**Props**: None  
**Features**:
- Rotating sparkles icon with glow
- Animated progress bar
- Shimmer effect on preview cards
- Pulsing dots animation
- Smooth entrance/exit animations

---

### **HistoryPanel.jsx**
**Props**: `history`, `onUsePrompt`  
**Features**:
- Collapsible panel
- Last 10 prompts display
- Click to copy functionality
- Timestamp formatting
- Empty state message
- Hover effects on items

---

### **ImageGallery.jsx**
**Props**: `images`, `onToggleFavorite`, `onDownload`, `onCopyPrompt`  
**Features**:
- Responsive grid layout
- Grid size toggle (2/3/4 columns)
- Image count display
- Layout animations
- Empty state handling

---

### **ImageCard.jsx**
**Props**: `image`, `onToggleFavorite`, `onDownload`, `onCopyPrompt`  
**Features**:
- Aspect ratio container
- Shimmer loading skeleton
- Hover overlay with gradient
- Three action buttons:
  - Favorite (heart icon, filled when active)
  - Download (download icon)
  - Copy prompt (copy/check icon)
- Prompt text display on hover
- Timestamp formatting
- Favorite badge indicator
- Smooth animations

---

## 🎨 Styling Patterns

### **Color System**
```javascript
Primary: Blue (#0ea5e9)
Secondary: Purple to Pink gradient
Dark Mode: Custom dark palette
Accents: Gradient combinations
```

### **Animation Patterns**
```javascript
// Fade in
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Scale on hover
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Shimmer effect
animate={{ x: ['-100%', '100%'] }}
```

### **Responsive Classes**
```javascript
// Mobile first approach
'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
'text-sm md:text-base lg:text-lg'
'px-4 md:px-6 lg:px-8'
```

---

## 🔄 Data Flow

```
User Input (PromptInput)
    ↓
App.handleGenerate()
    ↓
Update State (isGenerating, images, promptHistory)
    ↓
Render LoadingAnimation (conditional)
    ↓
Simulate API Call (setTimeout)
    ↓
Update images array
    ↓
ImageGallery renders ImageCards
    ↓
User Interactions (favorite, download, copy)
    ↓
Update State via callbacks
```

---

## 🎯 Key Features by Component

| Component | Animations | Interactions | Responsive |
|-----------|-----------|--------------|------------|
| Navbar | ✅ Slide down, rotate | Theme toggle | ✅ |
| PromptInput | ✅ Fade in | Text input, buttons | ✅ |
| LoadingAnimation | ✅ Multiple | None | ✅ |
| HistoryPanel | ✅ Slide, fade | Click to copy | ✅ |
| ImageGallery | ✅ Layout shift | Grid size toggle | ✅ |
| ImageCard | ✅ Hover, scale | 3 action buttons | ✅ |

---

## 🚀 Performance Optimizations

1. **Lazy Loading**: Images load with shimmer effect
2. **Conditional Rendering**: LoadingAnimation and HistoryPanel only when needed
3. **Layout Animations**: Framer Motion's layout prop for smooth transitions
4. **GPU Acceleration**: Transform and opacity animations
5. **Debounced Actions**: Prevent rapid state updates

---

## 🔧 Customization Guide

### Add New Action Button
```jsx
// In ImageCard.jsx, add to action buttons section
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => yourFunction(image.id)}
  className="p-3 rounded-full bg-white/20 backdrop-blur-md"
>
  <YourIcon className="w-5 h-5" />
</motion.button>
```

### Change Grid Layout
```jsx
// In ImageGallery.jsx, modify gridClasses
const gridClasses = {
  small: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5',
  // ...
};
```

### Add New Theme Color
```javascript
// In tailwind.config.js
colors: {
  accent: {
    500: '#your-color',
    // ...
  }
}
```

---

**Component architecture designed for scalability and maintainability** 🎯
