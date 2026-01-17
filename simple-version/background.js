// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'fillForm',
    title: 'Fill Form with Test Data',
    contexts: ['editable']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'fillForm') {
    chrome.tabs.sendMessage(tab.id, { action: 'fill' });
  }
});
