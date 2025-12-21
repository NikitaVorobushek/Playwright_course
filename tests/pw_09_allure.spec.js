import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { App } from '../src/pages/app.page';
import { UserBuilder } from '../src/helpers/builders/index';

const url = 'https://realworld.qa.guru/';

/*
Чтобы нормально отработал аллюр отчет
1. Снести папку allure-report
2. Снести папку allure-results
3. (вариативно) Снести папку playwright-report
4. Запустить тесты npm t
5. Сгенерить аллюр-отчет npx allure generate
6. Открыть аллюр-отчет npx allure open
*/

test('Регим юзера с email и пароль Page Object паттерны', async ({ page }) => {
    await allure.tms("TMS-456", "Related TMS issue"); //аля ссылка на жиру

    const user = new UserBuilder().withEmail().withName().withPassword().build();

    const {email, name, password} = user;
    const app = new App(page);

    await app.main.open(url);
    await app.main.goToRegister();
    await app.register.registration(name, email, password);

    await expect(app.home.getProfileName()).toContainText(user.name);

});