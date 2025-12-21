import { test } from '@playwright/test';

export class MainPage {
// техническое описание страницы

    constructor(page) {
        this.page = page;

        this.signUpLink = page.getByRole('link', { name: 'Sign up' }).describe('Registration button/link');
        this.loginLink = page.getByRole('link', { name: 'Login' }).describe('Login button/link');
    }

// бизнесовые действия со страницей
    async goToRegister() {
        return test.step ('Переход на страницу регистрации', async (step) => {
            this.signUpLink.click();
        })
    }

    async goToLogin() {
        return test.step ('Клик по кнопке Логина', async (step) => {
        await this.loginLink.click();
        })
    }

    async open(url) {
        return test.step (`Переход на страницу ${url}`, async (step) => {
        await this.page.goto(url);
        })
    }

}
