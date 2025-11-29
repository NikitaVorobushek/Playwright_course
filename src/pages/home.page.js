export class HomePage {
// техническое описание страницы

    constructor(page) {
        this.page = page;
        this.profileName = page.locator('.dropdown-toggle')
    }

    async getProfileName() {
        const text = await this.getProfileName.textContent();
        return text;
    }
}
