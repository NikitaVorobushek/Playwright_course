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
    await expect(settingsPage.checkPrifileName()).toContainText(newUserName);
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

    await expect(homePage.getProfileName()).toContain(user.name);
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

    expect(await viewArticlePage.getArticleContent()).toContain(article.topic);
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
    const commentText = faker.book.title() //сгенерит коммент ввиде названия книги

    await registerUser(page, user);
    await homePage.gotoNewArticle();
    await newArticlePage.makeNewArticle(article.title, article.topic, article.content, article.tag);
    await viewArticlePage.createNewComment(commentText);

    expect(await viewArticlePage.getCommentContent()).toContain(commentText);
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
    await newArticlePage.makeNewArticle(article.title, article.topic, article.content, article.tag);
    await viewArticlePage.goUpdateMyArticle();
    await editArticlePage.updateArticle(newArticle.title, newArticle.topic, newArticle.content, newArticle.tag);


    expect(await viewArticlePage.checkMyArticle()).toContain(newArticle.content);
});

// import { test, expect } from '@playwright/test';
// import { faker } from '@faker-js/faker';
// import { MainPage } from '../src/pages/main.page'; 
// import { RegisterPage } from '../src/pages/register.page';
// import { HomePage } from '../src/pages/home.page';
// import { NewArticlePage } from '../src/pages/newarticle.page';
// import { MyArticlePage } from '../src/pages/viewarticle.page';
// import { EditArticlePage } from '../src/pages/editarticle.page';
// import { SettingsPage } from '../src/pages/settings.page';

// const user = {
//     name: faker.person.fullName(), //сгенерит фио рандомное
//     email: faker.internet.email({provider: 'qa.guru'}), //сгенерит мыло
//     password: faker.internet.password({length: 10}), //сгенерит пароль
// }

// const poster = {
//     title: faker.food.dish(), //сгенерит "дичь"
//     about: faker.food.ethnicCategory(), //сгенерит категорию блюда
//     topic: faker.food.description(), //сгенерит описание блюда
//     tag: 'Реклама' //популярный тэг
// }

// const comment = {
//     comm: faker.book.title() //сгенерит коммент ввиде названия книги
// }

// const myUrl = {
//     myUrl: faker.internet.url() //сгенерит ссылку
// }

// const url = 'https://realworld.qa.guru/';

// test.only('5 функциональных тестов', async ({ page }) => {
//     const {name, password, email} = user;
//     const {title, about, topic, tag} = poster;

//     const homePage = new HomePage(page);
//     const mainPage = new MainPage(page);
//     const registerPage = new RegisterPage(page);

//     const newArticlePage = new NewArticlePage(page);
//     const myArticlePage = new MyArticlePage(page);
//     const editArticlePage = new EditArticlePage(page);
//     const settingsPage = new SettingsPage(page);
    
//     await mainPage.open(url);
//     await mainPage.goToRegister();
//     await registerPage.registration(name, email, password);
//     await expect(homePage.profileName).toContainText(user.name);
//     console.log('Сделали регистрацию юзера.')

//     await newArticlePage.makeNewArticle(poster.title, poster.about, poster.topic, poster.tag);
//     expect (await myArticlePage.checkMyArticle()).toContain(poster.topic);
//     console.log('Сделали новый пост. 1-й тест');
    
//     await myArticlePage.makeNewComment(comment.comm);
//     expect(await myArticlePage.checkMyComment()).toContain(comment.comm);
//     console.log('Сделали комментарий к новому посту. 2-й тест');

//     const newPoster = {
//         title: faker.food.dish(), //сгенерит "дичь 2"
//         about: faker.food.ethnicCategory(), //сгенерит категорию блюда 2
//         topic: faker.food.description(), //сгенерит описание блюда 2
//         tag: 'Night Assambler'
//     }
//     await myArticlePage.goUpdateMyArticle();
//     await editArticlePage.updateArticle(newPoster.title, newPoster.about, newPoster.topic, newPoster.tag);
//     expect(await myArticlePage.checkMyArticle()).toContain(newPoster.topic);
//     console.log('Отредактировали свой пост. 3-й тест');
// });



