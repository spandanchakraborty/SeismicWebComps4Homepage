# Implementation Guide: SOM Dashboard Component

## Quick Start for Developers

This guide walks you through deploying the SOM Dashboard Homepage component to your ServiceNow instance from scratch.

---

## Phase 1: Environment Setup (15 minutes)

### Install Required Tools

```bash
# 1. Install Node Version Manager (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Install Node.js LTS
nvm install 20
nvm use 20

# 3. Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x

# 4. Install ServiceNow CLI globally
npm install -g @servicenow/cli

# 5. Verify CLI installation
now-cli --version
```

### Configure Instance Connection

```bash
# Set up your instance profile
now-cli configure profile set

# You'll be prompted for:
# - Profile name: dev-instance (or your choice)
# - Instance URL: https://your-instance.service-now.com
# - Username: your.username
# - Password: ********

# Test connection (if needed)
# now-cli configure profile list
```

---

## Phase 2: Project Creation (10 minutes)

### Create Component Project

```bash
# Navigate to your workspace
cd ~/Documents/ServiceNow-Projects

# Create the component project
# Replace 'your_scope' with your app scope (e.g., x_acme_som)
now-cli project \
  --name @your_scope/som-dashboard-homepage \
  --scope x_your_scope_app

# Navigate into project
cd som-dashboard-homepage

# Install dependencies
npm install
```

### Project Structure Overview

After creation, you'll see:

```
som-dashboard-homepage/
├── now-cli.json           # CLI configuration
├── now-ui.json            # Component metadata (TO BE REPLACED)
├── package.json           # Node dependencies
├── src/
│   ├── index.js          # Component logic (TO BE REPLACED)
│   └── styles.scss       # Component styles (TO BE REPLACED)
└── example/              # Local development examples
```

---

## Phase 3: Code Integration (5 minutes)

### Replace Scaffolded Files

Copy the refactored files from the `servicenow-component/` directory:

```bash
# From the repository root, copy files to your project
cp servicenow-component/now-ui.json som-dashboard-homepage/
cp servicenow-component/src/index.js som-dashboard-homepage/src/
cp servicenow-component/src/styles.scss som-dashboard-homepage/src/
```

### Verify File Contents

**Check `now-ui.json`:**
```bash
cat now-ui.json | grep "label"
# Should output: "label": "SOM Dashboard Homepage",
```

**Check `src/index.js`:**
```bash
head -5 src/index.js
# Should see imports from @servicenow/ui-core
```

---

## Phase 4: Local Testing (10 minutes)

### Start Development Server

```bash
# From your project directory
now-cli develop --open
```

This opens a browser preview at `http://localhost:8081`

### Testing with Sample Data

Create a test file `example/data.json`:

```json
{
  "userName": "Alex Johnson",
  "actionItems": [
    {
      "type": "risk",
      "title": "Acme Corp - Usage Decline",
      "description": "30% drop in platform usage detected",
      "actionLabel": "Review Account Health",
      "accountId": "ACC-001",
      "sysId": "test-001"
    }
  ],
  "forecastData": [
    { "name": "Closed", "value": 250000, "color": "hsl(140, 60%, 50%)" }
  ],
  "updates": [
    {
      "type": "win",
      "title": "Major deal closed!",
      "description": "$100K added to quota",
      "icon": "🎉"
    }
  ]
}
```

### Configuration for Instance Proxy

Edit `now-cli.json` to test with live data:

```json
{
  "scope": "x_your_scope_app",
  "profile": "dev-instance",
  "proxy": {
    "source": "your-instance.service-now.com"
  }
}
```

---

## Phase 5: Deployment (10 minutes)

### Deploy to ServiceNow

```bash
# Build and deploy
now-cli deploy

# You'll see output like:
# ✔ Component validated
# ✔ Building component...
# ✔ Deploying to instance...
# ✔ Component deployed successfully
```

### Verify Deployment

1. Log into your ServiceNow instance
2. Navigate to **All** → **UI Builder**
3. Open any page or create a test page
4. Click **Add Component**
5. Search for "SOM Dashboard Homepage"
6. You should see your component in the list

---

## Phase 6: Data Source Setup (30 minutes)

### Create Mock Data Tables

Create custom tables to store your data:

#### 1. Action Items Table

**Table Name:** `x_your_scope_app_action_item`

**Fields:**
- `type` (String) - "risk" or "opportunity"
- `title` (String)
- `description` (String)
- `action_label` (String)
- `account_id` (String)
- `priority` (Integer)
- `created_date` (Date/Time)

#### 2. Forecast Stage Table

**Table Name:** `x_your_scope_app_forecast_stage`

**Fields:**
- `stage_name` (String)
- `stage_value` (Decimal)
- `stage_color` (String)
- `quarter` (String)
- `order` (Integer)

#### 3. Updates Table

**Table Name:** `x_your_scope_app_dashboard_update`

**Fields:**
- `update_type` (String) - "win" or "news"
- `title` (String)
- `description` (String)
- `icon` (String)
- `badge` (String)
- `badge_variant` (String)
- `timestamp` (Date/Time)
- `action_label` (String)

### Create Scripted REST API

**Name:** SOM Dashboard API  
**API ID:** som_dashboard  
**Base API Path:** `/api/x_your_scope_app/som_dashboard`

#### Resource 1: Get Action Items

**Relative Path:** `/action_items`  
**HTTP Method:** GET

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    
    var result = [];
    
    var gr = new GlideRecord('x_your_scope_app_action_item');
    gr.addActiveQuery();
    gr.orderByDesc('priority');
    gr.setLimit(10);
    gr.query();
    
    while (gr.next()) {
        result.push({
            type: gr.getValue('type'),
            title: gr.getValue('title'),
            description: gr.getValue('description'),
            actionLabel: gr.getValue('action_label'),
            accountId: gr.getValue('account_id'),
            sysId: gr.getUniqueValue()
        });
    }
    
    return result;
    
})(request, response);
```

#### Resource 2: Get Forecast Data

**Relative Path:** `/forecast_data`  
**HTTP Method:** GET

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    
    var result = [];
    
    // Get current quarter
    var currentQuarter = request.queryParams.quarter || '2025 Q3';
    
    var gr = new GlideRecord('x_your_scope_app_forecast_stage');
    gr.addQuery('quarter', currentQuarter);
    gr.orderBy('order');
    gr.query();
    
    while (gr.next()) {
        result.push({
            name: gr.getValue('stage_name'),
            value: parseFloat(gr.getValue('stage_value')),
            color: gr.getValue('stage_color')
        });
    }
    
    return result;
    
})(request, response);
```

#### Resource 3: Get Updates

**Relative Path:** `/updates`  
**HTTP Method:** GET

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    
    var result = [];
    
    var gr = new GlideRecord('x_your_scope_app_dashboard_update');
    gr.addActiveQuery();
    gr.orderByDesc('timestamp');
    gr.setLimit(5);
    gr.query();
    
    while (gr.next()) {
        var item = {
            type: gr.getValue('update_type'),
            title: gr.getValue('title'),
            description: gr.getValue('description'),
            sysId: gr.getUniqueValue()
        };
        
        if (gr.getValue('icon')) {
            item.icon = gr.getValue('icon');
        }
        
        if (gr.getValue('badge')) {
            item.badge = gr.getValue('badge');
            item.badgeVariant = gr.getValue('badge_variant') || 'default';
        }
        
        if (gr.getValue('timestamp')) {
            var timestamp = new GlideDateTime(gr.getValue('timestamp'));
            var now = new GlideDateTime();
            var diff = GlideDateTime.subtract(now, timestamp);
            var hours = Math.floor(diff.getNumericValue() / (1000 * 60 * 60));
            item.timestamp = 'Updated ' + hours + 'h ago';
        }
        
        if (gr.getValue('action_label')) {
            item.action = gr.getValue('action_label');
        }
        
        result.push(item);
    }
    
    return result;
    
})(request, response);
```

### Test REST APIs

```bash
# Test with curl (replace with your instance)
curl -X GET \
  "https://your-instance.service-now.com/api/x_your_scope_app/som_dashboard/action_items" \
  -H "Accept: application/json" \
  -u "username:password"
```

---

## Phase 7: UI Builder Configuration (20 minutes)

### Create Data Resources

1. Navigate to **UI Builder** → **Data and Includes** → **Data Resources**
2. Click **Add Data Resource**

#### Data Resource 1: Action Items

- **Name:** SOM Action Items
- **Type:** REST API
- **Method:** GET
- **URL:** `/api/x_your_scope_app/som_dashboard/action_items`
- **Response Schema:** (Auto-detect or paste sample response)

#### Data Resource 2: Forecast Data

- **Name:** SOM Forecast Data
- **Type:** REST API
- **Method:** GET
- **URL:** `/api/x_your_scope_app/som_dashboard/forecast_data`

#### Data Resource 3: Updates

- **Name:** SOM Dashboard Updates
- **Type:** REST API
- **Method:** GET
- **URL:** `/api/x_your_scope_app/som_dashboard/updates`

### Configure Component on Page

1. **Create a new page** in UI Builder
2. **Add the SOM Dashboard component** to the canvas
3. **Configure properties:**

**Basic Settings:**
- User Name: `@context.user.name` (or static text)
- Greeting Message: "Good morning"
- Show Date: true

**Data Bindings:**
- Action Items → Bind to `SOM Action Items` Data Resource
- Forecast Data → Bind to `SOM Forecast Data` Data Resource
- Updates → Bind to `SOM Dashboard Updates` Data Resource

**Metrics (from Data Resources or static):**
- Quota Amount: 250000
- Forecast Amount: 546000
- Current Quarter: "2025 Q3"

4. **Set up Event Handlers:**

Click on the component → Events tab:

**ACTION_ITEM_CLICKED Event:**
- Add Action → Navigate to URL
- URL: `/now/nav/ui/classic/params/target/x_your_scope_app_action_item.do?sys_id={{event.payload.sysId}}`

**UPDATE_ACTION_CLICKED Event:**
- Add Action → Show Modal
- Modal Content: Calendar scheduling interface

---

## Phase 8: Testing & Validation (15 minutes)

### Functional Testing Checklist

- [ ] Component loads without errors
- [ ] User name displays correctly
- [ ] Action items render from Data Resource
- [ ] Chart displays forecast data
- [ ] Updates section shows wins and news
- [ ] Clicking action items fires events
- [ ] Feedback buttons work (thumbs up/down)
- [ ] Chart bars are clickable

### Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Responsive Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Accessibility Testing

```bash
# Install axe DevTools browser extension
# Run audit on the page
# Fix any critical/serious issues
```

---

## Phase 9: Production Deployment

### Pre-Production Checklist

- [ ] All tests passing
- [ ] Code reviewed
- [ ] Data sources validated
- [ ] Performance tested (load time < 3s)
- [ ] Accessibility audit complete
- [ ] Documentation updated

### Deployment Steps

1. **Update Set Creation:**
   - Create an Update Set for all changes
   - Include: Component, Data Resources, REST APIs, Tables

2. **Deploy to Staging:**
   - Test in staging environment
   - Conduct UAT (User Acceptance Testing)

3. **Production Release:**
   - Schedule maintenance window
   - Deploy Update Set
   - Monitor for errors
   - Communicate to users

### Rollback Plan

If issues occur:
```bash
# Revert to previous version
# Re-deploy older version from git tag or backup

# Or manually deactivate in ServiceNow:
# Navigate to sys_ux_macroponent
# Find your component
# Set Active = false
```

---

## Troubleshooting

### Issue: Component not in palette

**Symptoms:** Can't find component in UI Builder  
**Solutions:**
1. Verify deployment completed successfully
2. Check scope matches instance
3. Clear browser cache
4. Check component is Active in sys_ux_macroponent

### Issue: Styles not applying

**Symptoms:** Component renders but looks unstyled  
**Solutions:**
1. Check SCSS compilation errors in deployment log
2. Verify Horizon tokens are available
3. Check for CSS conflicts with page-level styles

### Issue: Data not loading

**Symptoms:** Empty sections or "No data" messages  
**Solutions:**
1. Check Data Resource configuration
2. Verify REST API returns correct format
3. Check browser console for errors
4. Test REST API directly with Postman/curl

### Issue: Events not firing

**Symptoms:** Clicks don't trigger actions  
**Solutions:**
1. Check event handlers are configured
2. Verify `enableInteractivity` property is true
3. Open Next Experience Developer Tools
4. Check console for JavaScript errors

---

## Performance Optimization

### Best Practices

1. **Limit Data Volume:**
   - Action items: max 20
   - Updates: max 10
   - Forecast stages: max 8

2. **Caching Strategy:**
   ```javascript
   // In REST API, add cache control
   response.setHeader('Cache-Control', 'max-age=300'); // 5 minutes
   ```

3. **Lazy Loading:**
   - Load chart data only when section is visible
   - Defer non-critical updates

4. **Minimize Re-renders:**
   - Use memoization for computed values
   - Optimize Data Resource polling intervals

---

## Security Considerations

### Access Control

1. **REST API ACLs:**
   - Create ACLs for each REST resource
   - Restrict to appropriate roles

2. **Data Filtering:**
   - Return only user's relevant data
   - Use `gs.getUserID()` in queries

3. **Input Validation:**
   - Sanitize all user inputs
   - Validate data formats

### Example ACL

**Type:** REST Endpoint  
**Operation:** Read  
**Name:** SOM Dashboard Action Items API  
**Script:**
```javascript
// Only allow users with som_dashboard_user role
answer = gs.hasRole('som_dashboard_user') || gs.hasRole('admin');
```

---

## Maintenance & Updates

### Version Control

Track component versions in git:

```bash
git init
git add .
git commit -m "Initial SOM Dashboard component v1.0.0"
git tag v1.0.0
git remote add origin <your-repo-url>
git push origin main --tags
```

### Update Workflow

1. Make changes locally
2. Test in development
3. Deploy to dev instance
4. Create Update Set
5. Move through environments (Dev → Test → Prod)

---

## Next Steps

After successful deployment:

1. **Gather User Feedback**
   - Conduct user interviews
   - Monitor usage analytics
   - Identify improvement areas

2. **Iterate & Enhance**
   - Add new features based on feedback
   - Optimize performance
   - Enhance accessibility

3. **Create Related Components**
   - Detailed account health view
   - Opportunity management interface
   - Analytics dashboard

---

## Resources

- [ServiceNow CLI Documentation](https://developer.servicenow.com/dev.do#!/reference/cli)
- [UI Builder Guide](https://docs.servicenow.com/ui-builder)
- [Horizon Design System](https://developer.servicenow.com/horizon-design-system)
- [Now Experience Framework](https://developer.servicenow.com/dev.do#!/reference/now-experience)

---

**Questions or Issues?**

Contact your ServiceNow development team or post in the ServiceNow Community forums.
