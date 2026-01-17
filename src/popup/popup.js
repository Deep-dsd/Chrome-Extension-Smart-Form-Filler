/**
 * Popup Script
 * Handles popup UI interactions and settings
 */

document.addEventListener('DOMContentLoaded', init);

/**
 * Initializes the popup
 */
async function init() {
  await loadSettings();
  await loadLastAction();
  setupEventListeners();
}

/**
 * Loads settings from storage and updates UI
 */
async function loadSettings() {
  const settings = await getSettings();
  
  // Update toggle states based on settings
  const toggleNames = document.getElementById('toggleNames');
  const toggleContact = document.getElementById('toggleContact');
  const toggleAddress = document.getElementById('toggleAddress');
  
  if (settings.enabledFieldTypes) {
    toggleNames.checked = settings.enabledFieldTypes.firstName !== false && 
                          settings.enabledFieldTypes.lastName !== false;
    toggleContact.checked = settings.enabledFieldTypes.email !== false && 
                            settings.enabledFieldTypes.phone !== false;
    toggleAddress.checked = settings.enabledFieldTypes.address !== false && 
                            settings.enabledFieldTypes.city !== false;
  }
}

/**
 * Loads and displays last fill action
 */
async function loadLastAction() {
  const data = await chrome.storage.local.get('lastFillAction');
  const statusText = document.getElementById('statusText');
  const lastAction = document.getElementById('lastAction');
  
  if (data.lastFillAction) {
    const { timestamp, filled, total } = data.lastFillAction;
    const timeAgo = getTimeAgo(timestamp);
    
    statusText.textContent = `Filled ${filled}/${total} fields ${timeAgo}`;
    lastAction.classList.add('success');
  } else {
    statusText.textContent = 'Ready to fill forms';
  }
}

/**
 * Sets up event listeners for UI elements
 */
function setupEventListeners() {
  // Toggle switches
  document.getElementById('toggleNames').addEventListener('change', handleToggleNames);
  document.getElementById('toggleContact').addEventListener('change', handleToggleContact);
  document.getElementById('toggleAddress').addEventListener('change', handleToggleAddress);
  
  // Options link
  document.getElementById('openOptions').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}

/**
 * Handles names toggle change
 */
async function handleToggleNames(event) {
  const enabled = event.target.checked;
  const settings = await getSettings();
  
  settings.enabledFieldTypes.firstName = enabled;
  settings.enabledFieldTypes.lastName = enabled;
  settings.enabledFieldTypes.fullName = enabled;
  
  await saveSettings(settings);
}

/**
 * Handles contact toggle change
 */
async function handleToggleContact(event) {
  const enabled = event.target.checked;
  const settings = await getSettings();
  
  settings.enabledFieldTypes.email = enabled;
  settings.enabledFieldTypes.phone = enabled;
  
  await saveSettings(settings);
}

/**
 * Handles address toggle change
 */
async function handleToggleAddress(event) {
  const enabled = event.target.checked;
  const settings = await getSettings();
  
  settings.enabledFieldTypes.address = enabled;
  settings.enabledFieldTypes.addressLine2 = enabled;
  settings.enabledFieldTypes.city = enabled;
  settings.enabledFieldTypes.state = enabled;
  settings.enabledFieldTypes.zip = enabled;
  
  await saveSettings(settings);
}

/**
 * Gets settings from storage
 */
function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (settings) => {
      // Ensure enabledFieldTypes exists
      if (!settings.enabledFieldTypes) {
        settings.enabledFieldTypes = {
          firstName: true, lastName: true, fullName: true,
          email: true, phone: true, address: true,
          addressLine2: true, city: true, state: true,
          zip: true, country: true, company: true,
          date: true, url: true, username: true,
          password: true, number: true, textarea: true
        };
      }
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
 * Formats timestamp to relative time
 */
function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
