# Mobile App Automation Tests

This project contains automated tests for a mobile application using appium. The tests cover various functionalities such as form fields, drag and drop actions.

## Project Structure
.
├── data

│   ├── formFields.json

├── pageobjects

│   ├── dragAndDrop.page.js

│   ├── formFields.page.js

│   ├── home.page.js

│   └── ...

├── tests

│   ├── app.form.fields.test.js

│   ├── app.drag.and.drop.test.js

│   ├── app.swipe.test.js

│   └── ...

├── wdio.conf.js

├── logger.js

└── README.md

- **data/**: Contains JSON files with test data.
- **pageobjects/**: Contains the Page Object Model (POM) files that encapsulate the elements and actions for different screens of the app.
- **tests/**: Contains the test files that use the page objects to perform various test scenarios.
- **logger.js**: Contains the logger configuration using Winston.
- **wdio.conf.js**: Configuration file for Appium and WebdriverIO.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Appium (v1.20 or higher)
- Android SDK

## Installation

1. Clone the repository:

git clone git@github.com:SanjaPaskova/appium-wdio-framework.git
cd appium-wdio-framework

2. Install the dependencies:

npm install

3. Ensure Appium is installed and running:

npm install -g appium

4. Set up the Android environment:

- Install Android Studio and set up the Android SDK.
- Add the Android SDK tools to your PATH.

## Running Tests

To run the tests, use the following command:

npx wdio wdio.conf.js

## Test Scenarios

### Form Fields Tests

Tests the ability to type different types of data into input fields and validate the text.

### Drag and Drop Test

Tests with drag and drop functionality.

### Swipe Test

Example test that swipes left and validates position after swiping


- **pageobjects/**: Contains the Page Object Model (POM) files that encapsulate the elements and actions for different screens of the app.
- **tests/**: Contains the test files that use the page objects to perform various test scenarios.
- **wdio.conf.js**: Configuration file for WebdriverIO.

## Running Tests

To run the tests, use the following command:

npx wdio wdio.conf.js

## Test Suites

You can define test suites in the `wdio.conf.js` file to group related tests and run them together. Here is an example of how to define test suites:

```javascript
exports.config = {
    // ...
    suites: {
        formFields: [
            './tests/app.form.fields.test.js'
        ],
        dragAndDrop: [
            './tests/app.drag.and.drop.test.js'
        ]
    },
    // ...
};
```
To run a specific suite, use the following command:

npx wdio wdio.conf.js --suite formFields

## Data-Driven Testing
This project uses data-driven testing to validate different input values. The test data is stored in JSON files located in the data folder.

Example JSON File

// FILE: [formFields.json]
```javascript
{
    "inputValues": [
        "Hello World", 
        "12345", 
        "Special!@#$", 
        " ", 
        ""
    ]
}
```

Reading Data from JSON File
The test file reads the input values from the JSON file and uses them in the test cases.
```javascript
const formFields = require("../pageobjects/form.fields.page.js");
const fs = require("fs");
const path = require("path");

// Read input values from JSON file
const inputValuesPath = path.join(__dirname, "../data/formFields.json");
const inputValues = JSON.parse(fs.readFileSync(inputValuesPath, "utf8")).inputValues;

describe("Form fields tests", () => {
  before(async () => {
    await formFields.openForms();
  });

  inputValues.forEach((input) => {
    it(`should be able to type "${input}" in the input and validate the inserted value`, async () => {
      await formFields.setInputValue(input);
      await formFields.validateInputValue(input);
    });
  });
});
```
## Logging
This project uses Winston for logging. The logger is configured in the logger.js file and can be used throughout the test files to log messages.
Using the Logger in Tests
You can import and use the logger in your test files to log messages.
```javascript
import dragAndDrop from '../pageobjects/drag.screen.page.js';
import logger from '../../logger.js';

describe('Drag and Drop tests', () => {
    it('should be able to drag and drop and complete the picture', async () => {
        logger.info('Starting drag and drop test');
        await dragAndDrop.openDragAndDrop();
        await dragAndDrop.performDragAndDrop(await $('~drag-l1'), await $('~drop-l1'));
        await dragAndDrop.performDragAndDrop(await $('~drag-l2'), await $('~drop-l2'));
        await dragAndDrop.assertDragElementDoesNotExist();
        logger.info('Completed drag and drop test');
    });
});
```

## Test Scenarios

### Form Fields Tests

Tests the ability to type different types of data into input fields and validate the text.

### Drag and Drop Tests

Tests the drag and drop functionality to complete a picture.

## Page Objects

### FormFieldsPage
Encapsulates the elements and actions related to the form fields functionality.
### Class: FormFieldsPage

This class defines the elements and actions for interacting with form fields on a sample page.

```javascript
class FormFieldsPage {
    get homeButton() { return $('~Home'); }
    get formsButton() { return $('~Forms'); }
    get textInput() { return $('~text-input'); }
    get switchElement() { return $('~switch'); }

    async openForms() {
        await this.homeButton.waitForDisplayed({ timeout: 20000 });
        await this.formsButton.click();
    }

    async setInputValue(value) {
        await this.textInput.setValue(value);
    }

    async getInputValue() {
        return await this.textInput.getText();
    }

    async toggleSwitch() {
        await this.switchElement.click();
    }

    async getSwitchValue() {
        return await this.switchElement.getText();
    }

    async validateInputValue(expectedValue) {
        const expectedText = expectedValue === '' ? 'Type something' : expectedValue;
        const actualText = await this.getInputValue();
        expect(actualText).toBe(expectedText);
    }

    async validateSwitchValue(expectedValue) {
        const actualValue = await this.getSwitchValue();
        expect(actualValue).toBe(expectedValue);
    }
}

module.exports = new FormFieldsPage();
```

## Reporting

This project uses the `@wdio/allure-reporter` to generate test reports. To view the reports:

1. Run the tests to generate the report data:

npx wdio wdio.conf.js

2. Generate the Allure report:

npx allure generate allure-results --clean

3. Open the Allure report:

npx allure open

The Allure report will open in your default web browser, providing a detailed view of the test results.

## Limitations
This solution is designed to work only on Android and not on iOS. The swipe gestures and element interactions are implemented using Android-specific selectors and actions. If you need to run these tests on iOS, you will need to modify the selectors and possibly the actions to be compatible with iOS.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
