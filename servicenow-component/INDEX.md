# SOM Dashboard Homepage - Component Index

## 📁 File Structure

```
servicenow-component/
├── now-ui.json                    # Component metadata & configuration
├── src/
│   ├── index.js                   # Component logic & rendering
│   └── styles.scss                # SCSS with Horizon Design System
├── README.md                      # Complete user guide
├── IMPLEMENTATION_GUIDE.md        # Step-by-step deployment
├── ARCHITECTURE.md                # Technical architecture docs
├── REFACTORING_SUMMARY.md         # React → ServiceNow transformation
├── sample-data.json               # Example data structures
└── INDEX.md                       # This file
```

---

## 🚀 Quick Start

### For Developers (First Time Setup)

```bash
# 1. Install ServiceNow CLI
npm install -g @servicenow/cli

# 2. Configure your instance
now-cli configure profile set

# 3. Create project
now-cli project --name @your-scope/som-dashboard --scope x_your_scope_app
cd som-dashboard

# 4. Copy refactored files
cp ../servicenow-component/now-ui.json ./
cp ../servicenow-component/src/* ./src/

# 5. Deploy
now-cli deploy
```

**Detailed Instructions:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

### For UI Builder Users

1. Open **UI Builder** in ServiceNow
2. Navigate to your page
3. Click **Add Component**
4. Search for "SOM Dashboard Homepage"
5. Drag onto canvas
6. Configure properties in the right panel
7. Bind data sources
8. Preview and publish

**Complete Configuration:** See [README.md](./README.md)

---

## 📖 Documentation Guide

### New to ServiceNow Components?

**Start Here:**
1. [README.md](./README.md) - Overview and features
2. [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Step-by-step setup
3. [sample-data.json](./sample-data.json) - Example data

### Understanding the Architecture

**Read These:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) - Framework concepts
2. [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Design decisions

### Deploying to Production

**Follow This Order:**
1. [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Phases 1-6
2. [README.md](./README.md) - Configuration section
3. [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Phases 7-9

---

## 🎯 Use Cases by Role

### ServiceNow Admin

**Goal:** Deploy component to instance

**Read:**
- Implementation Guide (Phases 1-5)
- README (Installation section)

**Key Files:**
- `now-ui.json` (component definition)
- `src/index.js` (component code)
- `src/styles.scss` (styles)

### UI Builder Developer

**Goal:** Configure component on pages

**Read:**
- README (Configuration section)
- sample-data.json (data structure)

**Key Concepts:**
- Data Resource binding
- Event handlers
- Properties configuration

### Backend Developer

**Goal:** Create data sources

**Read:**
- Implementation Guide (Phase 6)
- sample-data.json (expected formats)
- README (Data Sources section)

**Key Tasks:**
- Create REST APIs
- Design data schemas
- Implement ACLs

### Front-End Developer

**Goal:** Customize component appearance

**Read:**
- Architecture (Styling section)
- styles.scss (current styles)
- Refactoring Summary (Style examples)

**Key Skills:**
- SCSS
- Horizon Design System tokens
- Responsive design

### QA/Test Engineer

**Goal:** Test component functionality

**Read:**
- Implementation Guide (Phase 8)
- README (Testing section)

**Test Areas:**
- Data binding
- Event dispatching
- Responsive design
- Accessibility

---

## 🔑 Key Concepts

### 1. Properties

**What:** Configurable inputs for the component

**Where Defined:** `now-ui.json` → `properties` array

**How to Use:** Set in UI Builder configuration panel

**Example:**
```json
{
  "name": "userName",
  "label": "User Name",
  "fieldType": "string",
  "defaultValue": "User"
}
```

### 2. Dispatched Actions

**What:** Events the component fires

**Where Defined:** `now-ui.json` → `dispatchedActions` array

**How to Use:** Add event handlers in UI Builder

**Example:**
```json
{
  "name": "ACTION_ITEM_CLICKED",
  "label": "Action Item Clicked",
  "payload": { ... }
}
```

### 3. Data Resources

**What:** Connect component to ServiceNow data

**Where Created:** UI Builder → Data and Includes → Data Resources

**How to Use:** Bind to component properties

**Example:** REST API → Data Resource → Component Property

### 4. Design Tokens

**What:** SASS variables for consistent styling

**Where Used:** `src/styles.scss`

**How to Use:** Replace hardcoded values with tokens

**Example:**
```scss
color: $now-color--primary-2;
padding: $now-spacing--md;
```

---

## 📊 Component Features

### Dashboard Sections

| Section | Description | Data Source |
|---------|-------------|-------------|
| Header | Greeting with user name and date | Static/User context |
| Today's Focus | Action items (risks/opportunities) | REST API |
| Attainment Progress | Quota tracking and forecast chart | REST API |
| Latest Updates | Wins and news feed | REST API |

### Interactive Elements

| Element | Action | Event Dispatched |
|---------|--------|------------------|
| Action Item Button | Primary CTA | `ACTION_ITEM_CLICKED` |
| Thumbs Up | Positive feedback | `FEEDBACK_THUMBS_UP` |
| Thumbs Down | Negative feedback | `FEEDBACK_THUMBS_DOWN` |
| Chart Bar | View details | `CHART_DATA_POINT_CLICKED` |
| Update Action | Schedule call | `UPDATE_ACTION_CLICKED` |

### Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 768px | Single column |
| Tablet | 768px - 1023px | Single column |
| Desktop | ≥ 1024px | Two columns (2:1 ratio) |

---

## 🔧 Configuration Reference

### Required Properties

| Property | Type | Purpose |
|----------|------|---------|
| `actionItems` | json | Action items to display |
| `forecastData` | json | Chart data |
| `updates` | json | Updates feed |

### Optional Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `userName` | string | "User" | Greeting name |
| `quotaAmount` | number | 250000 | Current quota |
| `enableInteractivity` | boolean | true | Enable buttons |

### Full Property List

See [README.md](./README.md#component-properties-reference)

---

## 🔗 Data Integration

### Required REST APIs

#### 1. Action Items

**Endpoint:** `/api/x_scope/som/action_items`  
**Method:** GET  
**Returns:**
```json
[
  {
    "type": "risk",
    "title": "Account Name",
    "description": "Description text",
    "actionLabel": "Button text",
    "accountId": "ACC-001",
    "sysId": "sys_id_value"
  }
]
```

#### 2. Forecast Data

**Endpoint:** `/api/x_scope/som/forecast_data`  
**Method:** GET  
**Returns:**
```json
[
  {
    "name": "Closed",
    "value": 250000,
    "color": "hsl(140, 60%, 50%)"
  }
]
```

#### 3. Updates

**Endpoint:** `/api/x_scope/som/updates`  
**Method:** GET  
**Returns:**
```json
[
  {
    "type": "win",
    "title": "Deal closed",
    "description": "$100K added",
    "icon": "🎉",
    "sysId": "sys_id_value"
  }
]
```

**Complete API Documentation:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#phase-6-data-source-setup-30-minutes)

---

## 🎨 Customization

### Common Customizations

#### Change Primary Color

**File:** `src/styles.scss`

```scss
// Find and replace
$now-color--primary-2  // Default blue
// With
$now-color--info-2     // Different blue
// Or custom color (not recommended)
```

#### Add New Property

1. **Add to `now-ui.json`:**
```json
{
  "name": "myNewProperty",
  "label": "My New Property",
  "fieldType": "string",
  "defaultValue": ""
}
```

2. **Use in `src/index.js`:**
```javascript
<div>{state.properties.myNewProperty}</div>
```

#### Add New Event

1. **Add to `now-ui.json`:**
```json
{
  "name": "MY_NEW_EVENT",
  "label": "My New Event",
  "payload": { ... }
}
```

2. **Dispatch in `src/index.js`:**
```javascript
dispatch('MY_NEW_EVENT', { data: 'value' })
```

---

## 🐛 Troubleshooting

### Component Not Showing in UI Builder

**Possible Causes:**
- Deployment failed
- Wrong scope
- Component not active

**Solutions:**
```bash
# Verify deployment completed successfully
# Check deployment logs

# Re-deploy
now-cli deploy

# Check instance: Navigate to sys_ux_macroponent table
```

### Data Not Loading

**Possible Causes:**
- Data Resource misconfigured
- REST API returning wrong format
- ACL blocking access

**Solutions:**
1. Test REST API directly
2. Check browser console for errors
3. Verify Data Resource binding
4. Check ACL permissions

### Styles Not Applying

**Possible Causes:**
- SCSS compilation error
- CSS specificity conflict
- Horizon tokens not available

**Solutions:**
1. Check deployment logs
2. Verify token imports
3. Inspect element in browser
4. Clear browser cache

**Full Troubleshooting Guide:** See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#troubleshooting)

---

## 📚 Learning Path

### Beginner (New to ServiceNow Components)

**Week 1: Understand the Basics**
- Read README.md overview
- Watch ServiceNow UI Builder tutorials
- Review sample-data.json

**Week 2: Deploy Your First Component**
- Follow IMPLEMENTATION_GUIDE.md phases 1-5
- Deploy to development instance
- Add to test page in UI Builder

**Week 3: Configure and Test**
- Follow IMPLEMENTATION_GUIDE.md phases 6-8
- Create Data Resources
- Test functionality

### Intermediate (Familiar with ServiceNow)

**Day 1: Architecture Deep Dive**
- Read ARCHITECTURE.md
- Understand Now Experience Framework
- Review component code structure

**Day 2: Data Integration**
- Create REST APIs
- Design data schemas
- Implement ACLs

**Day 3: Customization**
- Modify styles.scss
- Add custom properties
- Create new events

### Advanced (ServiceNow Expert)

**Performance Optimization:**
- Review caching strategies
- Implement lazy loading
- Optimize Data Resources

**Advanced Features:**
- Real-time updates
- Complex event handling
- Multi-instance deployment

---

## 🔄 Version History

### v1.0.0 (Current)

**Features:**
- Full dashboard implementation
- Three data sections (Focus, Progress, Updates)
- Five dispatched events
- 17 configurable properties
- Responsive design
- Accessibility compliant
- Dark mode support

**Known Issues:**
- Chart requires manual data formatting
- No built-in pagination for large datasets

**Next Release (v1.1.0):**
- Automatic data pagination
- Enhanced chart interactions
- Performance improvements

---

## 📞 Support

### Documentation

- **Getting Started:** README.md
- **Implementation:** IMPLEMENTATION_GUIDE.md
- **Architecture:** ARCHITECTURE.md
- **Refactoring Details:** REFACTORING_SUMMARY.md

### Resources

- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [UI Builder Documentation](https://docs.servicenow.com/ui-builder)
- [Horizon Design System](https://developer.servicenow.com/horizon-design-system)
- [ServiceNow Community](https://community.servicenow.com)

### Getting Help

1. **Check documentation** in this directory
2. **Search ServiceNow Community** forums
3. **Contact your ServiceNow team**
4. **Open a ticket** with ServiceNow Support

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] All documentation reviewed
- [ ] Component tested in dev instance
- [ ] Data Resources created and tested
- [ ] REST APIs secured with ACLs
- [ ] Event handlers configured
- [ ] Responsive design verified
- [ ] Accessibility audit passed
- [ ] Performance testing completed
- [ ] User acceptance testing done
- [ ] Update Set created
- [ ] Rollback plan prepared

---

## 📄 License & Attribution

**Component:** SOM Dashboard Homepage  
**Version:** 1.0.0  
**Platform:** ServiceNow (Rome+)  
**Framework:** Now Experience UI Framework  
**Design System:** Horizon  

**Original Design:** Figma → Loveable (React)  
**Refactored For:** ServiceNow UI Builder  
**Refactoring Date:** 2025-Q1  

---

## 🎓 Additional Learning

### ServiceNow Learning Paths

1. **Now Experience Framework Fundamentals**
2. **UI Builder Essentials**
3. **Horizon Design System**
4. **REST API Integration**

### Recommended Reading

- Web Components Specification
- Accessibility (WCAG 2.1)
- Responsive Web Design
- ServiceNow Best Practices

---

**Document Version:** 1.0  
**Last Updated:** 2025-Q1  
**Maintained By:** ServiceNow Development Team
