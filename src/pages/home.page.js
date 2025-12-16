export class HomePage {
// техническое описание страницы
constructor(page) {
        this.page = page;

        this.profileBtn = page.locator('.dropdown-toggle');
        this.settingsBtn = page.getByRole('link', { name: 'Settings' });
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.newArticleBtn = page.getByRole('link', { name: 'New Article' });
    }

    getProfileName() {
        return this.profileBtn;
    }

    async goToSettings() {
        await this.profileBtn.click();
        await this.settingsBtn.click();
    }

    async logOut() {
        await this.profileBtn.click();
        await this.logoutBtn.click();
    }

    async gotoNewArticle() {
        await this.newArticleBtn.click();
    }
}