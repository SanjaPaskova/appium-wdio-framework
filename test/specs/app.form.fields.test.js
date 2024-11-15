const { expect } = require("@wdio/globals");
const formFields = require('../pageobjects/form.fields.page.js');
describe("Form fields tests", () => {
  const inputValues = [
    "Hello World", // String
    "12345", // Numeric string
    "Special!@#$", // Special characters
    " ", // Space
    "", // Empty string
  ];

  inputValues.forEach((input) => {
    it(`should be able to type "${input}" in the input and validate the text and default value @regression`, async () => {
      // Check if the home screen is displayed (you can check for a unique element)
      await formFields.openForms();
      await formFields.setInputValue(input);
      await formFields.validateInputValue(input);
    });
  });

  it("should be able turn on and off the switch @regression", async () => {
    // check the default value of the switch
    expect(await $("~switch").getText()).toBe("OFF");
    await $("~switch").click();
    // check the value of the switch after clicking
    expect(await $("~switch").getText()).toBe("ON");
  });
});
