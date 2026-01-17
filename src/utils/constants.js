/**
 * Constants and patterns for form field detection and data generation
 * Central configuration file for the Smart Form Filler extension
 */

const FIELD_PATTERNS = {
  firstName: {
    patterns: ['first_name', 'firstname', 'first-name', 'fname', 'given_name', 'givenname'],
    placeholders: ['first name', 'given name'],
    labels: ['first name', 'given name', 'prénom']
  },
  lastName: {
    patterns: ['last_name', 'lastname', 'last-name', 'lname', 'surname', 'family_name', 'familyname'],
    placeholders: ['last name', 'family name', 'surname'],
    labels: ['last name', 'family name', 'surname']
  },
  fullName: {
    patterns: ['full_name', 'fullname', 'full-name', 'name', 'your_name', 'yourname'],
    placeholders: ['full name', 'your name', 'name'],
    labels: ['full name', 'your name', 'name']
  },
  email: {
    patterns: ['email', 'e-mail', 'mail', 'email_address', 'emailaddress'],
    placeholders: ['email', 'e-mail', 'email address'],
    labels: ['email', 'e-mail', 'email address'],
    types: ['email']
  },
  phone: {
    patterns: ['phone', 'telephone', 'tel', 'mobile', 'cell', 'phone_number', 'phonenumber'],
    placeholders: ['phone', 'telephone', 'mobile', 'cell'],
    labels: ['phone', 'telephone', 'mobile number'],
    types: ['tel']
  },
  address: {
    patterns: ['address', 'street', 'street_address', 'streetaddress', 'address1', 'address_line1'],
    placeholders: ['address', 'street address', 'street'],
    labels: ['address', 'street address', 'street']
  },
  addressLine2: {
    patterns: ['address2', 'address_line2', 'apt', 'suite', 'unit'],
    placeholders: ['apt', 'suite', 'unit', 'apartment'],
    labels: ['address line 2', 'apartment', 'suite']
  },
  city: {
    patterns: ['city', 'town', 'locality'],
    placeholders: ['city', 'town'],
    labels: ['city', 'town']
  },
  state: {
    patterns: ['state', 'province', 'region', 'state_province'],
    placeholders: ['state', 'province', 'region'],
    labels: ['state', 'province', 'region']
  },
  zip: {
    patterns: ['zip', 'postal', 'postcode', 'zip_code', 'zipcode', 'postal_code'],
    placeholders: ['zip', 'postal code', 'zip code'],
    labels: ['zip', 'postal code', 'zip code']
  },
  country: {
    patterns: ['country', 'nation'],
    placeholders: ['country'],
    labels: ['country']
  },
  company: {
    patterns: ['company', 'organization', 'org', 'employer', 'business', 'company_name'],
    placeholders: ['company', 'organization', 'business'],
    labels: ['company', 'organization', 'employer']
  },
  date: {
    patterns: ['date', 'dob', 'birthdate', 'birth_date', 'birthday'],
    placeholders: ['date', 'mm/dd/yyyy', 'dd/mm/yyyy'],
    labels: ['date', 'date of birth', 'birthday'],
    types: ['date']
  },
  url: {
    patterns: ['url', 'website', 'web', 'homepage', 'site'],
    placeholders: ['website', 'url', 'https://'],
    labels: ['website', 'url', 'web address'],
    types: ['url']
  },
  username: {
    patterns: ['username', 'user_name', 'user-name', 'login', 'userid', 'user_id'],
    placeholders: ['username', 'user name'],
    labels: ['username', 'user name', 'login']
  },
  password: {
    patterns: ['password', 'pass', 'pwd', 'passwd'],
    placeholders: ['password'],
    labels: ['password'],
    types: ['password']
  },
  number: {
    patterns: ['number', 'quantity', 'amount', 'count', 'age'],
    placeholders: [],
    labels: [],
    types: ['number']
  },
  textarea: {
    patterns: ['message', 'comment', 'description', 'bio', 'about', 'notes', 'feedback'],
    placeholders: ['message', 'comment', 'description', 'tell us'],
    labels: ['message', 'comment', 'description', 'about']
  }
};

const DATA_TEMPLATES = {
  firstNames: [
    'James', 'Emma', 'Michael', 'Olivia', 'William', 'Ava', 'Alexander', 'Sophia',
    'Benjamin', 'Isabella', 'Daniel', 'Mia', 'Matthew', 'Charlotte', 'Ethan', 'Amelia',
    'David', 'Harper', 'Joseph', 'Evelyn', 'Andrew', 'Abigail', 'Ryan', 'Emily',
    'Christopher', 'Elizabeth', 'Joshua', 'Sofia', 'Nathan', 'Avery'
  ],
  lastNames: [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
  ],
  streetNames: [
    'Main Street', 'Oak Avenue', 'Maple Drive', 'Cedar Lane', 'Pine Street',
    'Elm Road', 'Washington Boulevard', 'Park Avenue', 'Lake Drive', 'Hill Street',
    'Forest Lane', 'River Road', 'Sunset Boulevard', 'Highland Avenue', 'Valley Drive',
    'Spring Street', 'Garden Lane', 'Meadow Road', 'Brook Street', 'Ridge Avenue'
  ],
  cities: [
    { city: 'New York', state: 'NY', zip: '10001' },
    { city: 'Los Angeles', state: 'CA', zip: '90001' },
    { city: 'Chicago', state: 'IL', zip: '60601' },
    { city: 'Houston', state: 'TX', zip: '77001' },
    { city: 'Phoenix', state: 'AZ', zip: '85001' },
    { city: 'Philadelphia', state: 'PA', zip: '19101' },
    { city: 'San Antonio', state: 'TX', zip: '78201' },
    { city: 'San Diego', state: 'CA', zip: '92101' },
    { city: 'Dallas', state: 'TX', zip: '75201' },
    { city: 'San Jose', state: 'CA', zip: '95101' },
    { city: 'Austin', state: 'TX', zip: '78701' },
    { city: 'Jacksonville', state: 'FL', zip: '32099' },
    { city: 'Fort Worth', state: 'TX', zip: '76101' },
    { city: 'Columbus', state: 'OH', zip: '43085' },
    { city: 'Charlotte', state: 'NC', zip: '28201' },
    { city: 'Seattle', state: 'WA', zip: '98101' },
    { city: 'Denver', state: 'CO', zip: '80201' },
    { city: 'Boston', state: 'MA', zip: '02101' },
    { city: 'Portland', state: 'OR', zip: '97201' },
    { city: 'Atlanta', state: 'GA', zip: '30301' }
  ],
  companies: [
    'Acme Corporation', 'TechVentures Inc', 'Global Solutions LLC', 'Innovate Labs',
    'Summit Enterprises', 'Nexus Technologies', 'Horizon Group', 'Catalyst Partners',
    'Vertex Industries', 'Quantum Dynamics', 'Atlas Holdings', 'Pioneer Systems',
    'Apex Consulting', 'Evergreen Solutions', 'Fusion Technologies', 'Synergy Corp',
    'Elevate Partners', 'Spectrum Innovations', 'Pinnacle Group', 'Prime Industries'
  ],
  emailDomains: ['example.com', 'test.com', 'mail.test', 'demo.org', 'sample.net'],
  loremWords: [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo'
  ]
};

const DEFAULT_SETTINGS = {
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

const DEBUG = {
  enabled: false,
  log: function(...args) {
    if (this.enabled) {
      console.log('[SmartFormFiller]', ...args);
    }
  },
  error: function(...args) {
    if (this.enabled) {
      console.error('[SmartFormFiller]', ...args);
    }
  }
};

// Make constants available globally for content scripts
if (typeof window !== 'undefined') {
  window.FIELD_PATTERNS = FIELD_PATTERNS;
  window.DATA_TEMPLATES = DATA_TEMPLATES;
  window.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
  window.DEBUG = DEBUG;
}
