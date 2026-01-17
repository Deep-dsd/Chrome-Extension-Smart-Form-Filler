/**
 * Form Filler Module
 * Handles the actual filling of form fields with generated data
 */

const FormFiller = (() => {
  /**
   * Fills a single form field with appropriate data
   * @param {Object} fieldInfo - Analyzed field information
   * @param {Object} settings - User settings for enabled fields
   * @returns {boolean} - Whether the field was filled
   */
  const fillField = (fieldInfo, settings) => {
    const { element, fieldType, tagName } = fieldInfo;
    
    // Check if this field type is enabled
    if (!isFieldTypeEnabled(fieldType, settings)) {
      DEBUG.log(`Skipping disabled field type: ${fieldType}`);
      return false;
    }

    try {
      if (tagName === 'select') {
        return fillSelect(element, fieldType);
      }
      return fillInput(element, fieldType);
    } catch (error) {
      DEBUG.error(`Error filling field: ${error.message}`);
      return false;
    }
  };

  /**
   * Checks if a field type is enabled in settings
   */
  const isFieldTypeEnabled = (fieldType, settings) => {
    if (!settings || !settings.enabledFieldTypes) return true;
    return settings.enabledFieldTypes[fieldType] !== false;
  };

  /**
   * Fills an input or textarea element
   */
  const fillInput = (element, fieldType) => {
    const value = DataGenerator.generate(fieldType);
    if (!value) return false;

    // Set the value
    element.value = value;
    
    // Trigger input events for reactive frameworks
    triggerInputEvents(element);
    
    DEBUG.log(`Filled ${fieldType} field with: ${value}`);
    return true;
  };

  /**
   * Fills a select element
   */
  const fillSelect = (element, fieldType) => {
    const value = DataGenerator.generateSelectValue(element, fieldType);
    if (!value) return false;

    element.value = value;
    triggerInputEvents(element);
    
    DEBUG.log(`Selected value: ${value} for ${fieldType} field`);
    return true;
  };

  /**
   * Triggers necessary input events for frameworks
   */
  const triggerInputEvents = (element) => {
    // Create and dispatch events to notify frameworks
    const events = ['input', 'change', 'blur'];
    
    events.forEach(eventType => {
      const event = new Event(eventType, { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
    });
  };

  /**
   * Fills all fields in a form
   * @param {HTMLElement} targetElement - The clicked element
   * @param {Object} settings - User settings
   * @returns {Object} - Fill result statistics
   */
  const fillForm = (targetElement, settings = {}) => {
    // Reset data generator session for consistent data
    DataGenerator.resetSession();
    
    const fields = FormDetector.getAnalyzedFields(targetElement);
    
    const result = {
      total: fields.length,
      filled: 0,
      skipped: 0,
      errors: 0
    };

    fields.forEach(fieldInfo => {
      try {
        const filled = fillField(fieldInfo, settings);
        if (filled) {
          result.filled++;
        } else {
          result.skipped++;
        }
      } catch (error) {
        DEBUG.error(`Error processing field: ${error.message}`);
        result.errors++;
      }
    });

    DEBUG.log(`Form fill complete: ${result.filled}/${result.total} fields filled`);
    return result;
  };

  /**
   * Fills only the single clicked field
   * @param {HTMLElement} element - The form field element
   * @param {Object} settings - User settings
   * @returns {boolean} - Whether the field was filled
   */
  const fillSingleField = (element, settings = {}) => {
    DataGenerator.resetSession();
    
    const fieldInfo = FormDetector.analyzeField(element);
    return fillField(fieldInfo, settings);
  };

  return {
    fillForm,
    fillSingleField,
    fillField
  };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.FormFiller = FormFiller;
}
