import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page'; 
import { RegisterPage } from '../src/pages/register.page';
import { HomePage } from '../src/pages/home.page';
import { NewArticlePage } from '../src/pages/newarticle.page';
import { ViewArticlePage } from '../src/pages/viewarticle.page';
import { EditArticlePage } from '../src/pages/editarticle.page';
import { SettingsPage } from '../src/pages/settings.page';
import { LoginPage } from '../src/pages/login.page';

function generateNewUser() {
    const user = {
        name: faker.person.fullName(), //сгенерит фио
        email: faker.internet.email({provider: 'qa.guru'}), //сгенерит мыло
        password: faker.internet.password({length: 10}), //сгенерит пароль
    }
    return user;
}

async function generateNewArticle() {
    const article = {
        title: faker.commerce.product(), //сгенерит "фрукт"
        about: faker.commerce.productName(), //сгенерит имя товара
        topic: faker.food.description(), //сгенерит описание блюда
        tag: 'Реклама' //популярный тэг
    }
    return article;
}

const url = 'https://realworld.qa.guru/';

test.describe('My tests gogo', () => {
    let user;

test.beforeEach(async ({ page }) => { 
    user = generateNewUser();
    
    const {name, email, password} = user;
    const mainPage = new MainPage(page);    
    const registerPage = new RegisterPage(page);

    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.registration(name, email, password);
});

test('Зарегистрированный пользователь может сменить имя', async ({ page }) => {
    const newUserName = faker.person.fullName(); //сгенерит фио

    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.goToSettings();
    await settingsPage.changeName(newUserName);
    await expect(settingsPage.checkProfileName()).toContainText(newUserName);
});

test('Зарегистрированный пользователь может сменить пароль', async ({ page }) => {
    const newPassword = faker.internet.password({ length: 10 }); //сгенерит пароль

    const mainPage = new MainPage(page);    
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.goToSettings();
    await settingsPage.changePassword(newPassword);
    await homePage.logOut();

    await mainPage.goToLogin();
    await loginPage.login(user.email, newPassword);
    await expect(homePage.getProfileName()).toContainText(user.name);
});

test('Зарегистрированный пользователь может создать новый пост', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    const article = await generateNewArticle();

    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.about, article.topic, article.tag);
    await expect(viewArticlePage.checkMyArticle()).toContainText(article.topic);
});

test('Зарегистрированный пользователь может оставить коммент к посту', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    const article = await generateNewArticle();

    const commentText = faker.book.genre() //сгенерит коммент ввиде жанра книги

    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.about, article.topic, article.tag);
    await viewArticlePage.createNewComment(commentText);
    await expect(viewArticlePage.checkMyComment()).toContainText(commentText);
});

test('Зарегистрированный пользователь может отредактировать свой пост', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    const article = await generateNewArticle();
    const newArticle = await generateNewArticle();

    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.about, article.topic, article.tag);

    await viewArticlePage.checkMyArticle(article.topic);
    await viewArticlePage.goUpdateMyArticle();

    await editArticlePage.updateArticle(newArticle.title, newArticle.about, newArticle.topic, newArticle.tag);
    await expect(viewArticlePage.findMyTopic()).toContainText(newArticle.topic);
});
});