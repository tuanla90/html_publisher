const fs = require('fs');

// Mock a simple browser environment
global.window = {
  addEventListener: () => {},
  location: { hash: '#overview' }
};
global.document = {
  querySelectorAll: (selector) => {
    console.log(`Mock: querySelectorAll(${selector})`);
    if (selector === '.menu-item') return [{ addEventListener: () => {}, textContent: 'Overview', getAttribute: () => 'overview' }];
    if (selector === '.tab-content') return [{ classList: { remove: () => {}, add: () => {} } }];
    if (selector === '.task-checkbox') return [];
    return [];
  },
  getElementById: (id) => {
    console.log(`Mock: getElementById(${id})`);
    if (id === 'progress-bar') return { style: {} };
    if (id === 'progress-percent-label') return { textContent: '' };
    if (id === 'progress-ratio') return { textContent: '' };
    if (id === 'roadmap-search') return { addEventListener: () => {} };
    if (id === 'theme-sun' || id === 'theme-moon') return { style: {} };
    if (id === 'input-inactive' || id === 'input-trans-count' || id === 'input-balance' || id === 'input-limit') {
      return { addEventListener: () => {}, value: '0' };
    }
    if (id === 'val-inactive' || id === 'val-trans-count' || id === 'val-balance' || id === 'val-limit') {
      return { textContent: '' };
    }
    if (id === 'sim-churn-percentage' || id === 'sim-churn-desc' || id === 'sim-gauge-fill') {
      return { textContent: '', style: {} };
    }
    // dynamic containers
    if (id === 'schema-table-body' || id === 'code-snippets-container' || id === 'rubrics-list-container' || id === 'mentor-principles-container' || id === 'feedback-templates-container') {
      return { innerHTML: '' };
    }
    return { addEventListener: () => {}, textContent: '', style: {} };
  },
  documentElement: {
    getAttribute: () => 'dark',
    setAttribute: () => {}
  }
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.Event = function(name) { return { name }; };

// Run schema.js
console.log("=== Loading schema.js ===");
const schemaCode = fs.readFileSync('schema.js', 'utf8');
eval(schemaCode);

// Run data.js
console.log("=== Loading data.js ===");
const dataCode = fs.readFileSync('data.js', 'utf8');
eval(dataCode);

// Run app.js
console.log("=== Loading app.js ===");
const appCode = fs.readFileSync('app.js', 'utf8');
try {
  eval(appCode);
  console.log("=== Execution Successful ===");
} catch (e) {
  console.error("=== Execution Failed with Error ===");
  console.error(e);
}
