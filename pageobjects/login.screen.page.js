
// FILE: pageobjects/login.screen.page.js

class LoginPage {
    get loginPageButton() { return $('~Login'); }
    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get buttonLogin() { return $('~button-LOGIN'); }
    get youAreLoggedInText() { return $(this.locatorStrategyById('You are logged in!', 'TextView', 'message')); }
    get okButton() { return $(this.locatorStrategyById(`OK`, 'Button', 'button1')); }

    locatorStrategyById(selector, widgetType, android_id) {
        return driver.isIOS
            ? `~${selector}`
            : `//android.widget.${widgetType}[@resource-id="android:id/${android_id}"]`;
    }

    async insertEmail(value) {
        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.setValue(value);
    }

    async insertPassword(value) {
        await this.inputPassword.setValue(value);
    }

    async clickLogin() {
        await this.buttonLogin.click();
    }

    async login(email, password) {
        await this.insertEmail(email);
        await this.insertPassword(password);
        await this.clickLogin();
    }

    async getEmailValue() {
        return await this.inputEmail.getText();
    }

    async getPasswordValue() {
        return await this.inputPassword.getText();
    }

    async openLoginPage() {
        await this.loginPageButton.waitForDisplayed();
        await this.loginPageButton.click();
    }

    async validateLogin(expectedResult) {
        // Check if the youAreLoggedInText element is displayed
        if (expectedResult) {
            const text = await this.youAreLoggedInText.getText();
            expect(text).toBe('You are logged in!', `Expected text to be 'You are logged in!', but got '${text}'`);
            console.log('Login successful');
            expect(true).toBe(expectedResult, `Expected login result to be ${expectedResult}, but got true`);
            await this.clickOk();
            return;
        }

        // Check if the error message is displayed
        else {
            console.log('Login unsuccessful');
            expect(false).toBe(expectedResult, `Expected login result to be ${expectedResult}, but got false`);
            const youAreLoggedInTextExists = await this.youAreLoggedInText.isExisting();
            expect(youAreLoggedInTextExists).toBeFalsy('Expected youAreLoggedInText not to exist, but it does.');
            return;
        }
    }

    async clickOk() {
        await this.okButton.waitForDisplayed();
        await this.okButton.click();
    }
}

module.exports = new LoginPage();