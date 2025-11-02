# SOM Dashboard Homepage - ServiceNow UI Builder Component

## Overview

The **SOM (Sales Operations Management) Dashboard Homepage** is a production-ready ServiceNow UI Builder component designed to provide sales teams with actionable insights, performance tracking, and real-time updates. This component was refactored from a Figma design to align with the ServiceNow Now Experience UI Framework (Seismic) architecture.

### Key Features

- 📊 **Attainment Progress Tracking** - Visual quota and forecast monitoring with interactive charts
- 🎯 **Today's Focus** - Prioritized action items highlighting risks and opportunities
- 📰 **Latest Updates** - Real-time wins and news feeds
- 🎨 **Horizon Design System** - Full integration with ServiceNow theming and dark mode
- ♿ **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation
- 📱 **Responsive Design** - Mobile-first approach for all device sizes
- 🔌 **Data-Driven** - Powered by ServiceNow Data Resources and REST APIs

---

## Architecture

This component follows the Now Experience UI Framework standards:

```
servicenow-component/
├── now-ui.json          # Component metadata and public API
├── src/
│   ├── index.js         # Component logic and view function
│   └── styles.scss      # Styles using Horizon Design System tokens
└── README.md            # This file
```

### Framework Concepts

- **Properties**: Configurable inputs visible in UI Builder
- **Dispatched Actions**: Events fired by the component for page-level handling
- **Design Tokens**: SASS variables from Horizon Design System for consistent theming
- **Unidirectional Data Flow**: Data flows from properties → state → view

---

## Prerequisites

Before deploying this component, ensure you have:

1. **ServiceNow Instance** (Rome release or later recommended)
2. **ServiceNow CLI** installed globally
3. **Node.js** (v18 or v20 via nvm)
4. **UI Builder** access on your instance
5. **Admin or appropriate permissions** to deploy components

---

## Installation & Deployment

### Step 1: Set Up ServiceNow CLI (One-Time Setup)

```bash
# Install ServiceNow CLI globally
npm install @servicenow/cli -g

# Configure your instance connection
now-cli configure profile set
# Follow prompts to enter instance URL, username, and password
```

### Step 2: Create Component Project

```bash
# Navigate to your development directory
cd ~/development

# Create a new component project
now-cli project --name @your-scope/som-dashboard-homepage --scope x_your_scope_app

# Navigate into the project
cd som-dashboard-homepage

# Install dependencies
npm install
```

### Step 3: Integrate the Refactored Code

Replace the scaffolded files with the refactored ServiceNow code:

1. **Replace `now-ui.json`** with the provided file
2. **Replace `src/index.js`** with the provided file
3. **Replace `src/styles.scss`** with the provided file

### Step 4: Local Development & Testing

```bash
# Start local development server
now-cli develop --open
```

This opens the component in your browser for rapid testing. To test with live data from your instance, configure the proxy in `now-cli.json`:

```json
{
  "proxy": {
    "source": "your-instance.service-now.com"
  }
}
```

### Step 5: Deploy to ServiceNow Instance

```bash
# Build and deploy the component
now-cli deploy
```

The component will now appear in UI Builder's component palette.

---

## Configuration in UI Builder

### Adding the Component to a Page

1. Open **UI Builder** in your ServiceNow instance
2. Create or edit a page
3. Find **SOM Dashboard Homepage** in the component list
4. Drag it onto the canvas

### Connecting Data Sources

The component requires three main data sources, which you'll connect via **Data Resources**:

#### 1. Action Items Data

Create a **Scripted REST API** or **Data Resource** that returns:

```json
[
  {
    "type": "risk",
    "title": "TechStart Inc",
    "description": "Account risk is high with a 25% drop in usage over the last month.",
    "actionLabel": "Add Mitigation Plan",
    "accountId": "ACC-001",
    "sysId": "12345678-1234-1234-1234-123456789012"
  },
  {
    "type": "opportunity",
    "title": "Intuit - upsell potential",
    "description": "Usage is up 34% this quarter with two license requests.",
    "actionLabel": "Yes, work on it",
    "accountId": "ACC-002",
    "sysId": "87654321-4321-4321-4321-210987654321"
  }
]
```

**Binding in UI Builder:**
- Select the component
- In the Config panel, find `actionItems` property
- Click the data binding icon
- Select your Data Resource → `actionItems`

#### 2. Forecast Distribution Data

Create a Data Resource that returns:

```json
[
  { "name": "Closed", "value": 250000, "color": "hsl(140, 60%, 50%)" },
  { "name": "Commit", "value": 100000, "color": "hsl(180, 60%, 45%)" },
  { "name": "Expect", "value": 50000, "color": "hsl(35, 90%, 60%)" },
  { "name": "Upside", "value": 4000, "color": "hsl(265, 60%, 60%)" },
  { "name": "Total", "value": 404000, "color": "hsl(180, 55%, 50%)" }
]
```

**Binding in UI Builder:**
- Connect to `forecastData` property

#### 3. Latest Updates Data

Create a Data Resource that returns:

```json
[
  {
    "type": "win",
    "title": "Innovation Lab contract signed",
    "description": "$65K to your quota!",
    "icon": "🎉",
    "sysId": "win-001"
  },
  {
    "type": "news",
    "title": "Techstart raises $50M Series B",
    "description": "The funds helped expand its compliance software...",
    "badge": "Funding",
    "badgeVariant": "default",
    "timestamp": "Updated 2h ago",
    "action": "Schedule a call with CTO",
    "sysId": "news-001"
  }
]
```

**Binding in UI Builder:**
- Connect to `updates` property

### Example Scripted REST API

Create a **Scripted REST API** in ServiceNow:

**Resource Path:** `/som/action_items`

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    
    var actionItems = [];
    
    // Query for high-risk accounts
    var grRisk = new GlideRecord('x_your_scope_app_account_risk');
    grRisk.addQuery('risk_level', 'high');
    grRisk.orderBy('created');
    grRisk.setLimit(10);
    grRisk.query();
    
    while (grRisk.next()) {
        actionItems.push({
            type: 'risk',
            title: grRisk.getValue('account_name'),
            description: grRisk.getValue('risk_description'),
            actionLabel: 'Add Mitigation Plan',
            accountId: grRisk.getValue('account_id'),
            sysId: grRisk.getValue('sys_id')
        });
    }
    
    // Query for opportunities
    var grOpp = new GlideRecord('x_your_scope_app_opportunity');
    grOpp.addQuery('status', 'identified');
    grOpp.orderBy('potential_value');
    grOpp.setLimit(10);
    grOpp.query();
    
    while (grOpp.next()) {
        actionItems.push({
            type: 'opportunity',
            title: grOpp.getValue('account_name'),
            description: grOpp.getValue('opportunity_description'),
            actionLabel: 'Yes, work on it',
            accountId: grOpp.getValue('account_id'),
            sysId: grOpp.getValue('sys_id')
        });
    }
    
    return actionItems;
    
})(request, response);
```

---

## Event Handling

The component dispatches events that you can handle at the page level:

### 1. ACTION_ITEM_CLICKED

Fired when a user clicks an action item button.

**Payload:**
```javascript
{
  actionType: "risk" | "opportunity",
  accountId: "ACC-001",
  title: "TechStart Inc",
  sysId: "12345..."
}
```

**Example Handler:**
- Open a modal with detailed information
- Navigate to an account record page
- Trigger a workflow

### 2. FEEDBACK_THUMBS_UP / FEEDBACK_THUMBS_DOWN

Fired when a user provides feedback on an action item.

**Payload:**
```javascript
{
  actionItemId: "item-001",
  title: "TechStart Inc"
}
```

**Example Handler:**
- Log feedback to analytics table
- Update AI recommendation scores

### 3. UPDATE_ACTION_CLICKED

Fired when a user clicks an action button in the updates section.

**Payload:**
```javascript
{
  updateType: "news",
  title: "Techstart raises $50M",
  action: "Schedule a call with CTO",
  sysId: "news-001"
}
```

**Example Handler:**
- Open calendar modal
- Create a task record

### 4. CHART_DATA_POINT_CLICKED

Fired when a user clicks a bar in the forecast chart.

**Payload:**
```javascript
{
  stageName: "Closed",
  value: 250000
}
```

**Example Handler:**
- Navigate to filtered opportunity list
- Open drill-down modal

---

## Component Properties Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `userName` | string | "User" | Name displayed in greeting |
| `greetingMessage` | string | "Good morning" | Greeting prefix text |
| `showDate` | boolean | true | Display current date |
| `focusTitle` | string | "Today's focus" | Focus section title |
| `focusDescription` | string | "Prioritize..." | Focus section description |
| `actionItems` | json | [] | Array of action items |
| `suggestedActionsCount` | number | 0 | Badge count for suggested actions |
| `showOverdueBadge` | boolean | false | Show overdue badge |
| `quotaAmount` | number | 250000 | Current quota |
| `forecastAmount` | number | 546000 | Total forecast |
| `weightedPipeline` | string | "1.67%" | Pipeline percentage |
| `pipelineCoverage` | string | "0.35x" | Coverage multiplier |
| `currentQuarter` | string | "2025 Q3" | Quarter label |
| `forecastData` | json | [] | Chart data array |
| `updates` | json | [] | Updates array |
| `enableInteractivity` | boolean | true | Enable buttons/interactions |

---

## Testing & Debugging

### Using Next Experience Developer Tools

1. Install the **Next Experience Developer Tools** Chrome extension
2. Open your page in preview mode
3. Inspect component properties, state, and dispatched actions in real-time

### Testing Checklist

- [ ] Component loads without errors
- [ ] All data bindings display correctly
- [ ] Click handlers fire dispatched actions
- [ ] Responsive layout works on mobile
- [ ] Dark mode displays correctly
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

### Common Issues

**Issue:** Component not appearing in palette  
**Solution:** Ensure deployment completed successfully. Check instance logs.

**Issue:** Data not displaying  
**Solution:** Verify Data Resource is returning correct JSON format. Check browser console for errors.

**Issue:** Styles look incorrect  
**Solution:** Ensure Horizon Design System tokens are available. Check for SCSS compilation errors.

---

## Design System Integration

This component uses **ServiceNow Horizon Design System** tokens exclusively:

### Colors
- `$now-color--primary-2` - Primary actions
- `$now-color--neutral-X` - Text and backgrounds (0-19 scale)
- `$now-color--critical-2` - Destructive actions
- `$now-color--success-2` - Success indicators

### Typography
- `$now-font-size--xs` to `$now-font-size--4xl`
- `$now-font-weight--normal`, `--medium`, `--semibold`, `--bold`
- `$now-line-height--tight`, `--normal`, `--relaxed`

### Spacing
- `$now-spacing--xs` to `$now-spacing--2xl`

### Elevation
- `$now-elevation--raised`
- `$now-elevation--overlay`

**Benefits:**
- Automatic dark mode support
- Consistent with platform UI
- Theme-aware (respects user preferences)
- Accessible contrast ratios

---

## Best Practices

### Performance
- Keep action items array under 20 items
- Use pagination for large datasets
- Lazy-load chart data if performance is critical

### Accessibility
- All interactive elements have keyboard support
- Proper ARIA labels included
- Focus indicators visible
- Color contrast meets WCAG AA

### Data Management
- Cache API responses when possible
- Implement error handling in Data Resources
- Use server-side filtering for large datasets

### Maintenance
- Version control your component code
- Document custom modifications
- Test after platform upgrades

---

## Customization Guide

### Changing Colors

Edit `src/styles.scss` and adjust Horizon tokens:

```scss
.som-badge-default {
  background-color: $now-color--info-2; // Change to different token
  color: $now-color--neutral-0;
}
```

### Adding New Properties

1. Add to `now-ui.json` properties array
2. Add default in `src/index.js` createCustomElement
3. Reference as `state.properties.yourNewProperty` in view

### Custom Actions

Add to `now-ui.json` dispatchedActions array and use `dispatch()` in view:

```javascript
dispatch('YOUR_NEW_ACTION', { customPayload: 'data' })
```

---

## Support & Resources

### ServiceNow Documentation
- [Now Experience UI Framework](https://developer.servicenow.com/dev.do#!/reference/now-experience/latest)
- [UI Builder Guide](https://docs.servicenow.com/bundle/vancouver-build-workflows/page/administer/ui-builder/concept/ui-builder-overview.html)
- [Horizon Design System](https://developer.servicenow.com/horizon-design-system)

### Community
- [ServiceNow Community](https://community.servicenow.com)
- [Developer Portal](https://developer.servicenow.com)

### Troubleshooting
- Check browser console for JavaScript errors
- Review ServiceNow instance logs (System Logs → Application Logs)
- Use Next Experience Developer Tools for component inspection

---

## License

This component is provided as-is for use within your ServiceNow environment. Modify and distribute according to your organization's policies.

---

## Contributing

To enhance this component:
1. Make changes locally
2. Test thoroughly in development instance
3. Deploy to production after approval
4. Document changes in your organization's change log

---

## Changelog

### Version 1.0.0 (Initial Release)
- Full dashboard with action items, progress tracking, and updates
- Horizon Design System integration
- Responsive design with mobile support
- Accessibility compliance (WCAG 2.1 AA)
- Event dispatching for page-level interactions

---

**Built with ❤️ for ServiceNow by the Sales Operations Team**
