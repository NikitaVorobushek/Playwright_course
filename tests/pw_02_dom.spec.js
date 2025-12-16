import { test, expect } from '@playwright/test';

test('Юзер может заказать бургер', async ({ page }) => {

  await page.goto('file:///C:/Users/nikit/Downloads/burger-order.html');

  //await page.getByRole('textbox', { name: 'Имя' }).click();
  //await page.getByText('Горчица').click();

  //поиск по плейсхолдеру
  await page.getByPlaceholder('Введите ваше имя').click();
  //условно поиск по ccs id
  await page.locator('#burgerType').selectOption('spicy');
  //поиск по тексту
  await page.locator('.radio-group', {hasText: 'Большой'}).click();
  //поиск элемента по тексту
  await page.getByText('Горчица').click();
  //поиск по лейблу
  await page.getByLabel('Горчица').click();
  //поиск ключ-значение
  await page.locator('[placeholder="Введите ваше имя"]').fill('ОлеОле-Погнали');
  //клик по классу забрать с собой
  await page.locator('.switch-label').click();
  //клик по полю Кол-во
  //await page.locator('input[onclick="increaseQuantity()"]').click();
  //клик по полю оплата картой (радиокнопка)
  await page.locator(".radio-group", { hasText: "Картой онлайн" }).click();

  
//   await page.getByRole('textbox', { name: 'Your Name' }).click();
//   await page.getByRole('textbox', { name: 'Your Name' }).fill('Nikson');

//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('nikson100500@ya.ru');

//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('Helloworld123!');

//   await page.getByRole('button', { name: 'Sign up' }).click();

//   await expect(page.getByRole('navigation')).toContainText('Nikson');
});