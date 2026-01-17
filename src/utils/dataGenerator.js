/**
 * Data Generator Module
 * Generates realistic fake data for various field types
 */

const DataGenerator = (() => {
  // Cache for consistent data within a single form fill session
  let sessionCache = {};

  /**
   * Resets the session cache (call before filling a new form)
   */
  const resetSession = () => {
    const firstName = getRandomItem(DATA_TEMPLATES.firstNames);
    const lastName = getRandomItem(DATA_TEMPLATES.lastNames);
    const location = getRandomItem(DATA_TEMPLATES.cities);
    
    sessionCache = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      location,
      company: getRandomItem(DATA_TEMPLATES.companies)
    };
  };

  /**
   * Gets a random item from an array
   */
  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  /**
   * Gets a random number in a range
   */
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Generates data for a specific field type
   * @param {string} fieldType - The type of field
   * @returns {string} - Generated data
   */
  const generate = (fieldType) => {
    const generators = {
      firstName: () => sessionCache.firstName,
      lastName: () => sessionCache.lastName,
      fullName: () => sessionCache.fullName,
      email: () => sessionCache.email,
      phone: generatePhone,
      address: generateAddress,
      addressLine2: generateAddressLine2,
      city: () => sessionCache.location.city,
      state: () => sessionCache.location.state,
      zip: () => sessionCache.location.zip,
      country: () => 'United States',
      company: () => sessionCache.company,
      date: generateDate,
      url: generateUrl,
      username: generateUsername,
      password: generatePassword,
      number: () => String(getRandomNumber(1, 100)),
      textarea: generateLoremIpsum,
      text: generateGenericText
    };

    const generator = generators[fieldType];
    return generator ? generator() : '';
  };

  /**
   * Generates an email address
   */
  const generateEmail = (firstName, lastName) => {
    const domain = getRandomItem(DATA_TEMPLATES.emailDomains);
    const formats = [
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${getRandomNumber(1, 99)}`
    ];
    return `${getRandomItem(formats)}@${domain}`;
  };

  /**
   * Generates a US phone number in (XXX) XXX-XXXX format
   */
  const generatePhone = () => {
    const areaCode = getRandomNumber(200, 999);
    const exchange = getRandomNumber(200, 999);
    const subscriber = getRandomNumber(1000, 9999);
    return `(${areaCode}) ${exchange}-${subscriber}`;
  };

  /**
   * Generates a street address
   */
  const generateAddress = () => {
    const streetNumber = getRandomNumber(100, 9999);
    const streetName = getRandomItem(DATA_TEMPLATES.streetNames);
    return `${streetNumber} ${streetName}`;
  };

  /**
   * Generates an address line 2 (apartment/suite)
   */
  const generateAddressLine2 = () => {
    const types = ['Apt', 'Suite', 'Unit', '#'];
    const type = getRandomItem(types);
    const number = getRandomNumber(1, 999);
    return `${type} ${number}`;
  };

  /**
   * Generates a date in YYYY-MM-DD format
   */
  const generateDate = () => {
    const year = getRandomNumber(1970, 2005);
    const month = String(getRandomNumber(1, 12)).padStart(2, '0');
    const day = String(getRandomNumber(1, 28)).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Generates a URL
   */
  const generateUrl = () => {
    const domains = ['example', 'mysite', 'portfolio', 'website'];
    const tlds = ['.com', '.org', '.net', '.io'];
    return `https://www.${getRandomItem(domains)}${getRandomItem(tlds)}`;
  };

  /**
   * Generates a username
   */
  const generateUsername = () => {
    const firstName = sessionCache.firstName.toLowerCase();
    const suffix = getRandomNumber(1, 9999);
    return `${firstName}${suffix}`;
  };

  /**
   * Generates a password (simple pattern for testing)
   */
  const generatePassword = () => {
    const words = ['Test', 'Demo', 'Sample'];
    const word = getRandomItem(words);
    const number = getRandomNumber(100, 999);
    return `${word}@${number}!`;
  };

  /**
   * Generates lorem ipsum text for textareas
   */
  const generateLoremIpsum = () => {
    const wordCount = getRandomNumber(15, 30);
    const words = [];
    
    for (let i = 0; i < wordCount; i++) {
      words.push(getRandomItem(DATA_TEMPLATES.loremWords));
    }
    
    let text = words.join(' ');
    // Capitalize first letter and add period
    text = text.charAt(0).toUpperCase() + text.slice(1) + '.';
    return text;
  };

  /**
   * Generates generic text for unclassified text fields
   */
  const generateGenericText = () => {
    const options = [
      sessionCache.fullName,
      sessionCache.company,
      'Test Data',
      'Sample Entry'
    ];
    return getRandomItem(options);
  };

  /**
   * Generates a value for select elements
   */
  const generateSelectValue = (element, fieldType) => {
    const options = Array.from(element.options);
    if (options.length <= 1) return null;

    // Skip empty/placeholder options
    const validOptions = options.filter(opt => opt.value && opt.value !== '');
    if (validOptions.length === 0) return null;

    // For state fields, try to match our cached location
    if (fieldType === 'state') {
      const stateOption = validOptions.find(
        opt => opt.value === sessionCache.location.state || 
               opt.text.includes(sessionCache.location.state)
      );
      if (stateOption) return stateOption.value;
    }

    // Return a random valid option
    return getRandomItem(validOptions).value;
  };

  return {
    generate,
    generateSelectValue,
    resetSession
  };
})();

// Make available globally
if (typeof window !== 'undefined') {
  window.DataGenerator = DataGenerator;
}
