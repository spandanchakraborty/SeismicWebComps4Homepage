import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

// Helper function to format currency
const formatCurrency = (value) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

// Helper function to format date
const formatDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

// Helper function to calculate progress percentage
const calculateProgress = (quota, forecast) => {
  if (forecast === 0) return 0;
  return Math.min(100, (quota / forecast) * 100);
};

// View function - defines the component's HTML structure
const view = (state, { updateState, dispatch }) => {
  const { properties } = state;
  
  // Parse JSON properties
  const actionItems = properties.actionItems ? JSON.parse(properties.actionItems) : [];
  const forecastData = properties.forecastData ? JSON.parse(properties.forecastData) : [];
  const updates = properties.updates ? JSON.parse(properties.updates) : [];
  
  // Calculate progress
  const progress = calculateProgress(properties.quotaAmount, properties.forecastAmount);
  
  // Filter updates by type
  const wins = updates.filter(u => u.type === 'win');
  const news = updates.filter(u => u.type === 'news');
  
  return (
    <div className="som-dashboard-container">
      {/* Header Section */}
      <header className="som-header">
        <h1 className="som-header-title">
          {properties.greetingMessage}, {properties.userName}!
        </h1>
        {properties.showDate && (
          <p className="som-header-date">{formatDate()}</p>
        )}
      </header>

      <div className="som-grid-layout">
        {/* Left Column - Focus and Attainment */}
        <div className="som-main-column">
          
          {/* Today's Focus Section */}
          <div className="som-card som-focus-card">
            <div className="som-card-header">
              <div className="som-card-header-content">
                <h2 className="som-card-title">{properties.focusTitle}</h2>
                <p className="som-card-description">{properties.focusDescription}</p>
              </div>
              <div className="som-badge-group">
                {properties.suggestedActionsCount > 0 && (
                  <div className="som-badge som-badge-destructive">
                    <svg className="som-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Suggested actions ({properties.suggestedActionsCount})
                  </div>
                )}
                {properties.showOverdueBadge && (
                  <div className="som-badge som-badge-outline">Overdue</div>
                )}
              </div>
            </div>
            
            <div className="som-card-content">
              <div className="som-action-grid">
                {actionItems.map((item, idx) => (
                  <div key={idx} className="som-action-card">
                    <div className="som-action-card-header">
                      <div className="som-action-card-badge-row">
                        <div className={`som-badge ${item.type === 'risk' ? 'som-badge-destructive' : 'som-badge-default'}`}>
                          <svg className="som-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            {item.type === 'risk' ? (
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            ) : (
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                            )}
                          </svg>
                          {item.type === 'risk' ? 'Downsell Risk' : 'Renewal Opportunity'}
                        </div>
                        {properties.enableInteractivity && (
                          <div className="som-feedback-buttons">
                            <button 
                              className="som-icon-button"
                              on-click={() => dispatch('FEEDBACK_THUMBS_UP', { 
                                actionItemId: item.sysId || idx.toString(),
                                title: item.title 
                              })}
                            >
                              <svg className="som-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                              </svg>
                            </button>
                            <button 
                              className="som-icon-button"
                              on-click={() => dispatch('FEEDBACK_THUMBS_DOWN', { 
                                actionItemId: item.sysId || idx.toString(),
                                title: item.title 
                              })}
                            >
                              <svg className="som-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      <h3 className="som-action-card-title">{item.title}</h3>
                    </div>
                    <div className="som-action-card-content">
                      <p className="som-action-card-description">{item.description}</p>
                      {properties.enableInteractivity && (
                        <button 
                          className={`som-button ${item.type === 'risk' ? 'som-button-default' : 'som-button-secondary'}`}
                          on-click={() => dispatch('ACTION_ITEM_CLICKED', {
                            actionType: item.type,
                            accountId: item.accountId,
                            title: item.title,
                            sysId: item.sysId
                          })}
                        >
                          {item.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attainment Progress Section */}
          <div className="som-card">
            <div className="som-card-header">
              <h2 className="som-card-title">Attainment progress</h2>
              <span className="som-quarter-label">Current quarter {properties.currentQuarter}</span>
            </div>
            <div className="som-card-content">
              <div className="som-attainment-grid">
                {/* Left Column - Metrics */}
                <div className="som-metrics-column">
                  <div className="som-quota-section">
                    <p className="som-label">Quota</p>
                    <p className="som-quota-value">
                      {formatCurrency(properties.quotaAmount)}
                      <span className="som-quota-forecast">
                        {' / '}{formatCurrency(properties.forecastAmount)}
                      </span>
                    </p>
                    <div className="som-progress-wrapper">
                      <div className="som-progress-bar">
                        <div className="som-progress-fill" style={`width: ${progress}%`}></div>
                      </div>
                      <p className="som-progress-label">{progress.toFixed(0)}% goal completed</p>
                    </div>
                  </div>

                  <div className="som-metrics-row">
                    <div className="som-metric">
                      <p className="som-label">Weighted Pipeline %</p>
                      <p className="som-metric-value">{properties.weightedPipeline}</p>
                    </div>
                    <div className="som-metric">
                      <p className="som-label">Pipeline Coverage</p>
                      <p className="som-metric-value">{properties.pipelineCoverage}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Chart */}
                <div className="som-chart-column">
                  <p className="som-chart-title">Forecast distribution by stages</p>
                  <div className="som-chart-container">
                    <div className="som-bar-chart">
                      {forecastData.map((item, idx) => {
                        const maxValue = Math.max(...forecastData.map(d => d.value));
                        const heightPercentage = (item.value / maxValue) * 100;
                        
                        return (
                          <div key={idx} className="som-bar-group">
                            <div className="som-bar-wrapper">
                              <button
                                className="som-bar"
                                style={`height: ${heightPercentage}%; background-color: ${item.color}`}
                                on-click={() => dispatch('CHART_DATA_POINT_CLICKED', {
                                  stageName: item.name,
                                  value: item.value
                                })}
                              >
                                <span className="som-bar-label">{formatCurrency(item.value)}</span>
                              </button>
                            </div>
                            <span className="som-bar-name">{item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Updates */}
        <div className="som-sidebar-column">
          <div className="som-card som-updates-card">
            <div className="som-card-header">
              <h2 className="som-card-title">Latest updates</h2>
            </div>
            <div className="som-card-content">
              
              {/* Wins Section */}
              {wins.length > 0 && (
                <div className="som-updates-section">
                  <h3 className="som-section-title">
                    <svg className="som-icon som-icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="8" r="7"/>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                    </svg>
                    Wins
                  </h3>
                  {wins.map((update, idx) => (
                    <div key={idx} className="som-update-item som-update-win">
                      <div className="som-update-content">
                        {update.icon && <span className="som-update-icon">{update.icon}</span>}
                        <div className="som-update-text">
                          <p className="som-update-title">{update.title}</p>
                          <p className="som-update-description som-update-success">{update.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* News Section */}
              {news.length > 0 && (
                <div className="som-updates-section">
                  <h3 className="som-section-title">
                    <svg className="som-icon som-icon-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    </svg>
                    News
                  </h3>
                  <div className="som-news-list">
                    {news.map((update, idx) => (
                      <div key={idx} className="som-update-item som-update-news">
                        <div className="som-update-header">
                          {update.badge && (
                            <div className={`som-badge som-badge-${update.badgeVariant || 'default'}`}>
                              {update.badge}
                            </div>
                          )}
                          {update.timestamp && (
                            <span className="som-update-timestamp">{update.timestamp}</span>
                          )}
                        </div>
                        <p className="som-update-title">{update.title}</p>
                        <p className="som-update-description">{update.description}</p>
                        {update.action && properties.enableInteractivity && (
                          <button 
                            className="som-button som-button-outline som-button-small"
                            on-click={() => dispatch('UPDATE_ACTION_CLICKED', {
                              updateType: update.type,
                              title: update.title,
                              action: update.action,
                              sysId: update.sysId
                            })}
                          >
                            <svg className="som-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            {update.action}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Action handlers - handle user interactions
const actionHandlers = {
  // These handlers are called automatically by dispatched events
  // No need to explicitly define them as the dispatch function handles the event emission
};

// Create and export the custom element
createCustomElement('som-dashboard-homepage', {
  renderer: { type: snabbdom },
  view,
  styles,
  actionHandlers,
  properties: {
    userName: { default: 'User' },
    greetingMessage: { default: 'Good morning' },
    showDate: { default: true },
    focusTitle: { default: "Today's focus" },
    focusDescription: { default: 'Prioritize time-sensitive deals and critical tasks to finish strong.' },
    actionItems: { default: '[]' },
    suggestedActionsCount: { default: 0 },
    showOverdueBadge: { default: false },
    quotaAmount: { default: 250000 },
    forecastAmount: { default: 546000 },
    weightedPipeline: { default: '1.67%' },
    pipelineCoverage: { default: '0.35x' },
    currentQuarter: { default: '2025 Q3' },
    forecastData: { default: '[]' },
    updates: { default: '[]' },
    enableInteractivity: { default: true }
  }
});
