const formFields = require("../../pageobjects/form.fields.page.js");
const fs = require("fs");
const path = require("path");
// Read input values from JSON file
const inputValuesPath = path.join(__dirname, "../../data/formFields.json");
const inputValuesTxt = JSON.parse(
  fs.readFileSync(inputValuesPath, "utf8")
).inputValues;

describe("Form fields tests", () => {
  before(async () => {
    await formFields.openForms();
  });

  inputValuesTxt.forEach((input) => {
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
