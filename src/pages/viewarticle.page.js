import { text } from "stream/consumers";

export class ViewArticlePage {
// техническое описание страницы
    constructor (page) {
        this.page = page;

        this.commentBtn = page.getByRole('button', { name: 'Post Comment' });
        this.editArticleBtn = page.getByRole('button', {name: ' Edit Article' }).first();

        this.comInput = page.getByRole('textbox', { name: 'Write a comment...' });
        this.myComment = page.locator('.card .card-block .card-text');

        this.myArticleTopic = page.getByRole('paragraph');
        this.myTopic = page.locator('.col-md-12').first();
    }
    
// бизнесовые действия со страницей
    checkMyArticle () {
        return this.myArticleTopic;
    }

    async goUpdateMyArticle() {
        await this.editArticleBtn.click();
    }

    async createNewComment (text) {
        await this.comInput.click();
        await this.comInput.fill(text);

        await this.commentBtn.click();
    }

    async checkMyComment() {
        return this.myComment;
    }

    findMyTopic() {
        return this.myTopic;
    }
}