import loginPage from '../../pageobjects/login.screen.page.js';

describe('Login tests', () => {
    before(async () => {
        // Open the login page
        loginPage.openLoginPage();
    });
    const loginData = [
        { username: 'sa@gmail.com', password: 'password', expectedResult: true },
        // { username: ' ', password: ' ', expectedResult: false },
        // { username: 'sa@gmail.com', password: ' ', expectedResult: false },
        // { username: ' ', password: 'wrongPassword', expectedResult: false },
    ];

    loginData.forEach(({ username, password, expectedResult }) => {
        it(`should validate login with username: ${username} and password: ${password}`, async () => {

            // Login
            await loginPage.login(username, password);

            // Validate login
            await loginPage.validateLogin(expectedResult);
        }
        );
    }
    );
}
);