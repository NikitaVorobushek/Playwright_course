import { test, expect } from '@playwright/test';

test('Юзер может зарегистрироваться используя email и пароль', async ({ page }) => {
    //Предусловие
  await page.goto('https://realworld.qa.guru/');
    //Тап по кнопке Зарегистрироваться
  await page.getByRole('link', { name: 'Sign up' }).click();
    //Ввод Имени
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Nikson');
    //Ввод мыла
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('nikson100500@ya.ru');
    //Ввод пароля
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Helloworld123!');
    //Тап по кнопке Зарегистрироваться
  await page.getByRole('button', { name: 'Sign up' }).click();
    /*
    Проверка на наличие имени в авторизованной учетке
    По сути успешная авторизация
    */
  await expect(page.getByRole('navigation')).toContainText('Nikson');
});

// test('test', async ({ page }) => {
//   await page.goto('https://realworld.qa.guru/');
//   await page.getByRole('link', { name: 'Sign up' }).click();
//   await page.getByRole('textbox', { name: 'Your Name' }).click();
//   await page.getByRole('textbox', { name: 'Your Name' }).fill('DoodleChecker');
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('afjkgb@mail.ru');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('100500fghdWQE');
//   await page.getByRole('button', { name: 'Sign up' }).click();
//   await expect(page.getByRole('navigation')).toContainText('DoodleChecker');
// });