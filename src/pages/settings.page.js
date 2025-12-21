import { test } from '@playwright/test';

export class SettingsPage {
// техническое описание страницы
    constructor (page) {
        
        this.page = page;
        this.updateBtn = page.getByRole('button', { name: 'Update Settings' });

        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.passwordInput =  page.getByRole('textbox', { name: 'Password' });
        this.profileName = page.locator('.dropdown-toggle').describe('Проверить имя пользователя');
    }

// бизнесовые действия со страницей
    async changeName(name) {  
        return test.step ('Изменить имя пользователя', async (step) => {
        await this.nameInput.click();
        await this.nameInput.fill(name);

        await this.updateBtn.click();
        })
    }

    checkProfileName() {
        return this.profileName;
    }

    async changePassword(password) {  
        return test.step ('Изменить пароль пользователя', async (step) => {
        await this.passwordInput.click();
        await this.passwordInput.fill(password);

        await this.updateBtn.click();  
        })
    }
}