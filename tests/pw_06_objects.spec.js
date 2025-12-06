import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page'; 
import { RegisterPage } from '../src/pages/register.page';
import { HomePage } from '../src/pages/home.page';

const user = {
    name: faker.person.fullName(), //сгенерит фио рандомное
    email: faker.internet.email({provider: 'qa.guru'}), //сгенерит мыло
    password: faker.internet.password({length: 10}), //сгенерит пароль
    method() {}
}

const url = 'https://realworld.qa.guru/';

test('Регистрация юзера с объектами', async ({ page }) => {
    const {name, password, email} = user;

    const homePage = new HomePage(page);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    
    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.registration(name, email, password);
    // v 1.0
    await expect(homePage.profileName).toContainText(user.name);

});

