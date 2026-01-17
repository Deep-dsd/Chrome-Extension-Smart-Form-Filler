/**
 * Form Detector Module
 * Detects and analyzes form fields on the page
 */

const FormDetector = (() => {
  /**
   * Finds all fillable form fields in the document or a container
   * @param {HTMLElement} container - Optional container to search within
   * @returns {Array<HTMLElement>} - Array of form field elements
   */
  const findFormFields = (container = document) => {
    const selectors = [
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"]):not([type="image"]):not([type="checkbox"]):not([type="radio"])',
      'textarea',
      'select'
    ];

    const elements = container.querySelectorAll(selectors.join(', '));
    return Array.from(elements).filter(isVisible);
  };

  /**
   * Checks if an element is visible on the page
   */
  const isVisible = (element) => {
    if (!element) return false;
    
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  /**
   * Finds the form containing a specific element
   * @param {HTMLElement} element - The element to find the form for
   * @returns {HTMLFormElement|null} - The containing form or null
   */
  const findContainingForm = (element) => {
    return element.closest('form');
  };

  /**
   * Gets all fields from the form containing the target element,
   * or all fields in a reasonable container if no form exists
   * @param {HTMLElement} targetElement - The clicked element
   * @returns {Array<HTMLElement>} - Array of form fields
   */
  const getFormFields = (targetElement) => {
    // First try to find a containing form
    const form = findContainingForm(targetElement);
    if (form) {
      return findFormFields(form);
    }

    // If no form, look for a reasonable container
    const container = findFieldContainer(targetElement);
    return findFormFields(container);
  };

  /**
   * Finds a reasonable container for fields when no form exists
   */
  const findFieldContainer = (element) => {
    // Try common container elements
    const containerSelectors = [
      '.form-container',
      '.form-group',
      '.form-wrapper',
      '[role="form"]',
      'fieldset',
      'section',
      'article',
      'main'
    ];

    for (const selector of containerSelectors) {
      const container = element.closest(selector);
      if (container) return container;
    }

    // Fall back to parent with multiple inputs
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
      const inputs = findFormFields(parent);
      if (inputs.length > 1) return parent;
      parent = parent.parentElement;
    }

    return document;
  };

  /**
   * Analyzes a form field and returns its classification
   * @param {HTMLElement} element - The form field element
   * @returns {Object} - Field analysis result
   */
  const analyzeField = (element) => {
    const fieldType = FieldClassifier.classify(element);
    
    return {
      element,
      tagName: element.tagName.toLowerCase(),
      inputType: element.type || null,
      fieldType,
      name: element.name || null,
      id: element.id || null,
      placeholder: element.placeholder || null,
      isRequired: element.required || element.hasAttribute('required'),
      isDisabled: element.disabled || element.hasAttribute('disabled'),
      isReadOnly: element.readOnly || element.hasAttribute('readonly')
    };
  };

  /**
   * Gets analyzed field data for all fields in a form
   * @param {HTMLElement} targetElement - The clicked element
   * @returns {Array<Object>} - Array of analyzed field objects
   */
  const getAnalyzedFields = (targetElement) => {
    const fields = getFormFields(targetElement);
    return fields
      .map(analyzeField)
      .filter(field => !field.isDisabled && !field.isReadOnly);
  };

  return {
    findFormFields,
    findContainingForm,
    getFormFields,
    analyzeField,
    getAnalyzedFields
  };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.FormDetector = FormDetector;
}
