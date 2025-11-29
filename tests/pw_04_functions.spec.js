import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

//Переменные
let name = faker.person.fullName(); //сгенерит фио рандомное
let password = faker.internet.password({length: 10}); //сгенерит пароль
let email = faker.internet.email({provider: 'qa.guru'}); //сгенерит мыло

//Константы
const url = 'https://realworld.qa.guru/';

//Функции
const getRegistration = async (page, email, name, password, url) => {
    await page.goto(url);
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).fill(name);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign up' }).click();
}

const changeProfileName = async (page, name) => {
    const newName = faker.person.fullName();
    await page.getByAltText(name).click();
    await page.getByRole('dropdown-item', { name: {name} }).click();
    await page.getByRole('ion-gear-a', { name: 'Edit Profile Settings' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).fill(newName);
    await page.getByRole('button', { name: 'Update Settings' }).click();
}

test('Регистрация юзера имя+пароль+мыло через генерацию ВКР', async ({ page }) => {
    //собсна вызов функции
    getRegistration(page, email, name, password, url);
    await expect(page.getByRole('navigation')).toContainText(name);
});

test('Регистрация юзера через генерацию ВКР и смена имени', async ({ page }) => {
    //собсна вызов функции
    getRegistration(page, email, name, password, url);
    changeProfileName(page, name);
    await expect(page.getByRole('navigation')).toContainText(name);
});