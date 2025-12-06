export class HomePage {
// техническое описание страницы

    constructor(page) {
        this.page = page;

        this.profileName = page.locator('.dropdown-toggle');

        this.settingsBtn = page.getByRole('link', { name: 'Settings' });
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
    }

    async getProfileName() {
        return this.profileName;
    }

    async goToSettings() {
        await this.profileName.click();
        await this.settingsBtn.click();
    }

    async logOut() {
        await this.profileName.click();
        await this.logoutBtn.click();
    }
}
