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

async function generateNewUser() {
    const user = {
        name: faker.person.fullName(), //сгенерит фио
        email: faker.internet.email({provider: 'qa.guru'}), //сгенерит мыло
        password: faker.internet.password({length: 10}), //сгенерит пароль
    }
    return user;
}

async function registerUser(page, user) {
    const {name, email, password} = user;

    const mainPage = new MainPage(page);    
    const registerPage = new RegisterPage(page);

    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.registration(name, email, password);
}

const url = 'https://realworld.qa.guru/';

test('Зарегистрированный пользователь может сменить имя', async ({ page }) => {
    const user = await generateNewUser();  
    const newUserName = faker.person.fullName(); //сгенерит фио

    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await registerUser(page, user);

    await homePage.goToSettings();
    await settingsPage.changeName(newUserName);
    await expect(settingsPage.checkProfileName()).toContainText(newUserName);
});

test('Зарегистрированный пользователь может сменить пароль', async ({ page }) => {
    const user = await generateNewUser(); 
    const newPassword = faker.internet.password({ length: 10 }); //сгенерит пароль

    const mainPage = new MainPage(page);    
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);

    await registerUser(page, user);

    await homePage.goToSettings();
    await settingsPage.changePassword(newPassword);
    await homePage.logOut();

    await mainPage.goToLogin();
    await loginPage.login(user.email, newPassword);
    expect(await homePage.getProfileName()).toContain(user.name);
});

test('Зарегистрированный пользователь может создать новый пост', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    const user = await generateNewUser(); 

    const article = {
        title: faker.food.dish(), //сгенерит "дичь"
        about: faker.food.ethnicCategory(), //сгенерит категорию блюда
        topic: faker.food.description(), //сгенерит описание блюда
        tag: 'Реклама' //популярный тэг
    }

    await registerUser(page, user);
    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.about, article.topic, article.tag);
    expect(await viewArticlePage.checkMyArticle(article.topic));
});

test('Зарегистрированный пользователь может оставить коммент к посту', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    const user = await generateNewUser(); 
    const article = {
        title: faker.food.dish(), //сгенерит "дичь"
        about: faker.food.ethnicCategory(), //сгенерит категорию блюда
        topic: faker.food.description(), //сгенерит описание блюда
        tag: 'Реклама' //популярный тэг
    }
    const commentText = faker.book.genre() //сгенерит коммент ввиде жанра книги

    await registerUser(page, user);
    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.about, article.topic, article.tag);
    await viewArticlePage.createNewComment(commentText);
    expect(await viewArticlePage.checkMyComment()).toContain(commentText);
});

test('Зарегистрированный пользователь может отредактировать свой пост', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    const user = await generateNewUser(); 
    const article = {
        title: faker.food.dish(), //сгенерит "дичь"
        about: faker.food.ethnicCategory(), //сгенерит категорию блюда
        topic: faker.food.description(), //сгенерит описание блюда
        tag: 'Реклама' //популярный тэг
    }
    const newArticle = {
        title: faker.food.dish(), //сгенерит "дичь"
        about: faker.food.ethnicCategory(), //сгенерит категорию блюда
        topic: faker.food.description(), //сгенерит описание блюда
        tag: 'Реклама' //популярный тэг
    }

    await registerUser(page, user);

    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.about, article.topic, article.tag);

    await viewArticlePage.checkMyArticle(article.topic);
    await viewArticlePage.goUpdateMyArticle();

    await editArticlePage.updateArticle(newArticle.title, newArticle.about, newArticle.topic, newArticle.tag);
    expect(await viewArticlePage.findMyTopic(newArticle.topic));
});