import { test } from '@playwright/test';

export class LoginPage {
    constructor(page) {       
        this.page = page;

        this.loginBtn = page.getByRole('button', { name: 'Login' });

        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput =  page.getByRole('textbox', { name: 'Password' });
    }

    async login (email, password) { 
        return test.step ('Авторизация пользователя email/password', async (step) => { 
        await this.emailInput.click();
        await this.emailInput.fill(email);

        await this.passwordInput.click();
        await this.passwordInput.fill(password);  

        await this.loginBtn.click();  
        })
    }

}