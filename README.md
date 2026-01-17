# Smart Form Filler

A Chrome extension that auto-fills web forms with realistic test data via right-click context menu. Perfect for developers, QA engineers, and anyone who needs to quickly test forms with realistic sample data.

![Smart Form Filler](./assets/icons/icon128.png)

## Features

- 🖱️ **Right-Click to Fill** - Simple context menu integration for instant form filling
- 🎯 **Intelligent Field Detection** - Automatically identifies field types using multiple strategies
- 📝 **Realistic Data Generation** - Creates believable test data for 15+ field types
- ⚙️ **Customizable Settings** - Toggle specific field types on/off
- 🔒 **Privacy First** - All data generated locally, nothing sent to external servers
- 🎨 **Clean UI** - Modern, minimal interface following best design practices

### Supported Field Types

| Category | Fields |
|----------|--------|
| **Personal** | First Name, Last Name, Full Name, Username |
| **Contact** | Email, Phone, Website URL |
| **Address** | Street Address, Apt/Suite, City, State, ZIP, Country |
| **Other** | Company, Date, Number, Text Areas, Password |

## Screenshots

> Screenshots coming soon

## Installation

### From Chrome Web Store
*Coming soon*

### Load Unpacked (Developer Mode)

1. **Download or clone this repository**
   ```bash
   git clone https://github.com/Deep-dsd/Chrome-Extension-Smart-Form-Filler.git
   ```

2. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/` in your browser
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `Chrome-Extension` folder (the one containing `manifest.json`)

5. **Verify installation**
   - You should see "Smart Form Filler" in your extensions list
   - The extension icon should appear in your browser toolbar

## Usage Guide

### Filling Forms

1. **Navigate to any web page with a form**
   - Contact forms, registration pages, checkout forms, etc.

2. **Right-click on any form field**
   - Click on an input, textarea, or select element

3. **Select "Fill Form with Test Data"**
   - The extension will detect and fill all visible form fields

### Configuring Settings

1. **Quick Settings (Popup)**
   - Click the extension icon in your toolbar
   - Toggle names, contact info, or address filling on/off

2. **Full Settings (Options Page)**
   - Click "All Settings" in the popup, or
   - Right-click the extension icon → "Options"
   - Customize individual field types
   - Enable/disable debug mode

## Project Structure

```
Chrome-Extension/
├── manifest.json              # Extension configuration (Manifest V3)
├── README.md                  # This file
├── src/
│   ├── background/
│   │   └── background.js      # Service worker, context menu handling
│   ├── content/
│   │   ├── content.js         # Main content script orchestrator
│   │   ├── formDetector.js    # Form field detection logic
│   │   └── formFiller.js      # Form filling operations
│   ├── utils/
│   │   ├── constants.js       # Patterns, templates, configuration
│   │   ├── dataGenerator.js   # Fake data generation
│   │   └── fieldClassifier.js # Field type classification
│   ├── popup/
│   │   ├── popup.html         # Extension popup UI
│   │   ├── popup.js           # Popup logic
│   │   └── popup.css          # Popup styles
│   └── options/
│       ├── options.html       # Settings page
│       ├── options.js         # Settings logic
│       └── options.css        # Settings styles
├── assets/
│   ├── icons/                 # Extension icons
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── styles/
│       └── shared.css         # Shared CSS variables and components
└── docs/
    └── ARCHITECTURE.md        # Detailed architecture documentation
```

## How It Works

### Field Detection Strategy

The extension uses a priority-based detection system:

1. **Input Type Attribute** - `type="email"`, `type="tel"`, etc.
2. **Name/ID Attributes** - Matches against known patterns
3. **Autocomplete Attribute** - Standard autocomplete values
4. **Label Text** - Associated `<label>` element content
5. **Placeholder Text** - Placeholder attribute content
6. **Fallback** - Default to generic text

### Data Generation

- **Session Consistency** - Names, locations stay consistent within a single fill
- **Realistic Formats** - Phone numbers as `(XXX) XXX-XXXX`, proper email formats
- **Locale Support** - Currently US format, structured for future expansion
- **Framework Compatibility** - Triggers input/change events for React, Vue, etc.

## Development

### Prerequisites

- Google Chrome browser
- Basic understanding of Chrome extension development

### Making Changes

1. **Edit source files** in the `src/` directory
2. **Reload the extension**
   - Go to `chrome://extensions/`
   - Click the refresh icon on the Smart Form Filler card
3. **Test your changes**
   - Navigate to a form page
   - Right-click and fill

### Debug Mode

Enable debug mode in Options to see console logs:

1. Open Options page
2. Scroll to "Developer Options"
3. Enable "Debug Mode"
4. Open browser DevTools (F12) to see logs

### Testing Checklist

- [ ] Simple contact forms
- [ ] Multi-field registration forms
- [ ] Forms with select dropdowns
- [ ] Forms with textareas
- [ ] Dynamic SPA forms
- [ ] Forms with various input types

## Future Enhancements

- [ ] **Faker.js Integration** - More diverse and realistic data
- [ ] **Multiple Locales** - UK, Canada, Australia formats
- [ ] **Custom Data Profiles** - Save and reuse specific data sets
- [ ] **Keyboard Shortcuts** - Quick-fill without context menu
- [ ] **Field-Level Filling** - Fill single field only option
- [ ] **Form Templates** - Pre-configured data for common form types
- [ ] **Data Import/Export** - Share configurations

## Privacy & Security

**Your privacy is protected:**

- ✅ All data is generated locally in your browser
- ✅ No data is collected, stored, or transmitted externally
- ✅ No analytics or tracking
- ✅ No external API calls
- ✅ Open source - verify the code yourself

The extension only requires these permissions:
- `contextMenus` - To add the right-click menu option
- `activeTab` - To access form fields on the current page
- `storage` - To save your preferences locally

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Guidelines

- Use ES6+ features (const/let, arrow functions, async/await)
- Follow single responsibility principle
- Keep functions under 30 lines
- Use descriptive variable and function names
- Comment only complex/non-obvious logic

## License

This project is licensed under the MIT License - see below:

```
MIT License

Copyright (c) 2026 Smart Form Filler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Made with ❤️ for developers who are tired of typing "test@test.com"**
