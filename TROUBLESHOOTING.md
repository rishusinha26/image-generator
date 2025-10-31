# 🔧 Troubleshooting Guide

## Common Issues and Solutions

---

## 🚀 Installation Issues

### ❌ Problem: `npm install` fails
**Symptoms**: Error messages during dependency installation

**Solutions**:
```bash
# Solution 1: Clear npm cache
npm cache clean --force
npm install

# Solution 2: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 3: Use legacy peer deps (if peer dependency conflicts)
npm install --legacy-peer-deps

# Solution 4: Update npm
npm install -g npm@latest
```

### ❌ Problem: Node version incompatibility
**Symptoms**: "Unsupported engine" error

**Solution**:
```bash
# Check your Node version
node --version

# Required: Node.js 16 or higher
# Download from: https://nodejs.org/
```

---

## 🖥️ Development Server Issues

### ❌ Problem: Port 3000 already in use
**Symptoms**: "Port 3000 is already in use"

**Solutions**:
```bash
# Solution 1: Use a different port
npm run dev -- --port 3001

# Solution 2: Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution 3: Change default port in vite.config.js
# Edit: server.port to your preferred port
```

### ❌ Problem: Dev server won't start
**Symptoms**: Server crashes immediately or won't start

**Solutions**:
```bash
# Solution 1: Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Solution 2: Check for syntax errors
# Review recent code changes

# Solution 3: Reinstall dependencies
rm -rf node_modules
npm install
```

### ❌ Problem: Hot reload not working
**Symptoms**: Changes don't reflect in browser

**Solutions**:
1. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Restart dev server
4. Check if file is being watched (not in .gitignore)

---

## 🎨 Styling Issues

### ❌ Problem: Tailwind styles not applying
**Symptoms**: Classes present but no styling

**Solutions**:
```bash
# Solution 1: Restart dev server
# Tailwind needs to rebuild

# Solution 2: Check tailwind.config.js content paths
# Ensure: "./src/**/*.{js,jsx,ts,tsx}" is included

# Solution 3: Verify index.css imports
# Must have: @tailwind base; @tailwind components; @tailwind utilities;

# Solution 4: Clear build cache
rm -rf node_modules/.vite
npm run dev
```

### ❌ Problem: Dark mode not working
**Symptoms**: Theme toggle doesn't change appearance

**Solutions**:
1. Check browser console for errors
2. Verify `darkMode: 'class'` in tailwind.config.js
3. Check if `dark` class is added to `<html>` element
4. Clear localStorage: `localStorage.clear()` in console

### ❌ Problem: Custom fonts not loading
**Symptoms**: Fallback fonts displayed

**Solutions**:
1. Check internet connection (fonts load from Google Fonts)
2. Verify `<link>` tags in index.html
3. Check browser network tab for font loading errors
4. Try hard refresh: `Ctrl + Shift + R`

---

## 🖼️ Image Issues

### ❌ Problem: Images not loading
**Symptoms**: Broken image icons or shimmer effect stuck

**Solutions**:
1. Check internet connection (using Picsum placeholder API)
2. Open browser console for network errors
3. Try different image source in App.jsx
4. Check CORS policy if using custom API

### ❌ Problem: Download not working
**Symptoms**: Download button doesn't trigger download

**Solutions**:
1. Check browser console for errors
2. Verify browser allows downloads
3. Check popup blocker settings
4. Try different browser
5. Ensure CORS headers allow blob downloads

### ❌ Problem: Images load slowly
**Symptoms**: Long shimmer loading time

**Solutions**:
1. Check internet speed
2. Use smaller image sizes (edit URL in App.jsx)
3. Implement image optimization
4. Consider using CDN for production

---

## ⚡ Performance Issues

### ❌ Problem: Slow animations or lag
**Symptoms**: Choppy animations, slow interactions

**Solutions**:
1. Close other browser tabs
2. Check browser DevTools Performance tab
3. Reduce number of images in gallery
4. Disable browser extensions
5. Update graphics drivers

### ❌ Problem: High memory usage
**Symptoms**: Browser becomes slow over time

**Solutions**:
1. Limit number of generated images
2. Clear old images from state
3. Implement pagination
4. Restart browser
5. Close unused tabs

---

## 🎭 Animation Issues

### ❌ Problem: Framer Motion animations not working
**Symptoms**: No animations, instant transitions

**Solutions**:
```bash
# Solution 1: Verify Framer Motion installation
npm list framer-motion

# Solution 2: Reinstall Framer Motion
npm uninstall framer-motion
npm install framer-motion@^10.16.4

# Solution 3: Check for JavaScript errors in console
```

### ❌ Problem: Animations too fast/slow
**Symptoms**: Timing feels off

**Solutions**:
1. Adjust `duration` in motion components
2. Change `transition` type (spring, tween, etc.)
3. Modify `ease` function
4. Check browser performance settings

---

## 🌐 Browser Compatibility

### ❌ Problem: App doesn't work in older browsers
**Symptoms**: White screen, console errors

**Solutions**:
1. Use modern browser (Chrome, Firefox, Safari, Edge)
2. Update browser to latest version
3. Check for JavaScript errors
4. Enable JavaScript in browser settings

### ❌ Problem: Safari-specific issues
**Symptoms**: Works in Chrome but not Safari

**Solutions**:
1. Clear Safari cache
2. Check for `-webkit-` prefix requirements
3. Test in Safari Technology Preview
4. Check console for specific errors

---

## 📱 Mobile Issues

### ❌ Problem: Layout broken on mobile
**Symptoms**: Overlapping elements, horizontal scroll

**Solutions**:
1. Check responsive breakpoints in components
2. Test in browser DevTools mobile view
3. Verify Tailwind responsive classes (sm:, md:, lg:)
4. Check for fixed widths that break layout

### ❌ Problem: Touch interactions not working
**Symptoms**: Buttons don't respond to touch

**Solutions**:
1. Ensure buttons have proper touch targets (min 44x44px)
2. Check for hover-only interactions
3. Test on actual device, not just emulator
4. Verify touch event handlers

---

## 🔌 API Integration Issues (Future)

### ❌ Problem: API calls failing
**Symptoms**: Generation fails, network errors

**Solutions**:
```javascript
// Add error handling in App.jsx
try {
  const response = await fetch(API_URL, options);
  if (!response.ok) throw new Error('API Error');
  // ...
} catch (error) {
  console.error('Generation failed:', error);
  // Show error message to user
}
```

### ❌ Problem: CORS errors
**Symptoms**: "CORS policy" error in console

**Solutions**:
1. Add CORS headers on backend
2. Use proxy in vite.config.js
3. Contact API provider for CORS support
4. Use server-side API calls

### ❌ Problem: API key not working
**Symptoms**: 401 Unauthorized errors

**Solutions**:
1. Verify API key is correct
2. Check .env file format: `VITE_API_KEY=your_key`
3. Restart dev server after adding .env
4. Ensure key has proper permissions
5. Check API usage limits

---

## 🐛 Common Errors

### Error: "Cannot find module"
**Solution**:
```bash
npm install
# or install specific missing module
npm install <module-name>
```

### Error: "Unexpected token"
**Solution**:
1. Check for syntax errors in recent changes
2. Verify JSX syntax is correct
3. Ensure file has .jsx extension
4. Check for missing closing tags

### Error: "Maximum update depth exceeded"
**Solution**:
1. Check for infinite loops in useEffect
2. Verify state updates aren't causing re-renders
3. Add proper dependencies to useEffect

### Error: "localStorage is not defined"
**Solution**:
1. Check if running in SSR context
2. Add null check: `if (typeof window !== 'undefined')`
3. Use try-catch around localStorage calls

---

## 🔍 Debugging Tips

### Enable Detailed Logging
```javascript
// Add to App.jsx for debugging
useEffect(() => {
  console.log('State updated:', { images, isGenerating, theme });
}, [images, isGenerating, theme]);
```

### React DevTools
1. Install React DevTools browser extension
2. Inspect component props and state
3. Track component re-renders
4. Profile performance

### Browser DevTools
1. **Console**: Check for errors and warnings
2. **Network**: Monitor API calls and asset loading
3. **Performance**: Profile animations and interactions
4. **Application**: Check localStorage and cookies

### Vite Debug Mode
```bash
# Run with debug output
DEBUG=vite:* npm run dev
```

---

## 📞 Getting Help

### Before Asking for Help
1. ✅ Check this troubleshooting guide
2. ✅ Read error messages carefully
3. ✅ Check browser console
4. ✅ Search error message online
5. ✅ Review recent code changes

### Information to Provide
- Operating system and version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Browser and version
- Complete error message
- Steps to reproduce
- What you've already tried

### Useful Commands
```bash
# System info
node --version
npm --version

# Check dependencies
npm list

# Verify installation
npm run dev -- --debug

# Clear everything and start fresh
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

---

## 🔄 Reset to Fresh State

### Complete Reset (Nuclear Option)
```bash
# 1. Stop dev server (Ctrl+C)

# 2. Remove all generated files
rm -rf node_modules
rm -rf package-lock.json
rm -rf .vite
rm -rf dist

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall
npm install

# 5. Start fresh
npm run dev
```

### Reset Application State
```javascript
// In browser console
localStorage.clear();
location.reload();
```

---

## ✅ Verification Checklist

After fixing an issue, verify:
- [ ] No console errors
- [ ] All features work
- [ ] Animations smooth
- [ ] Theme toggle works
- [ ] Images load properly
- [ ] Responsive on all sizes
- [ ] No memory leaks
- [ ] Performance acceptable

---

## 🎯 Prevention Tips

1. **Keep dependencies updated**: `npm outdated` and `npm update`
2. **Use version control**: Commit working code frequently
3. **Test in multiple browsers**: Chrome, Firefox, Safari, Edge
4. **Test responsive design**: Use DevTools device emulation
5. **Monitor console**: Check for warnings, not just errors
6. **Clear cache regularly**: Prevent stale file issues
7. **Document changes**: Comment complex logic
8. **Backup working code**: Before major changes

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Still having issues? Double-check the README.md and QUICKSTART.md files!** 🔧
