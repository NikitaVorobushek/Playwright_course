export class MainPage {
// техническое описание страницы

    constructor(page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    }

// бизнесовые действия со страницей
    async goToRegister() {
        this.signUpLink.click();
    }

    async open(url) {
        await this.page.goto(url);
    }

}
