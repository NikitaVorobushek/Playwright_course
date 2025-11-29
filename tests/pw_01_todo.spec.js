import { test, expect } from '@playwright/test';

test('Аноним может создать задачу', async ({ page }) => {
    // Arrange Предусловие 
  await page.goto('https://todomvc.com/examples/vue/dist/#/');
    // Act Шаги
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('First steps in playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    // Assert Проверка
  await expect(page.getByText('First steps in playwright')).toBeVisible();
  await expect(page.getByRole('main')).toContainText('First steps in playwright');
    //todo Добавить проверку на отображение счетчика
});