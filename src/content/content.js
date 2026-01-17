/**
 * Content Script - Main Entry Point
 * Orchestrates form filling based on context menu actions
 */

(() => {
  // Track the last right-clicked element
  let lastRightClickedElement = null;

  /**
   * Initializes the content script
   */
  const init = () => {
    setupRightClickListener();
    setupMessageListener();
    loadSettings();
    DEBUG.log('Smart Form Filler content script initialized');
  };

  /**
   * Sets up listener to track right-clicked elements
   */
  const setupRightClickListener = () => {
    document.addEventListener('contextmenu', (event) => {
      const target = event.target;
      
      if (isFormField(target)) {
        lastRightClickedElement = target;
        DEBUG.log('Right-clicked on form field:', target.tagName, target.name || target.id);
      }
    }, true);
  };

  /**
   * Checks if an element is a form field
   */
  const isFormField = (element) => {
    if (!element) return false;
    
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea' || tagName === 'select') return true;
    
    if (tagName === 'input') {
      const type = element.type.toLowerCase();
      const excludedTypes = ['hidden', 'submit', 'button', 'reset', 'file', 'image'];
      return !excludedTypes.includes(type);
    }
    
    return false;
  };

  /**
   * Sets up listener for messages from background script
   */
  const setupMessageListener = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      DEBUG.log('Received message:', request.action);
      
      if (request.action === 'fillForm') {
        handleFillForm(sendResponse);
        return true; // Keep channel open for async response
      }
      
      if (request.action === 'getSettings') {
        chrome.storage.sync.get(DEFAULT_SETTINGS, sendResponse);
        return true;
      }
    });
  };

  /**
   * Handles the fill form action
   */
  const handleFillForm = async (sendResponse) => {
    try {
      if (!lastRightClickedElement) {
        sendResponse({ success: false, message: 'No form field selected' });
        return;
      }

      const settings = await getSettings();
      const result = FormFiller.fillForm(lastRightClickedElement, settings);
      
      // Store last fill action for popup
      await chrome.storage.local.set({
        lastFillAction: {
          timestamp: Date.now(),
          filled: result.filled,
          total: result.total
        }
      });

      sendResponse({
        success: true,
        message: `Filled ${result.filled} of ${result.total} fields`,
        result
      });
    } catch (error) {
      DEBUG.error('Fill form error:', error);
      sendResponse({ success: false, message: error.message });
    }
  };

  /**
   * Loads user settings and updates debug mode
   */
  const loadSettings = async () => {
    try {
      const settings = await getSettings();
      DEBUG.enabled = settings.debugMode || false;
    } catch (error) {
      DEBUG.error('Failed to load settings:', error);
    }
  };

  /**
   * Gets settings from storage
   */
  const getSettings = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
        resolve(settings);
      });
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
