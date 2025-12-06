import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page'; 
import { RegisterPage } from '../src/pages/register.page';
import { HomePage } from '../src/pages/home.page';
import { NewArticlePage } from '../src/pages/newarticle.page';
import { MyArticlePage } from '../src/pages/myarticle.page';
import { EditArticlePage } from '../src/pages/editarticle.page';
import { SettingsPage } from '../src/pages/settings.page';

const user = {
    name: faker.person.fullName(), //сгенерит фио рандомное
    email: faker.internet.email({provider: 'qa.guru'}), //сгенерит мыло
    password: faker.internet.password({length: 10}), //сгенерит пароль
}

const poster = {
    title: faker.food.dish(), //сгенерит "дичь"
    about: faker.food.ethnicCategory(), //сгенерит категорию блюда
    topic: faker.food.description(), //сгенерит описание блюда
    tag: 'Реклама' //популярный тэг
}

const comment = {
    comm: faker.book.title() //сгенерит коммент ввиде названия книги
}

const myUrl = {
    myUrl: faker.internet.url() //сгенерит ссылку
}

const url = 'https://realworld.qa.guru/';

test.only('5 функциональных тестов', async ({ page }) => {
    const {name, password, email} = user;
    const {title, about, topic, tag} = poster;

    const homePage = new HomePage(page);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    const newArticlePage = new NewArticlePage(page);
    const myArticlePage = new MyArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const settingsPage = new SettingsPage(page);
    
    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.registration(name, email, password);
    await expect(homePage.profileName).toContainText(user.name);
    console.log('Сделали регистрацию юзера.')

    await newArticlePage.makeNewArticle(poster.title, poster.about, poster.topic, poster.tag);
    expect (await myArticlePage.checkMyArticle()).toContain(poster.topic);
    console.log('Сделали новый пост. 1-й тест');
    
    await myArticlePage.makeNewComment(comment.comm);
    expect(await myArticlePage.checkMyComment()).toContain(comment.comm);
    console.log('Сделали комментарий к новому посту. 2-й тест');

    const newPoster = {
        title: faker.food.dish(), //сгенерит "дичь 2"
        about: faker.food.ethnicCategory(), //сгенерит категорию блюда 2
        topic: faker.food.description(), //сгенерит описание блюда 2
        tag: 'Night Assambler'
    }
    await myArticlePage.goUpdateMyArticle();
    await editArticlePage.updateArticle(newPoster.title, newPoster.about, newPoster.topic, newPoster.tag);
    expect(await myArticlePage.checkMyArticle()).toContain(newPoster.topic);
    console.log('Отредактировали свой пост. 3-й тест');

    // await myArticlePage.deleteMyComment();
    // await expect(myArticlePage.getByRole('main')).toContainText('There are no comments yet...');
    // console.log('Удалили свой комментарий. 4-й тест');
////не вростает зараза
    // await myArticlePage.deleteMyArticle();
    // await expect(myArticlePage.getByRole('main')).toContainText('Articles not available.');
    // console.log('Удалили свой пост. 5-й тест');

    ////генерить изменение учетки
    
});

