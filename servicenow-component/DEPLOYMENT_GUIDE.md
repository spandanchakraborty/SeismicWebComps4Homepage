# ServiceNow Component Deployment Guide
## SOM Dashboard Homepage - Complete Setup Instructions

This guide walks you through deploying the SOM Dashboard Homepage component to your ServiceNow instance using the **Next Experience UI Framework (Seismic)**.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **ServiceNow Instance** (Rome release or later)
- [ ] **Admin or appropriate permissions** to deploy components
- [ ] **Node.js v18 or v20** installed (use nvm to manage versions)
- [ ] **ServiceNow CLI** installed globally
- [ ] **UI Builder** enabled on your instance
- [ ] **Git** installed (optional, for version control)

---

## 🚀 Quick Start (5 Steps)

### Step 1: Install ServiceNow CLI

```bash
# Install globally
npm install -g @servicenow/cli

# Verify installation
now-cli --version
```

### Step 2: Configure Your Instance Connection

Create `now-cli.json` from the template:

```bash
cd /Users/spandan.chakraborty/Documents/SpanCodes/SOM_XD_AE_HomePage_Design/servicenow-component

# Copy the template
cp now-cli.json.template now-cli.json

# Edit with your instance details
# Update: hostname, username, password
```

**Example `now-cli.json`:**
```json
{
  "scope": "x_som_demo",
  "profile": "default",
  "host": {
    "protocol": "https",
    "hostname": "dev12345.service-now.com",
    "username": "admin",
    "password": "your_secure_password"
  },
  "proxy": {
    "source": "dev12345.service-now.com"
  }
}
```

⚠️ **Security Note:** `now-cli.json` is gitignored to protect credentials.

### Step 3: Install Dependencies (Optional)

```bash
# Install node dependencies (optional for deployment)
npm install
```

### Step 4: Test Locally (Recommended)

```bash
# Ensure you're using Node v20
source ~/.nvm/nvm.sh && nvm use 20

# Start local development server
now-cli develop --open
```

This opens the component at `http://localhost:8081` for testing.

### Step 5: Deploy to ServiceNow

```bash
# Deploy to your instance
now-cli deploy
```

The component will now appear in UI Builder's component palette!

---

## 📁 File Structure Verification

Ensure all these files exist in your `servicenow-component/` folder:

```
servicenow-component/
├── src/
│   ├── index.js                   ✅ Component logic
│   └── styles.scss                ✅ Component styles
├── now-ui.json                    ✅ Component metadata
├── package.json                   ✅ Node.js project file
├── .gitignore                     ✅ Git ignore rules
├── now-cli.json.template          ✅ Config template
├── README.md                      ✅ User documentation
├── ARCHITECTURE.md                ✅ Technical architecture
├── IMPLEMENTATION_GUIDE.md        ✅ Detailed setup guide
├── REFACTORING_SUMMARY.md         ✅ Design decisions
├── QUICKSTART.md                  ✅ Quick reference
├── INDEX.md                       ✅ Documentation index
├── sample-data.json               ✅ Example data
└── DEPLOYMENT_GUIDE.md            ✅ This file
```

---

## 🔧 Configuration in UI Builder

After successful deployment:

### 1. Add Component to Page

1. Open **UI Builder** in ServiceNow
2. Create or edit a page
3. Find **"SOM Dashboard Homepage"** in the component list
4. Drag it onto the canvas

### 2. Configure Properties

In the right panel, set:

- **userName**: User's display name
- **greetingMessage**: "Good morning" / "Hello"
- **showDate**: true/false
- **quotaAmount**: 250000
- **forecastAmount**: 546000

### 3. Connect Data Sources

Create three Data Resources:

#### Action Items Data Resource
- **Type**: REST API
- **Endpoint**: `/api/x_som_demo/som/action_items`
- **Bind to**: `actionItems` property

#### Forecast Data Resource
- **Type**: REST API
- **Endpoint**: `/api/x_som_demo/som/forecast_data`
- **Bind to**: `forecastData` property

#### Updates Data Resource
- **Type**: REST API
- **Endpoint**: `/api/x_som_demo/som/updates`
- **Bind to**: `updates` property

**See `sample-data.json` for expected data formats.**

---

## 🎯 Testing Checklist

After deployment, verify:

- [ ] Component appears in UI Builder component palette
- [ ] Component can be added to a page
- [ ] Properties panel shows all configurable options
- [ ] Static data (userName, greeting) displays correctly
- [ ] Data Resources bind successfully
- [ ] Action buttons dispatch events
- [ ] Responsive design works on mobile
- [ ] Dark mode displays correctly
- [ ] Console shows no errors

---

## 🐛 Troubleshooting

### Component Not Showing in Palette

**Issue**: Component doesn't appear in UI Builder.

**Solution**:
```bash
# Verify deployment succeeded
# Check for errors in terminal

# Re-deploy
now-cli deploy

# Check in ServiceNow:
# Navigate to: sys_ux_macroponent.list
# Search for: "SOM Dashboard Homepage"
```

### Authentication Failed

**Issue**: CLI can't connect to instance.

**Solution**:
- Verify credentials in `now-cli.json`
- Ensure user has admin/component developer role
- Check instance URL (no `/` at end)
- Try basic auth format: `username:password`

### Build Errors

**Issue**: Deployment fails with build errors.

**Solution**:
```bash
# Check Node version
node --version  # Should be v18 or v20

# Use nvm to switch
nvm use 20

# Clear CLI cache
rm -rf .now-cli

# Try again
now-cli deploy
```

### Data Not Loading

**Issue**: Component shows but data doesn't display.

**Solution**:
1. Test REST API directly in browser
2. Check Data Resource configuration
3. Verify ACL permissions
4. Check browser console for errors

---

## 📚 Next Steps

1. **Create REST APIs** - See `IMPLEMENTATION_GUIDE.md` Phase 6
2. **Configure Event Handlers** - See `README.md` Event Handling section
3. **Customize Styles** - See `ARCHITECTURE.md` Styling section
4. **Test Accessibility** - See `IMPLEMENTATION_GUIDE.md` Phase 8

---

## 🔗 Documentation Quick Links

- **Getting Started**: `README.md`
- **Detailed Setup**: `IMPLEMENTATION_GUIDE.md`
- **Technical Details**: `ARCHITECTURE.md`
- **Data Examples**: `sample-data.json`
- **Quick Reference**: `QUICKSTART.md`

---

## 🎓 Learning Resources

- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [UI Builder Documentation](https://docs.servicenow.com/ui-builder)
- [Now Experience Framework](https://developer.servicenow.com/dev.do#!/reference/now-experience/latest)
- [Horizon Design System](https://developer.servicenow.com/horizon-design-system)

---

## ✅ Production Deployment

Before deploying to production:

1. **Test in DEV** - Fully test all functionality
2. **Create Update Set** - Capture component in update set
3. **Test in QA** - Verify in QA environment
4. **Document Changes** - Update organization's change log
5. **Deploy to PROD** - Follow change management process
6. **Monitor** - Check logs and user feedback

---

## 📞 Support

For issues:
1. Check this documentation
2. Review ServiceNow Community forums
3. Contact your ServiceNow administrator
4. Open a ticket with ServiceNow Support

---

**Last Updated**: 2025-11-02  
**Version**: 1.0.0  
**Framework**: ServiceNow Next Experience (Seismic)
