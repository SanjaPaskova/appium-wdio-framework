
// FILE: pageobjects/login.screen.page.js

class LoginPage {
    get loginPageButton() { return $('~Login'); }
    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get buttonLogin() { return $('~button-LOGIN'); }
    get youAreLoggedInText() { return $(this.locatorStrategy('You are logged in!'));}

    locatorStrategy(selector) {
        return driver.isIOS
            ? `~${selector}`
            : `//android.widget.TextView[@resource-id="android:id/message"]`;
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

    async validateLogin() {
       expect (await this.youAreLoggedInText.getText()).toBe('You are logged in!');
    }
}

module.exports = new LoginPage();