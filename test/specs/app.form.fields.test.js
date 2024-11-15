const { expect } = require("@wdio/globals");
const { default: homePage } = require("../pageobjects/home.page");
HomePage = require("../pageobjects/home.page");

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
      await $("~Home").waitForDisplayed({
        timeout: 20000,
      });
      await $("~Forms").click();
      await $("~text-input").setValue(input);
      const expectedText = input === '' ? 'Type something' : input;
      expect(await $("~text-input").getText()).toBe(expectedText);
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
