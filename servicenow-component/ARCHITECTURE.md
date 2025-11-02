# ServiceNow Component Architecture Guide

## Overview

This document explains the architectural decisions and framework concepts behind the SOM Dashboard Homepage component, designed for the ServiceNow Now Experience UI Framework (Seismic).

---

## Framework Foundation

### Now Experience UI Framework (Seismic)

The Now Experience UI Framework represents ServiceNow's modern approach to UI development:

**Key Characteristics:**
- **Standards-Based:** Uses Web Components (Custom Elements v1)
- **Framework-Agnostic:** Built on Tectonic rendering layer (can support React, Vue, etc.)
- **Unidirectional Data Flow:** Properties → State → View
- **Encapsulated:** Scoped styles prevent CSS leakage
- **Future-Proof:** Platform can evolve without breaking components

### Why Web Components?

Unlike AngularJS widgets (Service Portal), Web Components are:
- Native browser standards (no framework lock-in)
- Better performance (native DOM APIs)
- More maintainable (true encapsulation)
- Platform-agnostic (work anywhere)

---

## Component Architecture

### Three Core Files

```
servicenow-component/
├── now-ui.json       # Public API & Metadata
├── src/index.js      # Logic & Rendering
└── src/styles.scss   # Scoped Styles
```

#### 1. now-ui.json - The Contract

**Purpose:** Defines the component's public interface for UI Builder

**Key Sections:**
- **Properties:** Configurable inputs (what UI Builder can set)
- **Dispatched Actions:** Events component fires (what page can listen to)

**Example Property:**
```json
{
  "name": "userName",
  "label": "User Name",
  "fieldType": "string",
  "defaultValue": "User"
}
```

This creates:
- A configuration field in UI Builder
- A state property accessible in code
- A binding point for Data Resources

**Example Action:**
```json
{
  "name": "ACTION_ITEM_CLICKED",
  "label": "Action Item Clicked",
  "payload": {
    "type": "object",
    "properties": {
      "actionType": { "type": "string" },
      "accountId": { "type": "string" }
    }
  }
}
```

This creates:
- An event handler slot in UI Builder
- A dispatchable event in code
- A typed payload structure

#### 2. src/index.js - The Brain

**Purpose:** Component logic, rendering, and event handling

**Key Functions:**

**view(state, helpers):**
```javascript
const view = (state, { updateState, dispatch }) => {
  const { properties } = state;
  
  return (
    <div className="my-component">
      <h1>{properties.userName}</h1>
      <button on-click={() => dispatch('BUTTON_CLICKED', { id: 1 })}>
        Click Me
      </button>
    </div>
  );
};
```

**Data Flow:**
```
Properties (UI Builder)
    ↓
State (Component Runtime)
    ↓
View Function (Rendering)
    ↓
DOM (User Sees)
```

**Event Flow:**
```
User Interaction
    ↓
Event Handler (on-click)
    ↓
dispatch() Call
    ↓
Page-Level Handler (UI Builder)
```

#### 3. src/styles.scss - The Skin

**Purpose:** Component styling with design system tokens

**Key Concepts:**

**Encapsulation:**
```scss
.my-component {
  // All styles scoped to component root
  // Won't affect other components or page
  
  &-header {
    color: $now-color--neutral-18;
  }
}
```

**Design Tokens:**
```scss
// ❌ Don't hardcode values
.button {
  color: #0066CC;
  padding: 12px;
}

// ✅ Use Horizon tokens
.button {
  color: $now-color--primary-2;
  padding: $now-spacing--md;
}
```

**Benefits:**
- Automatic dark mode support
- Consistent with platform UI
- Theme-aware
- Accessible contrast ratios

---

## Data Flow Architecture

### Unidirectional Data Flow

```
┌─────────────────┐
│  UI Builder     │
│  Configuration  │
└────────┬────────┘
         │ Properties
         ↓
┌─────────────────┐
│  Component      │
│  State          │
└────────┬────────┘
         │ state.properties
         ↓
┌─────────────────┐
│  View Function  │
│  (Rendering)    │
└────────┬────────┘
         │ Virtual DOM
         ↓
┌─────────────────┐
│  Browser DOM    │
│  (User Sees)    │
└─────────────────┘
```

### Data Binding Patterns

#### Pattern 1: Static Properties

```javascript
// UI Builder: Set static value "John Doe"
// Component receives:
state.properties.userName === "John Doe"
```

#### Pattern 2: Data Resource Binding

```javascript
// UI Builder: Bind to Data Resource output
// Data Resource returns: { users: [{name: "Jane"}] }
// Component receives:
state.properties.users === [{name: "Jane"}]
```

#### Pattern 3: Context Binding

```javascript
// UI Builder: Bind to @context.user.name
// Component receives current user's name:
state.properties.userName === "Current User"
```

---

## Event Architecture

### Event Dispatch Pattern

```javascript
// In component (src/index.js)
<button on-click={() => dispatch('MY_EVENT', { data: 'value' })}>
  Click
</button>

// UI Builder receives:
{
  type: 'MY_EVENT',
  payload: { data: 'value' }
}

// Page can then:
// - Navigate to URL
// - Open modal
// - Update other components
// - Call server-side script
```

### Event Payload Design

**Best Practices:**
- Include all context needed by handler
- Use descriptive property names
- Include record sys_id when relevant
- Keep payloads flat (avoid deep nesting)

**Example:**
```javascript
// ✅ Good payload
{
  actionType: 'risk',
  accountId: 'ACC-001',
  title: 'TechStart Inc',
  sysId: 'abc123'
}

// ❌ Poor payload
{
  data: {
    info: {
      details: {
        id: 'ACC-001'
      }
    }
  }
}
```

---

## Integration with ServiceNow Platform

### Data Resources

**Purpose:** Connect components to ServiceNow data

**Flow:**
```
Component Property
    ↑ (binding)
Data Resource
    ↑ (calls)
REST API / Table Query
    ↑ (queries)
ServiceNow Tables
```

**Types:**
1. **REST API:** Call Scripted REST API
2. **Table Query:** Direct GlideRecord query
3. **Client Script:** Custom JavaScript logic

### Example Integration

**Scripted REST API:**
```javascript
// Returns data in component-expected format
(function process(request, response) {
    var gr = new GlideRecord('account');
    gr.query();
    
    var result = [];
    while (gr.next()) {
        result.push({
            title: gr.getValue('name'),
            description: gr.getValue('description'),
            sysId: gr.getUniqueValue()
        });
    }
    
    return result;
})(request, response);
```

**Data Resource Configuration:**
- URL: `/api/x_scope/som/accounts`
- Method: GET
- Response mapping: Direct to component property

**Component Binding:**
- Property: `actionItems`
- Value: `@data.som_accounts.results`

---

## Styling Architecture

### Horizon Design System Integration

**Token Categories:**

#### Colors
```scss
// Neutrals (0 = lightest, 19 = darkest)
$now-color--neutral-0   // White/backgrounds
$now-color--neutral-10  // Mid-tone text
$now-color--neutral-18  // Dark text

// Semantic colors
$now-color--primary-2   // Brand blue
$now-color--critical-2  // Error red
$now-color--success-2   // Success green
$now-color--info-2      // Info blue
```

#### Typography
```scss
// Sizes
$now-font-size--xs      // 12px
$now-font-size--sm      // 14px
$now-font-size--md      // 16px (base)
$now-font-size--lg      // 18px
$now-font-size--xl      // 20px
$now-font-size--2xl     // 24px
$now-font-size--4xl     // 36px

// Weights
$now-font-weight--normal    // 400
$now-font-weight--medium    // 500
$now-font-weight--semibold  // 600
$now-font-weight--bold      // 700
```

#### Spacing
```scss
$now-spacing--xs    // 4px
$now-spacing--sm    // 8px
$now-spacing--md    // 16px
$now-spacing--lg    // 24px
$now-spacing--xl    // 32px
$now-spacing--2xl   // 48px
```

#### Elevation
```scss
$now-elevation--raised   // Subtle shadow
$now-elevation--overlay  // Prominent shadow
```

### Responsive Design

```scss
// Mobile-first approach
.component {
  padding: $now-spacing--sm;
  
  // Tablet
  @media (min-width: 768px) {
    padding: $now-spacing--md;
  }
  
  // Desktop
  @media (min-width: 1024px) {
    padding: $now-spacing--lg;
  }
}
```

---

## Performance Considerations

### Rendering Optimization

**Virtual DOM Diffing:**
- Framework only updates changed elements
- Use unique `key` attributes for lists
- Avoid inline function creation in loops

**Example:**
```javascript
// ❌ Poor performance
{items.map(item => (
  <button on-click={() => handleClick(item.id)}>
    {item.name}
  </button>
))}

// ✅ Better performance
{items.map(item => (
  <button 
    key={item.id}
    on-click={() => dispatch('ITEM_CLICKED', { id: item.id })}
  >
    {item.name}
  </button>
))}
```

### Data Volume

**Recommendations:**
- Action items: < 20 items
- Chart data points: < 10 bars
- Updates feed: < 15 items

**Pagination Strategy:**
```javascript
// In REST API
gr.setLimit(20);
gr.query();

// In component, show "Load More" button
<button on-click={() => dispatch('LOAD_MORE')}>
  Load More
</button>
```

---

## Security Architecture

### Input Sanitization

**In Scripted REST API:**
```javascript
(function process(request, response) {
    // Sanitize inputs
    var userId = gs.getUserID(); // Server-side user context
    
    var gr = new GlideRecord('account');
    gr.addQuery('owner', userId); // User-scoped query
    gr.query();
    
    // Only return user's data
    return results;
})(request, response);
```

### Access Control

**REST API ACLs:**
- Create ACLs for each endpoint
- Use role-based access control
- Validate permissions server-side

**Example ACL:**
```javascript
// Type: REST Endpoint
// Operation: Read
answer = gs.hasRole('som_dashboard_user') || gs.hasRole('admin');
```

---

## Testing Strategy

### Unit Testing

Test component logic in isolation:

```javascript
// Test view function
const mockState = {
  properties: {
    userName: 'Test User',
    actionItems: '[]'
  }
};

const result = view(mockState, mockHelpers);
// Assert rendering output
```

### Integration Testing

Test with real ServiceNow data:

1. Create test Data Resources
2. Populate test data in tables
3. Verify component renders correctly
4. Test event dispatching

### Browser Testing

- Chrome (ServiceNow primary browser)
- Firefox
- Safari
- Edge

### Accessibility Testing

- Keyboard navigation
- Screen reader compatibility
- Color contrast (WCAG AA)
- Focus indicators

---

## Deployment Pipeline

```
┌──────────────┐
│ Local Dev    │
│ (now-cli     │
│  develop)    │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Build        │
│ (CLI builds) │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Dev Instance │
│ (now-cli     │
│  deploy)     │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Test Instance│
│ (Update Set) │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Production   │
│ (Update Set) │
└──────────────┘
```

---

## Maintenance & Evolution

### Version Control Strategy

```bash
# Tag releases
git tag v1.0.0
git tag v1.1.0

# Branch strategy
main          # Production-ready code
develop       # Integration branch
feature/*     # Feature branches
hotfix/*      # Emergency fixes
```

### Component Updates

**Breaking Changes:**
- Increment major version (v1.x.x → v2.0.0)
- Update documentation
- Provide migration guide

**New Features:**
- Increment minor version (v1.0.x → v1.1.0)
- Add to changelog
- Maintain backward compatibility

**Bug Fixes:**
- Increment patch version (v1.0.0 → v1.0.1)
- Document in changelog

---

## Best Practices Summary

### Component Design
✅ Single Responsibility Principle  
✅ Configurable through properties  
✅ Event-driven communication  
✅ Stateless when possible  

### Data Management
✅ Server-side data filtering  
✅ Minimal data transfer  
✅ Proper error handling  
✅ Caching when appropriate  

### Styling
✅ Use Horizon tokens exclusively  
✅ Scope all styles  
✅ Mobile-first responsive  
✅ Support dark mode  

### Accessibility
✅ Keyboard navigation  
✅ ARIA labels  
✅ Focus indicators  
✅ Screen reader support  

### Performance
✅ Lazy loading  
✅ Pagination  
✅ Optimized rendering  
✅ Minimal dependencies  

---

## Resources

- [Now Experience Framework Docs](https://developer.servicenow.com/dev.do#!/reference/now-experience)
- [UI Builder Guide](https://docs.servicenow.com/ui-builder)
- [Horizon Design System](https://developer.servicenow.com/horizon-design-system)
- [Web Components Spec](https://www.webcomponents.org/)

---

**Architecture Version:** 1.0  
**Last Updated:** 2025-Q1  
**Platform:** ServiceNow (Rome+)
