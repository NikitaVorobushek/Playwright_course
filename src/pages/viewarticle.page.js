import { text } from "stream/consumers";
import { test } from '@playwright/test';

export class ViewArticlePage {
// техническое описание страницы
    constructor (page) {
        this.page = page;

        this.commentBtn = page.getByRole('button', { name: 'Post Comment' });
        this.editArticleBtn = page.getByRole('button', {name: ' Edit Article' }).first();

        this.comInput = page.getByRole('textbox', { name: 'Write a comment...' });
        this.myComment = page.locator('.card .card-block .card-text').describe('Проверить комментарий к заметке');

        this.myArticleTopic = page.getByRole('paragraph');
        this.myTopic = page.locator('.col-md-12').first().describe('Проверить наличие моей заметки');
    }
    
// бизнесовые действия со страницей
    checkMyArticle () {
        return test.step ('Проверить название заметки', async (step) => {
        return this.myArticleTopic;
        })
    }

    async goUpdateMyArticle() {
        return test.step ('Изменить мою заметку', async (step) => {
        await this.editArticleBtn.click();
        })
    }

    async createNewComment (text) {
        return test.step ('Добавить комментарий к заметке', async (step) => {
        await this.comInput.click();
        await this.comInput.fill(text);

        await this.commentBtn.click();
        })
    }

    async checkMyComment() {
        return this.myComment;
    }

    findMyTopic() {
        return this.myTopic;
    }
}