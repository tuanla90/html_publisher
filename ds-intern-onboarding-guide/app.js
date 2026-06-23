/* ==========================================
   TAB TRANSITIONS
   ========================================== */
const menuItems = document.querySelectorAll('.menu-item');
const tabContents = document.querySelectorAll('.tab-content');
const pageTitle = document.getElementById('page-title');

// Click on menu item updates the URL hash
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const tabId = item.getAttribute('data-tab');
    window.location.hash = tabId;
  });
});

/**
 * Switch active code snippet week inside Code Library tab
 * @param {number} weekNum - The week number (1 to 4)
 * @param {boolean} updateHash - Whether to update URL hash
 */
function switchCodeWeek(weekNum, updateHash = true) {
  // Update sub-tab buttons active state
  const tabBtns = document.querySelectorAll('.code-tab-btn');
  tabBtns.forEach(btn => {
    const btnWeek = parseInt(btn.getAttribute('data-week'));
    if (btnWeek === weekNum) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update snippet cards visibility
  const snippetCards = document.querySelectorAll('#code-snippets-container .snippet-card');
  snippetCards.forEach((card, idx) => {
    if (idx === (weekNum - 1)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Update hash if requested
  if (updateHash) {
    window.location.hash = `code-week-${weekNum}`;
  }
}
window.switchCodeWeek = switchCodeWeek;

// Activate tab based on URL hash
function handleHashChange() {
  const hash = window.location.hash.substring(1); // Remove '#'
  const validTabs = ['overview', 'roadmap', 'business', 'code', 'evaluation'];
  
  let targetTab = hash;
  let subWeek = null;
  
  if (hash.startsWith('code-week-')) {
    targetTab = 'code';
    subWeek = parseInt(hash.split('-').pop());
  }
  
  const finalTab = validTabs.includes(targetTab) ? targetTab : 'overview';
  
  const targetItem = document.querySelector(`.menu-item[data-tab="${finalTab}"]`);
  if (targetItem) {
    // Remove active class from all menu items and tab contents
    menuItems.forEach(m => m.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked item and show corresponding tab content
    targetItem.classList.add('active');
    document.getElementById(`tab-${finalTab}`).classList.add('active');
    
    // Update page title in header
    pageTitle.textContent = targetItem.textContent.trim();
  }
  
  // If the user navigates to the code library, switch to the selected week
  if (finalTab === 'code') {
    if (subWeek && subWeek >= 1 && subWeek <= 4) {
      switchCodeWeek(subWeek, false);
    } else {
      // Default to Week 1 if no specific sub-tab is active yet
      const activeBtn = document.querySelector('.code-tab-btn.active');
      if (!activeBtn) {
        switchCodeWeek(1, false);
      }
    }
  }
}

// Synchronize state on load and hash change
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

/* ==========================================
   THEME SWITCHING (LIGHT/DARK)
   ========================================== */
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const sunIcon = document.getElementById('theme-sun');
const moonIcon = document.getElementById('theme-moon');
const htmlElement = document.documentElement;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
  if (theme === 'light') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

/* ==========================================
   COLLAPSIBLE WEEK ROADMAP NODES
   ========================================== */
function toggleWeek(weekNum) {
  const weekNode = document.getElementById(`week-${weekNum}-node`);
  weekNode.classList.toggle('open');
}

/* ==========================================
   CHECKLIST PROGRESS TRACKER
   ========================================== */
const checkboxes = document.querySelectorAll('.task-checkbox');
const totalTasks = checkboxes.length;

// Load saved checklist states
checkboxes.forEach(cb => {
  const taskId = cb.getAttribute('data-task-id');
  const isChecked = localStorage.getItem(taskId) === 'true';
  cb.checked = isChecked;
  if (isChecked) {
    cb.closest('.task-item').classList.add('checked');
  }
  
  // Add event listener to checkbox change
  cb.addEventListener('change', () => {
    const taskId = cb.getAttribute('data-task-id');
    localStorage.setItem(taskId, cb.checked);
    if (cb.checked) {
      cb.closest('.task-item').classList.add('checked');
    } else {
      cb.closest('.task-item').classList.remove('checked');
    }
    updateOverallProgress();
  });
});

function toggleTaskCheckbox(itemElement) {
  // Prevent double trigger if clicking directly on checkbox input
  if (event.target.tagName === 'INPUT') return;
  const cb = itemElement.querySelector('.task-checkbox');
  cb.checked = !cb.checked;
  const eventChange = new Event('change');
  cb.dispatchEvent(eventChange);
}

function updateOverallProgress() {
  const checkedTasks = document.querySelectorAll('.task-checkbox:checked').length;
  const percentage = totalTasks > 0 ? Math.round((checkedTasks / totalTasks) * 100) : 0;
  
  // Update progress fill
  document.getElementById('progress-bar').style.width = `${percentage}%`;
  // Update progress labels
  document.getElementById('progress-percent-label').textContent = `Tiến độ: ${percentage}%`;
  document.getElementById('progress-ratio').textContent = `${checkedTasks}/${totalTasks} Nhiệm vụ`;
}

// Initialize progress on load
updateOverallProgress();

/* ==========================================
   ROADMAP SEARCH FUNCTION
   ========================================== */
const searchInput = document.getElementById('roadmap-search');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const taskItems = document.querySelectorAll('.task-item');
  const dayBlocks = document.querySelectorAll('.day-block');
  const weekNodes = document.querySelectorAll('.week-node');

  if (query === '') {
    // Reset view - hide other weeks except week 1 by default
    weekNodes.forEach((node, index) => {
      if (index === 0) node.classList.add('open');
      else node.classList.remove('open');
      node.style.display = 'block';
    });
    dayBlocks.forEach(block => block.style.display = 'block');
    taskItems.forEach(item => item.style.display = 'flex');
    return;
  }

  // Expand all weeks during search to show matching items
  weekNodes.forEach(node => {
    node.classList.add('open');
    node.style.display = 'none'; // hide initially
  });

  // Filter tasks and day blocks
  dayBlocks.forEach(block => {
    const titleText = block.querySelector('.day-title').textContent.toLowerCase();
    const tasksInBlock = block.querySelectorAll('.task-item');
    let blockHasMatch = titleText.includes(query);

    tasksInBlock.forEach(item => {
      const itemText = item.textContent.toLowerCase();
      if (itemText.includes(query) || titleText.includes(query)) {
        item.style.display = 'flex';
        blockHasMatch = true;
      } else {
        item.style.display = 'none';
      }
    });

    if (blockHasMatch) {
      block.style.display = 'block';
      // Show the parent week node
      block.closest('.week-node').style.display = 'block';
    } else {
      block.style.display = 'none';
    }
  });
});

/* ==========================================
   MOCK CHURN SIMULATOR INTERACTIVE LOGIC
   ========================================== */
const inputInactive = document.getElementById('input-inactive');
const inputTransCount = document.getElementById('input-trans-count');
const inputBalance = document.getElementById('input-balance');
const inputLimit = document.getElementById('input-limit');

const valInactive = document.getElementById('val-inactive');
const valTransCount = document.getElementById('val-trans-count');
const valBalance = document.getElementById('val-balance');
const valLimit = document.getElementById('val-limit');

const churnPercentLabel = document.getElementById('sim-churn-percentage');
const churnDescLabel = document.getElementById('sim-churn-desc');
const gaugeFill = document.getElementById('sim-gauge-fill');

function formatVND(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'đ');
}

function calculateChurnRisk() {
  const inactive = parseInt(inputInactive.value);
  const transCount = parseInt(inputTransCount.value);
  const balance = parseInt(inputBalance.value);
  const limit = parseInt(inputLimit.value);

  // Update UI labels
  valInactive.textContent = `${inactive} tháng`;
  valTransCount.textContent = `${transCount} lần`;
  valBalance.textContent = formatVND(balance);
  valLimit.textContent = formatVND(limit);

  // Core rule heuristic logic
  let riskScore = 15; // base level risk

  // Inactivity is highly dangerous in banking
  if (inactive >= 3) {
    riskScore += (inactive - 2) * 15;
  } else {
    riskScore -= (3 - inactive) * 5;
  }

  // Low transaction counts indicates disuse
  if (transCount < 20) {
    riskScore += 25;
  } else if (transCount < 50) {
    riskScore += 10;
  } else {
    riskScore -= 10;
  }

  // Utilization ratio (balance / limit)
  const utilization = limit > 0 ? balance / limit : 0;
  if (utilization < 0.05) {
    riskScore += 20; // inactive card risk
  } else if (utilization > 0.1 && utilization < 0.5) {
    riskScore -= 15; // healthy active customer
  }

  // Constrain risk score between 5% and 99%
  riskScore = Math.max(5, Math.min(99, riskScore));

  // Update Gauge
  churnPercentLabel.textContent = `${riskScore}%`;
  
  // Calculate circle stroke-dashoffset
  const circumference = 314.16;
  const offset = circumference - (riskScore / 100) * circumference;
  gaugeFill.style.strokeDashoffset = offset;

  // Update color and description based on risk level
  if (riskScore < 30) {
    gaugeFill.style.stroke = "var(--success)";
    churnDescLabel.textContent = "Nguy cơ: THẤP (Khách hàng trung thành)";
    churnDescLabel.style.color = "var(--success)";
  } else if (riskScore < 70) {
    gaugeFill.style.stroke = "var(--warning)";
    churnDescLabel.textContent = "Nguy cơ: TRUNG BÌNH (Cần CSKH quan tâm)";
    churnDescLabel.style.color = "var(--warning)";
  } else {
    gaugeFill.style.stroke = "var(--ncb-red)";
    churnDescLabel.textContent = "Nguy cơ: CAO (Cần kích hoạt chiến dịch giữ chân)";
    churnDescLabel.style.color = "var(--ncb-red)";
  }
}

// Attach event listeners to simulator inputs
if (inputInactive && inputTransCount && inputBalance && inputLimit) {
  [inputInactive, inputTransCount, inputBalance, inputLimit].forEach(input => {
    input.addEventListener('input', calculateChurnRisk);
  });
  
  // Run once on start
  calculateChurnRisk();
}

/* ==========================================
   CLIPBOARD COPY LOGIC
   ========================================== */
function copySnippet(elementId, btn) {
  const codeText = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(codeText).then(() => {
    const textSpan = btn.querySelector('span');
    const originalText = textSpan.textContent;
    textSpan.textContent = 'Đã chép!';
    btn.style.color = 'var(--success)';
    setTimeout(() => {
      textSpan.textContent = originalText;
      btn.style.color = '';
    }, 2000);
  });
}

function copyFeedback(elementId, btn) {
  const feedbackText = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(feedbackText).then(() => {
    const textSpan = btn.querySelector('span');
    const originalText = textSpan.textContent;
    textSpan.textContent = 'Đã chép mẫu!';
    btn.style.color = 'var(--success)';
    setTimeout(() => {
      textSpan.textContent = originalText;
      btn.style.color = '';
    }, 2000);
  });
}

function toggleCode(snippetId, btn) {
  const codeBlock = document.getElementById(snippetId).closest('.snippet-card').querySelector('.snippet-body');
  const isHidden = codeBlock.style.display === 'none';
  if (isHidden) {
    codeBlock.style.display = 'block';
    btn.querySelector('span').textContent = 'Ẩn Code';
    btn.querySelector('.eye-icon').innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0112 19c-7 0-11-7-11-7a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 7 11 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/>`;
  } else {
    codeBlock.style.display = 'none';
    btn.querySelector('span').textContent = 'Hiện Code';
    btn.querySelector('.eye-icon').innerHTML = `<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
  }
}

/* ==========================================
   DYNAMIC CONTENT RENDERING FROM data.js
   ========================================== */
function renderDynamicContent() {
  const data = window.NCB_ROADMAP_DATA;
  if (!data) return;

  // 1. Render Business Tab - Data Schema Table
  const schemaTableBody = document.getElementById('schema-table-body');
  if (schemaTableBody && data.schema) {
    schemaTableBody.innerHTML = data.schema.map(item => `
      <tr>
        <td><code>${item.column}</code></td>
        <td><span class="badge-type ${item.type}">${item.typeName}</span></td>
        <td>${item.desc}</td>
      </tr>
    `).join('');
  }

  // 2. Render Code Tab - Navigation & Snippets
  const codeNavContainer = document.getElementById('code-tabs-nav');
  if (codeNavContainer && data.snippets) {
    codeNavContainer.innerHTML = data.snippets.map((item, idx) => {
      const weekNum = idx + 1;
      return `
        <button class="code-tab-btn" data-week="${weekNum}" onclick="switchCodeWeek(${weekNum})">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
          Tuần ${weekNum}
        </button>
      `;
    }).join('');
  }

  const codeContainer = document.getElementById('code-snippets-container');
  if (codeContainer && data.snippets) {
    codeContainer.innerHTML = data.snippets.map(item => `
      <div class="snippet-card">
        <div class="snippet-header">
          <span class="snippet-title">${item.title}</span>
          <div style="display: flex; gap: 12px; align-items: center;">
            <button class="toggle-code-btn" onclick="toggleCode('${item.id}', this)" style="background: none; border: 1px solid var(--border-color); padding: 5px 10px; border-radius: 4px; font-size: 12px; cursor: pointer; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; transition: var(--transition);">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="eye-icon"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>Hiện Code</span>
            </button>
            <button class="copy-btn" onclick="copySnippet('${item.id}', this)">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              <span>Sao Chép</span>
            </button>
          </div>
        </div>
        
        <!-- Text description and links wrapper with proper padding -->
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color); background: var(--bg-card);">
          <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.6; margin: 0 0 12px 0;">${item.desc}</p>
          ${item.references && item.references.length > 0 ? `
            <div class="snippet-references" style="font-size: 13px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              <span style="font-weight: 600; color: var(--text-primary);">Tài liệu học tập &amp; tham khảo:</span>
              ${item.references.map(ref => `
                <a href="${ref.url}" target="_blank" style="color: var(--ncb-blue); text-decoration: none; display: flex; align-items: center; gap: 4px; font-weight: 500;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:inline-block;"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  ${ref.label}
                </a>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Code body starts hidden -->
        <div class="snippet-body" style="display: none;">
          <pre class="code-block" id="${item.id}"><code>${escapeHtml(item.code)}</code></pre>
        </div>
      </div>
    `).join('');
  }

  // 3. Render Evaluation Tab - Rubrics (renders as individual card inside the 2x2 grid)
  const rubricsContainer = document.getElementById('rubrics-list-container');
  if (rubricsContainer && data.evaluation && data.evaluation.rubrics) {
    rubricsContainer.innerHTML = data.evaluation.rubrics.map(rubric => `
      <div class="rubric-card">
        <div style="margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
          <strong style="color: var(--ncb-blue); font-size: 15px; display: block;">${rubric.week} · ${rubric.title}</strong>
          <span style="display: block; font-size: 12px; color: var(--text-secondary); margin-top: 4px; font-style: italic;">
            Sản phẩm bàn giao: ${rubric.deliverable}
          </span>
        </div>
        <div class="rubric-levels" style="display: flex; flex-direction: column; gap: 8px;">
          ${rubric.criteria.map(crit => `
            <div style="font-size: 13px; line-height: 1.5;">
              <span style="font-weight: 600; color: ${crit.level.includes('(A)') ? 'var(--success)' : crit.level.includes('(B)') ? 'var(--ncb-blue)' : crit.level.includes('(C)') ? 'var(--warning)' : 'var(--ncb-red)'}; display: inline-block; margin-right: 4px;">${crit.level}:</span>
              <span style="color: var(--text-secondary);">${crit.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // 4. Render Evaluation Tab - Mentor Principles (renders as individual cards inside the 3-column row)
  const principlesContainer = document.getElementById('mentor-principles-container');
  if (principlesContainer && data.evaluation && data.evaluation.mentorGuide) {
    principlesContainer.innerHTML = data.evaluation.mentorGuide.map(guide => `
      <div class="principles-card">
        <strong style="display: block; margin-bottom: 6px; font-size: 14px;">${guide.title}</strong>
        <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin: 0;">${guide.desc}</p>
      </div>
    `).join('');
  }

  // 5. Render Evaluation Tab - Feedback Templates
  const feedbackContainer = document.getElementById('feedback-templates-container');
  if (feedbackContainer && data.evaluation && data.evaluation.templates) {
    feedbackContainer.innerHTML = data.evaluation.templates.map(temp => `
      <div class="template-box">
        <h4>${temp.title}</h4>
        <div class="template-text" id="${temp.id}">${escapeHtml(temp.text)}</div>
        <button class="copy-btn" style="margin-top: 12px;" onclick="copyFeedback('${temp.id}', this)">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
          <span>Sao Chép Mẫu</span>
        </button>
      </div>
    `).join('');
  }
}

// Utility to escape HTML tags in code blocks
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Render dynamic content on script startup
renderDynamicContent();
