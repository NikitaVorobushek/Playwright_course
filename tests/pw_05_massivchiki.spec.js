import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { json } from 'stream/consumers';

//Массив
const user = {
    name: faker.person.fullName(), //сгенерит фио рандомное
    email: faker.internet.email({provider: 'qa.guru'}), //сгенерит мыло
    password: faker.internet.password({length: 10}) //сгенерит пароль
}

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

test('Регистрация юзера имя+пароль+мыло через генерацию ВКР', async ({ page }) => {
    const {name, email, password} = user;
    /* 
    const name = user.name;
    const email = user.email;
    const password = user.password;
    */

    //старый способ передачи данных в json
    //const jsonCopy = JSON.parse(JSON.stringify(user));

    //новый способ передачи данных с объектами/методами/классами
    //const jsonCopy = structuredClone(user);

    //еще один способ простой и лаконичный
    const jsonCopy = {...user};
    console.log(jsonCopy);

    //собсна вызов функции
    getRegistration(page, user.email, user.name, user.password, url);
    await expect(page.getByRole('navigation')).toContainText(name);
});

