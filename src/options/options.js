/**
 * Options Page Script
 * Handles settings management and persistence
 */

document.addEventListener('DOMContentLoaded', init);

/**
 * Initializes the options page
 */
async function init() {
  await loadSettings();
  setupEventListeners();
}

/**
 * Loads settings from storage and updates UI
 */
async function loadSettings() {
  const settings = await getSettings();
  
  // Update field type toggles
  const toggles = document.querySelectorAll('[data-field]');
  toggles.forEach(toggle => {
    const field = toggle.dataset.field;
    if (settings.enabledFieldTypes && settings.enabledFieldTypes[field] !== undefined) {
      toggle.checked = settings.enabledFieldTypes[field];
    }
  });
  
  // Update locale select
  const localeSelect = document.getElementById('locale');
  if (localeSelect && settings.locale) {
    localeSelect.value = settings.locale;
  }
  
  // Update debug mode
  const debugToggle = document.getElementById('debugMode');
  if (debugToggle) {
    debugToggle.checked = settings.debugMode || false;
  }
}

/**
 * Sets up event listeners for all form elements
 */
function setupEventListeners() {
  // Field type toggles
  const toggles = document.querySelectorAll('[data-field]');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', handleFieldToggle);
  });
  
  // Locale select
  const localeSelect = document.getElementById('locale');
  if (localeSelect) {
    localeSelect.addEventListener('change', handleLocaleChange);
  }
  
  // Debug mode toggle
  const debugToggle = document.getElementById('debugMode');
  if (debugToggle) {
    debugToggle.addEventListener('change', handleDebugToggle);
  }
}

/**
 * Handles field type toggle changes
 */
async function handleFieldToggle(event) {
  const field = event.target.dataset.field;
  const enabled = event.target.checked;
  
  const settings = await getSettings();
  
  if (!settings.enabledFieldTypes) {
    settings.enabledFieldTypes = {};
  }
  
  settings.enabledFieldTypes[field] = enabled;
  
  await saveSettings(settings);
  showSaveToast();
}

/**
 * Handles locale selection changes
 */
async function handleLocaleChange(event) {
  const locale = event.target.value;
  
  const settings = await getSettings();
  settings.locale = locale;
  
  await saveSettings(settings);
  showSaveToast();
}

/**
 * Handles debug mode toggle
 */
async function handleDebugToggle(event) {
  const enabled = event.target.checked;
  
  const settings = await getSettings();
  settings.debugMode = enabled;
  
  await saveSettings(settings);
  showSaveToast();
}

/**
 * Gets settings from storage
 */
function getSettings() {
  return new Promise((resolve) => {
    const defaultSettings = {
      enabledFieldTypes: {
        firstName: true, lastName: true, fullName: true,
        email: true, phone: true, address: true,
        addressLine2: true, city: true, state: true,
        zip: true, country: true, company: true,
        date: true, url: true, username: true,
        password: true, number: true, textarea: true
      },
      locale: 'US',
      debugMode: false
    };
    
    chrome.storage.sync.get(defaultSettings, (settings) => {
      resolve(settings);
    });
  });
}

/**
 * Saves settings to storage
 */
function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(settings, resolve);
  });
}

/**
 * Shows the save confirmation toast
 */
function showSaveToast() {
  const toast = document.getElementById('saveToast');
  if (!toast) return;
  
  // Remove hidden class to show
  toast.classList.remove('hidden');
  
  // Hide after delay
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}
