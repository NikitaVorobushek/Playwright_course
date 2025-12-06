export class SettingsPage {
// техническое описание страницы
    constructor (page) {
        
        this.page = page;
        this.updateBtn = page.getByRole('button', { name: 'btn-primary' });

        this.urlInput = page.getByRole('textbox', {name: 'URL of profile picture'});
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.passwordInput =  page.getByRole('textbox', { name: 'Password' });
        this.shortBioInput = page.getByRole('textbox', {name: 'Short bio about you'});
        }

// бизнесовые действия со страницей
    async updateMyBio (url, name, bio, email, password) {

        await this.nameInput.click();
        await this.nameInput.fill(url);

        await this.nameInput.click();
        await this.nameInput.fill(name);

        await this.nameInput.click();
        await this.nameInput.fill(bio);

        await this.emailInput.click();
        await this.emailInput.fill(email);

        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        
        this.updateBtn.click();
    }

    async changeName (name) {  
        await this.nameInput.click();
        await this.nameInput.fill(name);

        await this.updateBtn.click();  
    }

    async getProfileNameLocator() {
        return this.profileName;
    }

    async changePassword (password) {  
        await this.passwordInput.click();
        await this.passwordInput.fill(password);

        await this.updateBtn.click();  
    }
}