/**
 * Field Classifier Module
 * Classifies form fields based on various attributes and context
 */

const FieldClassifier = (() => {
  /**
   * Classifies a form field and returns the detected field type
   * @param {HTMLElement} element - The form field element
   * @returns {string|null} - The classified field type or null
   */
  const classify = (element) => {
    if (!element) return null;

    const tagName = element.tagName.toLowerCase();
    const inputType = element.type?.toLowerCase() || '';
    
    // Handle textarea elements
    if (tagName === 'textarea') {
      return classifyByAttributes(element) || 'textarea';
    }

    // Handle select elements
    if (tagName === 'select') {
      return classifySelect(element);
    }

    // Handle input elements
    if (tagName === 'input') {
      return classifyInput(element, inputType);
    }

    return null;
  };

  /**
   * Classifies input elements based on type and attributes
   */
  const classifyInput = (element, inputType) => {
    // Check input type first (highest priority)
    const typeBasedField = getFieldByInputType(inputType);
    if (typeBasedField) return typeBasedField;

    // Check by attributes (name, id, autocomplete)
    const attributeBasedField = classifyByAttributes(element);
    if (attributeBasedField) return attributeBasedField;

    // Check associated label
    const labelBasedField = classifyByLabel(element);
    if (labelBasedField) return labelBasedField;

    // Check placeholder
    const placeholderBasedField = classifyByPlaceholder(element);
    if (placeholderBasedField) return placeholderBasedField;

    // Default to text for text-like inputs
    if (['text', ''].includes(inputType)) {
      return 'text';
    }

    return null;
  };

  /**
   * Gets field type based on input type attribute
   */
  const getFieldByInputType = (inputType) => {
    const typeMap = {
      'email': 'email',
      'tel': 'phone',
      'url': 'url',
      'number': 'number',
      'date': 'date',
      'password': 'password'
    };
    return typeMap[inputType] || null;
  };

  /**
   * Classifies field by checking name, id, and autocomplete attributes
   */
  const classifyByAttributes = (element) => {
    const name = (element.name || '').toLowerCase();
    const id = (element.id || '').toLowerCase();
    const autocomplete = (element.autocomplete || '').toLowerCase();
    
    const combinedText = `${name} ${id} ${autocomplete}`;
    
    return matchPatterns(combinedText);
  };

  /**
   * Classifies field by associated label text
   */
  const classifyByLabel = (element) => {
    const label = findAssociatedLabel(element);
    if (!label) return null;
    
    const labelText = label.textContent.toLowerCase().trim();
    return matchPatterns(labelText, 'labels');
  };

  /**
   * Finds the label element associated with a form field
   */
  const findAssociatedLabel = (element) => {
    // Check for label with 'for' attribute
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) return label;
    }

    // Check for parent label
    const parentLabel = element.closest('label');
    if (parentLabel) return parentLabel;

    // Check for adjacent label
    const prevSibling = element.previousElementSibling;
    if (prevSibling?.tagName === 'LABEL') return prevSibling;

    return null;
  };

  /**
   * Classifies field by placeholder text
   */
  const classifyByPlaceholder = (element) => {
    const placeholder = (element.placeholder || '').toLowerCase();
    if (!placeholder) return null;
    
    return matchPatterns(placeholder, 'placeholders');
  };

  /**
   * Matches text against field patterns
   */
  const matchPatterns = (text, patternType = 'patterns') => {
    if (!text) return null;

    for (const [fieldType, config] of Object.entries(FIELD_PATTERNS)) {
      const patterns = config[patternType] || config.patterns;
      
      for (const pattern of patterns) {
        if (text.includes(pattern)) {
          return fieldType;
        }
      }
    }
    return null;
  };

  /**
   * Classifies select elements based on options and attributes
   */
  const classifySelect = (element) => {
    const attributeMatch = classifyByAttributes(element);
    if (attributeMatch) return attributeMatch;

    const labelMatch = classifyByLabel(element);
    if (labelMatch) return labelMatch;

    // Analyze options for hints
    const options = Array.from(element.options);
    if (options.length > 0) {
      const optionTexts = options.map(o => o.text.toLowerCase()).join(' ');
      
      if (containsStateOptions(optionTexts)) return 'state';
      if (containsCountryOptions(optionTexts)) return 'country';
    }

    return 'select';
  };

  /**
   * Checks if options look like US states
   */
  const containsStateOptions = (text) => {
    const stateIndicators = ['california', 'texas', 'florida', 'new york', 'select state'];
    return stateIndicators.some(indicator => text.includes(indicator));
  };

  /**
   * Checks if options look like countries
   */
  const containsCountryOptions = (text) => {
    const countryIndicators = ['united states', 'canada', 'united kingdom', 'select country'];
    return countryIndicators.some(indicator => text.includes(indicator));
  };

  return { classify };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.FieldClassifier = FieldClassifier;
}
