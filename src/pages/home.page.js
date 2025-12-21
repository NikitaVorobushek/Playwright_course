import { test } from '@playwright/test';

export class HomePage {
// техническое описание страницы
constructor(page) {
        this.page = page;

        this.profileBtn = page.locator('.dropdown-toggle').describe('Тык по кнопке Профиля');
        this.settingsBtn = page.getByRole('link', { name: 'Settings' });
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.newArticleBtn = page.getByRole('link', { name: 'New Article' });
    }

    getProfileName() {
        return this.profileBtn;
    }

    async goToSettings() {
        return test.step ('Переход на страницу настроек', async (step) => {
        await this.profileBtn.click();
        await this.settingsBtn.click();
        })
    }

    async logOut() {
        return test.step ('Выход из профиля', async (step) => {
        await this.profileBtn.click();
        await this.logoutBtn.click();
        })
    }

    async gotoNewArticle() {
        return test.step ('Создать новую заметку', async (step) => {
        await this.newArticleBtn.click();
        })
    }
}