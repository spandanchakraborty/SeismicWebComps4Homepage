# Quick Start Guide - 15 Minutes to Deployment

## Prerequisites

- ServiceNow instance (Rome or later)
- Admin access
- Node.js installed (v18 or v20)

---

## Step 1: Install CLI (2 minutes)

```bash
# Install ServiceNow CLI
npm install -g @servicenow/cli

# Verify installation
now-cli --version
```

---

## Step 2: Connect to Instance (1 minute)

```bash
# Configure profile
now-cli configure profile set

# Enter when prompted:
# Profile name: dev
# Instance URL: https://YOUR-INSTANCE.service-now.com
# Username: admin
# Password: ********
```

---

## Step 3: Create Project (2 minutes)

```bash
# Create component project (replace 'acme' with your scope)
now-cli project \
  --name @x_acme_app/som-dashboard \
  --scope x_acme_app

# Navigate into project
cd som-dashboard

# Install dependencies
npm install
```

---

## Step 4: Copy Refactored Code (1 minute)

```bash
# Copy the three essential files from this repo
# (Adjust paths based on your directory structure)

# Copy metadata
cp ../servicenow-component/now-ui.json ./now-ui.json

# Copy component logic
cp ../servicenow-component/src/index.js ./src/index.js

# Copy styles
cp ../servicenow-component/src/styles.scss ./src/styles.scss
```

---

## Step 5: Deploy to Instance (2 minutes)

```bash
# Deploy component
now-cli deploy

# Wait for success message:
# ✔ Component deployed successfully
```

---

## Step 6: Add to UI Builder Page (3 minutes)

1. **Open UI Builder**
   - Navigate to **All** → **UI Builder**
   - Click **Pages** → **Create new page**

2. **Add Component**
   - Click **Add Component**
   - Search: "SOM Dashboard"
   - Drag onto canvas

3. **Basic Configuration**
   - Select component
   - In config panel, set:
     - User Name: "Demo User"
     - Show Date: true

---

## Step 7: Add Sample Data (4 minutes)

For quick testing, set JSON properties directly:

### Action Items

In the component config panel:
- Find `actionItems` property
- Click **Use Raw JSON**
- Paste:

```json
[
  {
    "type": "risk",
    "title": "Test Account Risk",
    "description": "This is a sample risk item for testing",
    "actionLabel": "Review Now",
    "accountId": "TEST-001",
    "sysId": "test123"
  },
  {
    "type": "opportunity",
    "title": "Test Opportunity",
    "description": "This is a sample opportunity for testing",
    "actionLabel": "Explore",
    "accountId": "TEST-002",
    "sysId": "test456"
  }
]
```

### Forecast Data

- Find `forecastData` property
- Paste:

```json
[
  {"name": "Closed", "value": 250000, "color": "hsl(140, 60%, 50%)"},
  {"name": "Commit", "value": 100000, "color": "hsl(180, 60%, 45%)"},
  {"name": "Expect", "value": 50000, "color": "hsl(35, 90%, 60%)"},
  {"name": "Upside", "value": 40000, "color": "hsl(265, 60%, 60%)"}
]
```

### Updates

- Find `updates` property
- Paste:

```json
[
  {
    "type": "win",
    "title": "Test Deal Closed!",
    "description": "$50K added to quota",
    "icon": "🎉",
    "sysId": "win-test"
  },
  {
    "type": "news",
    "title": "Test Company Announcement",
    "description": "This is a sample news item for testing purposes",
    "badge": "News",
    "badgeVariant": "default",
    "timestamp": "Updated 1h ago",
    "action": "Read More",
    "sysId": "news-test"
  }
]
```

---

## Step 8: Preview & Test (1 minute)

1. Click **Preview** in UI Builder
2. Verify:
   - ✅ Header shows "Good morning, Demo User!"
   - ✅ Action items display
   - ✅ Chart appears with bars
   - ✅ Updates section shows wins and news
3. Test interactions:
   - Click action item buttons
   - Click chart bars
   - Click feedback buttons

---

## ✅ Success!

You now have a working SOM Dashboard component in your instance!

---

## Next Steps

### Connect Real Data

Replace JSON properties with Data Resources:

1. **Create REST APIs** (see IMPLEMENTATION_GUIDE.md Phase 6)
2. **Create Data Resources** (see IMPLEMENTATION_GUIDE.md Phase 7)
3. **Bind Properties** to Data Resources

### Add Event Handlers

Configure what happens when users interact:

1. Select component → **Events** tab
2. Add handler for `ACTION_ITEM_CLICKED`:
   - Action: Navigate to URL
   - URL: `/nav/ui/classic/params/target/account.do`
3. Add handler for `UPDATE_ACTION_CLICKED`:
   - Action: Show modal
   - Modal: Custom calendar interface

### Customize Appearance

Modify styles to match your branding:

1. Edit `src/styles.scss`
2. Change Horizon Design System tokens
3. Redeploy: `now-cli deploy`

---

## Troubleshooting

### "Command not found: now-cli"

**Solution:**
```bash
# Reinstall CLI
npm install -g @servicenow/cli

# Verify
which now-cli
now-cli --version
```

### "Deployment failed"

**Solution:**
```bash
# Check connection
now-cli configure profile list

# Try re-deploying
now-cli deploy
```

### "Component not in UI Builder"

**Solutions:**
1. Clear browser cache
2. Check component is Active in `sys_ux_macroponent` table
3. Verify correct scope

### "Styles look wrong"

**Solutions:**
1. Check SCSS compilation in deployment logs
2. Verify Horizon tokens are imported
3. Clear browser cache

---

## Quick Reference

### Deploy Command
```bash
now-cli deploy
```

### Local Development
```bash
now-cli develop --open
```

### Update Component
```bash
# Make changes to files
now-cli deploy
```

---

## Sample Data Location

All sample data available in: `sample-data.json`

Copy-paste ready for testing!

---

## Full Documentation

- **Complete Guide:** README.md
- **Step-by-Step:** IMPLEMENTATION_GUIDE.md
- **Architecture:** ARCHITECTURE.md
- **All Docs:** INDEX.md

---

**Estimated Total Time:** 15 minutes  
**Difficulty:** Beginner-friendly  
**Result:** Working dashboard component with sample data

**Need Help?** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#troubleshooting)
