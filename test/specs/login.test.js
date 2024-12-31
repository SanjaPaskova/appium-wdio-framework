import loginPage from '../../pageobjects/login.screen.page.js';

describe('Login tests', () => {
    it('should be able to login', async () => {
        // Open the swipe screen
        await loginPage.openLoginPage();

        // Login
        await loginPage.login('sa@gmail.com', 'password');
        await loginPage.validateLogin();
    });
});