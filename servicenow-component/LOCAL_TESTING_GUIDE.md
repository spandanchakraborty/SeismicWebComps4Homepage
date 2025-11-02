# Local Testing Guide - ServiceNow Components
## Test Your Component Before Deployment

Yes! You can **fully test ServiceNow web components locally** before deploying to your instance using the ServiceNow CLI development server.

---

## 🎯 Quick Start - Local Testing

### Basic Local Testing (No Instance Connection)

```bash
# Navigate to component folder
cd /Users/spandan.chakraborty/Documents/SpanCodes/SOM_XD_AE_HomePage_Design/servicenow-component

# Ensure you're using Node v20
nvm use 20

# Start local development server
now-cli develop --open
```

**What happens:**
- Opens browser at `http://localhost:8081`
- Component renders with default/mock data
- Hot reload on file changes
- No ServiceNow instance needed

---

## 🔧 Testing Modes

### Mode 1: Standalone Testing (Recommended for UI/UX)

**Use Case:** Test layout, styles, interactions without backend

```bash
now-cli develop --open
```

**Features:**
- ✅ Fast development cycle
- ✅ No instance credentials needed
- ✅ Test with sample data (from `sample-data.json`)
- ✅ Hot module reload
- ✅ Browser DevTools available

**Limitations:**
- ❌ No real ServiceNow data
- ❌ No platform APIs
- ❌ No ACL validation

### Mode 2: Connected Testing (Proxy Mode)

**Use Case:** Test with live data from ServiceNow instance

**Step 1: Configure proxy in `now-cli.json`**

```json
{
  "scope": "x_som_demo",
  "profile": "default",
  "host": {
    "protocol": "https",
    "hostname": "dev12345.service-now.com",
    "username": "admin",
    "password": "your_password"
  },
  "proxy": {
    "source": "dev12345.service-now.com"
  }
}
```

**Step 2: Start with proxy**

```bash
now-cli develop --open
```

**Features:**
- ✅ Real ServiceNow data
- ✅ Test REST API integration
- ✅ Test with actual user permissions
- ✅ Test Data Resources
- ✅ Validate data formats

---

## 📝 Local Testing Workflow

### 1. Start Development Server

```bash
# Terminal 1
cd servicenow-component
nvm use 20
now-cli develop --open
```

**Output:**
```
Starting development server...
Component server: http://localhost:8081
Hot reload enabled
Press Ctrl+C to stop
```

### 2. Browser Opens Automatically

**URL:** `http://localhost:8081`

**What You'll See:**
- Component rendered in isolation
- Property panel (right side) to test different configurations
- Browser console for debugging
- Live updates when you save files

### 3. Test Component Properties

In the browser UI:
1. **Property Panel** - Change values on the right
2. **userName** - Try different names
3. **quotaAmount** - Test different numbers
4. **actionItems** - Paste JSON from `sample-data.json`
5. See changes instantly

### 4. Test with Sample Data

**Copy data from `sample-data.json`:**

```bash
# View sample data
cat sample-data.json
```

**Paste into property fields in the browser UI**

---

## 🧪 What Can You Test Locally?

### ✅ Fully Testable

| Feature | Local Test | Notes |
|---------|------------|-------|
| **Component Rendering** | ✅ Yes | Full visual testing |
| **Properties** | ✅ Yes | Test all 17 properties |
| **Styling** | ✅ Yes | CSS, responsive design |
| **Interactions** | ✅ Yes | Buttons, clicks, hover |
| **Event Dispatching** | ✅ Yes | See console logs |
| **Responsive Design** | ✅ Yes | Resize browser window |
| **Dark Mode** | ✅ Yes | Toggle in browser |
| **Mock Data** | ✅ Yes | Use sample-data.json |

### ⚠️ Requires Proxy Mode

| Feature | Needs Proxy | Notes |
|---------|-------------|-------|
| **Live Data** | ⚠️ Yes | Real REST APIs |
| **Data Resources** | ⚠️ Yes | ServiceNow queries |
| **ACL Validation** | ⚠️ Yes | Permission testing |
| **Platform APIs** | ⚠️ Yes | GlideRecord, etc. |

### ❌ Only in ServiceNow

| Feature | Test Location | Notes |
|---------|---------------|-------|
| **UI Builder Integration** | ❌ Instance only | Page context |
| **Update Sets** | ❌ Instance only | Deployment tracking |
| **Production Performance** | ❌ Instance only | Real load testing |

---

## 🔄 Development Workflow

### Rapid Development Cycle

```bash
# 1. Start dev server (once)
now-cli develop --open

# 2. Edit files
# Edit src/index.js or src/styles.scss

# 3. Save file
# Component auto-reloads in browser

# 4. Test changes immediately
# No build step needed!

# 5. Iterate quickly
# Repeat steps 2-4
```

**Average cycle time:** 2-3 seconds (edit → save → see changes)

---

## 🛠️ Advanced Local Testing

### Testing with Custom Mock Data

**Create `local-test-data.json`:**

```json
{
  "actionItems": [
    {
      "type": "risk",
      "title": "Test Company A",
      "description": "Testing risk scenario",
      "actionLabel": "Test Action",
      "accountId": "TEST-001",
      "sysId": "test-sys-id-001"
    }
  ],
  "forecastData": [
    {
      "name": "Closed",
      "value": 100000,
      "color": "hsl(140, 60%, 50%)"
    }
  ],
  "updates": [
    {
      "type": "win",
      "title": "Test Win",
      "description": "$10K test",
      "icon": "🎉",
      "sysId": "test-win-001"
    }
  ]
}
```

**Paste values into property panel in browser**

### Testing Responsive Design

**In browser:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select device:
   - iPhone SE (375px) - Mobile
   - iPad (768px) - Tablet
   - Desktop (1024px+) - Desktop

**Or manually resize browser window**

### Testing Dark Mode

**In browser:**
1. Open DevTools
2. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
3. Type "dark" → "Emulate CSS prefers-color-scheme: dark"
4. Component should adapt automatically (Horizon tokens)

### Testing Events

**Check browser console for dispatched events:**

```javascript
// When you click a button, you'll see:
[Component Event] ACTION_ITEM_CLICKED
{
  actionType: "risk",
  accountId: "ACC-001",
  title: "TechStart Inc",
  sysId: "12345..."
}
```

---

## 📊 Local Testing Checklist

Before deploying to ServiceNow, verify locally:

### Visual Testing
- [ ] Component renders without errors
- [ ] All sections display correctly (header, focus, progress, updates)
- [ ] Styles applied correctly
- [ ] Colors use Horizon Design System tokens
- [ ] Spacing and layout correct

### Property Testing
- [ ] All 17 properties work when changed
- [ ] Default values display correctly
- [ ] Boolean properties toggle correctly
- [ ] JSON properties parse correctly
- [ ] String properties display correctly

### Responsive Testing
- [ ] Mobile view (< 768px) - single column
- [ ] Tablet view (768px - 1023px) - single column
- [ ] Desktop view (≥ 1024px) - two columns

### Interaction Testing
- [ ] Buttons are clickable
- [ ] Hover states work
- [ ] Focus indicators visible (keyboard navigation)
- [ ] Events dispatch to console

### Data Testing
- [ ] Component handles empty data gracefully
- [ ] Sample data renders correctly
- [ ] Large datasets don't break layout
- [ ] Missing data shows appropriate fallbacks

### Dark Mode Testing
- [ ] Dark mode renders correctly
- [ ] Text remains readable
- [ ] Colors adapt automatically

---

## 🚀 Performance Testing Locally

### Monitor Performance

**Open browser DevTools → Performance tab:**

1. Start recording
2. Interact with component
3. Stop recording
4. Analyze:
   - Render time
   - JavaScript execution
   - Layout shifts
   - Memory usage

**Target metrics:**
- Initial render: < 100ms
- Re-render: < 16ms (60 FPS)
- Memory: < 10MB

---

## 🐛 Debugging Tips

### Console Logging

**Add to `src/index.js` for debugging:**

```javascript
const view = (state, { updateState, dispatch }) => {
  // Debug properties
  console.log('Current properties:', state.properties);
  
  // Debug parsed data
  const actionItems = JSON.parse(state.properties.actionItems || '[]');
  console.log('Action items:', actionItems);
  
  // Your view code...
};
```

### Hot Reload Issues

**If changes don't appear:**

```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .now-cli

# Restart
now-cli develop --open
```

### Port Already in Use

**If port 8081 is busy:**

```bash
# Find process using port 8081
lsof -ti:8081

# Kill process
kill -9 $(lsof -ti:8081)

# Restart dev server
now-cli develop --open
```

---

## 📝 Example: Full Local Testing Session

```bash
# 1. Prepare environment
cd servicenow-component
nvm use 20

# 2. Start dev server
now-cli develop --open
# Browser opens at http://localhost:8081

# 3. Test with sample data
# In browser property panel:
# - Paste actionItems from sample-data.json
# - Paste forecastData from sample-data.json
# - Paste updates from sample-data.json

# 4. Test responsive design
# Resize browser window
# Check mobile (375px), tablet (768px), desktop (1024px+)

# 5. Test interactions
# Click action buttons
# Check console for events

# 6. Test dark mode
# DevTools → Toggle dark mode
# Verify component adapts

# 7. Make changes
# Edit src/styles.scss
# Save file
# See changes instantly in browser

# 8. When satisfied, deploy
# Ctrl+C to stop dev server
now-cli deploy
```

---

## 🔗 VS Code Integration

### Recommended Extensions

1. **Now Experience CLI Extension** (if available)
2. **Live Server** - For additional testing
3. **Browser Preview** - Test in VS Code

### VS Code Tasks

**Create `.vscode/tasks.json`:**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ServiceNow: Start Dev Server",
      "type": "shell",
      "command": "now-cli develop --open",
      "problemMatcher": [],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

**Run with:** Cmd+Shift+B (Mac) or Ctrl+Shift+B (Windows)

---

## 🎓 Best Practices

### 1. Always Test Locally First
- Faster iteration
- No instance downtime risk
- Catch errors early

### 2. Use Sample Data
- Keep `sample-data.json` updated
- Test edge cases (empty data, large datasets)
- Validate data formats

### 3. Test All Properties
- Change each property individually
- Test combinations
- Test extreme values

### 4. Test Responsive Design
- Don't just test desktop
- Check all breakpoints
- Test actual devices when possible

### 5. Monitor Console
- Watch for errors
- Verify event dispatching
- Check for warnings

---

## 🆚 Local vs. Instance Testing

| Aspect | Local Testing | Instance Testing |
|--------|---------------|------------------|
| **Speed** | ⚡ Instant | 🐢 Slower (deploy time) |
| **Setup** | ✅ Quick | ⚠️ Requires instance |
| **Data** | 📝 Mock/Sample | 🔄 Real data |
| **Cost** | 💰 Free | 💰 Instance usage |
| **Risk** | ✅ Zero | ⚠️ Can affect users |
| **UI Builder** | ❌ Not available | ✅ Full integration |

**Recommendation:** Test locally first, then validate on instance

---

## 📞 Troubleshooting Local Testing

### Dev Server Won't Start

**Error:** `Command not found: now-cli`

**Solution:**
```bash
npm install -g @servicenow/cli
```

### Component Not Rendering

**Check:**
1. Node version: `node --version` (should be v18 or v20)
2. Console for errors (F12)
3. File syntax errors in `src/index.js`

### Hot Reload Not Working

**Solution:**
```bash
# Clear CLI cache
rm -rf .now-cli

# Restart
now-cli develop --open
```

### Cannot Parse JSON Properties

**Check:**
- JSON format in property panel
- Use sample-data.json as reference
- Validate JSON at jsonlint.com

---

## ✅ Summary

**Yes, you can fully test ServiceNow web components locally!**

**Quick Command:**
```bash
now-cli develop --open
```

**Benefits:**
- ✅ Fast development cycle (2-3 second iterations)
- ✅ No instance needed for UI testing
- ✅ Hot reload on file changes
- ✅ Test with mock data
- ✅ Debug in browser DevTools
- ✅ Test responsive design
- ✅ Validate before deployment

**When to deploy to instance:**
- After local testing passes
- Need to test Data Resources
- Need UI Builder integration
- Ready for user acceptance testing

---

**Local testing makes development 10x faster!** 🚀

**Last Updated**: 2025-11-02  
**CLI Version**: now-cli@latest
