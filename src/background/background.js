/**
 * Background Service Worker
 * Handles context menu creation and message routing
 */

const CONTEXT_MENU_ID = 'smartFormFiller';

/**
 * Creates the context menu item
 */
const createContextMenu = () => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'Fill Form with Test Data',
    contexts: ['editable']
  });
};

/**
 * Handles context menu click
 */
const handleContextMenuClick = async (info, tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID) return;
  
  try {
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'fillForm' });
    console.log('[SmartFormFiller] Fill result:', response);
  } catch (error) {
    console.error('[SmartFormFiller] Error sending message:', error);
  }
};

/**
 * Initialize extension on install
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('[SmartFormFiller] Extension installed');
  createContextMenu();
  
  // Set default settings on install
  chrome.storage.sync.get(null, (items) => {
    if (Object.keys(items).length === 0) {
      const defaultSettings = {
        enabledFieldTypes: {
          firstName: true,
          lastName: true,
          fullName: true,
          email: true,
          phone: true,
          address: true,
          addressLine2: true,
          city: true,
          state: true,
          zip: true,
          country: true,
          company: true,
          date: true,
          url: true,
          username: true,
          password: true,
          number: true,
          textarea: true
        },
        locale: 'US',
        debugMode: false
      };
      chrome.storage.sync.set(defaultSettings);
    }
  });
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);

// Re-create context menu on startup (in case it was removed)
chrome.runtime.onStartup.addListener(() => {
  createContextMenu();
});
