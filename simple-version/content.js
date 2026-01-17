// Store the element that was right-clicked
let clickedElement = null;

// Track right-clicks on form fields
document.addEventListener('contextmenu', (e) => {
  if (e.target.matches('input, textarea, select')) {
    clickedElement = e.target;
  }
});

// Listen for fill command from background script
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'fill' && clickedElement) {
    fillForm(clickedElement);
  }
});

// Main function: find the form and fill all fields
function fillForm(element) {
  const form = element.closest('form') || document.body;
  const fields = form.querySelectorAll('input, textarea, select');
  
  // Generate consistent data for this fill
  const data = generateData();
  
  fields.forEach(field => {
    if (field.disabled || field.readOnly) return;
    fillField(field, data);
  });
}

// Fill a single field based on its type
function fillField(field, data) {
  const type = detectFieldType(field);
  let value = '';
  
  switch (type) {
    case 'email':     value = data.email; break;
    case 'phone':     value = data.phone; break;
    case 'firstName': value = data.firstName; break;
    case 'lastName':  value = data.lastName; break;
    case 'name':      value = data.fullName; break;
    case 'address':   value = data.address; break;
    case 'city':      value = data.city; break;
    case 'state':     value = data.state; break;
    case 'zip':       value = data.zip; break;
    case 'company':   value = data.company; break;
    case 'url':       value = data.url; break;
    case 'password':  value = data.password; break;
    case 'textarea':  value = data.text; break;
    case 'number':    value = String(Math.floor(Math.random() * 100)); break;
    case 'date':      value = '1990-05-15'; break;
    case 'select':    selectRandomOption(field); return;
    default:          value = data.fullName;
  }
  
  if (value) {
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// Detect what type of field this is
function detectFieldType(field) {
  const tag = field.tagName.toLowerCase();
  if (tag === 'select') return 'select';
  if (tag === 'textarea') return 'textarea';
  
  const type = field.type?.toLowerCase() || '';
  if (type === 'email') return 'email';
  if (type === 'tel') return 'phone';
  if (type === 'url') return 'url';
  if (type === 'password') return 'password';
  if (type === 'number') return 'number';
  if (type === 'date') return 'date';
  
  // Check name, id, placeholder for clues
  const hint = (field.name + field.id + field.placeholder).toLowerCase();
  
  if (hint.includes('email')) return 'email';
  if (hint.includes('phone') || hint.includes('tel')) return 'phone';
  if (hint.includes('first') && hint.includes('name')) return 'firstName';
  if (hint.includes('last') && hint.includes('name')) return 'lastName';
  if (hint.includes('name')) return 'name';
  if (hint.includes('address') || hint.includes('street')) return 'address';
  if (hint.includes('city')) return 'city';
  if (hint.includes('state') || hint.includes('province')) return 'state';
  if (hint.includes('zip') || hint.includes('postal')) return 'zip';
  if (hint.includes('company') || hint.includes('org')) return 'company';
  if (hint.includes('url') || hint.includes('website')) return 'url';
  
  return 'text';
}

// Select a random option from a dropdown
function selectRandomOption(select) {
  const options = Array.from(select.options).filter(o => o.value);
  if (options.length > 1) {
    select.value = options[Math.floor(Math.random() * options.length)].value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

// Generate fake data
function generateData() {
  const firstNames = ['James', 'Emma', 'Michael', 'Olivia', 'William', 'Sophia', 'Alexander', 'Ava'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine St', 'Elm Rd'];
  const cities = [
    { city: 'New York', state: 'NY', zip: '10001' },
    { city: 'Los Angeles', state: 'CA', zip: '90001' },
    { city: 'Chicago', state: 'IL', zip: '60601' },
    { city: 'Houston', state: 'TX', zip: '77001' },
    { city: 'Seattle', state: 'WA', zip: '98101' }
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const location = cities[Math.floor(Math.random() * cities.length)];
  const streetNum = Math.floor(Math.random() * 9000) + 100;
  const street = streets[Math.floor(Math.random() * streets.length)];
  
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    address: `${streetNum} ${street}`,
    city: location.city,
    state: location.state,
    zip: location.zip,
    company: 'Acme Corporation',
    url: 'https://www.example.com',
    password: 'Test@123!',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
}
