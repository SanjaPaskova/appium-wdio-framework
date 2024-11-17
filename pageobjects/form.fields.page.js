// FILE: pageobjects/formFields.page.js

class FormFieldsPage {
    get homeButton() { return $('~Home'); }
    get formsButton() { return $('~Forms'); }
    get textInput() { return $('~text-input'); }
    get switchElement() { return $('~switch'); }

    async openForms() {
        await this.homeButton.waitForDisplayed();
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