const { expect } = require("@wdio/globals");
const formFields = require("../pageobjects/form.fields.page.js");
describe("Form fields tests", () => {
  before(async () => {
    await formFields.openForms();
  });
  const inputValues = [
    "Hello World", // String
    "12345", // Numeric string
    "Special!@#$", // Special characters
    " ", // Space
    "", // Empty string
  ];

  inputValues.forEach((input) => {
    it(`should be able to type "${input}" in the input and validate the inserted value`, async () => {
      await formFields.setInputValue(input);
      await formFields.validateInputValue(input);
    });
  });

  it("should be able turn on and off the switch", async () => {
    // Check the default value of the switch
    await formFields.validateSwitchValue("OFF");
    // Toggle the switch
    await formFields.toggleSwitch();
    // Check the value of the switch after clicking
    await formFields.validateSwitchValue("ON");
  });
});
