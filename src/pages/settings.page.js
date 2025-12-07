// export class SettingsPage {
// // техническое описание страницы
//     constructor (page) {
        
//         this.page = page;
//         this.updateBtn = page.getByRole('button', { name: 'Update Settings' });

//         this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
//         this.passwordInput =  page.getByRole('textbox', { name: 'Password' });
//         this.profileName = page.locator('.dropdown-toggle');
//     }

// // бизнесовые действия со страницей
//     async changeName(name) {  
//         await this.nameInput.click();
//         await this.nameInput.fill(name);

//         await this.updateBtn.click();  
//     }

//     checkProfileName() {
//         return this.profileName;
//     }

//     async changePassword(password) {  
//         await this.passwordInput.click();
//         await this.passwordInput.fill(password);

//         await this.updateBtn.click();  
//     }
// }