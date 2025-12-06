export class MyArticlePage {
    constructor (page) {
        this.page = page;

        this.commentBtn = page.getByRole('button', { name: 'Post Comment' });
        this.editArticleBtn = page.getByRole('button', {name: ' Edit Article' }).first();
        this.deleteMyCommentBtn = page.getByRole('button', {name: 'btn-outline-secondary' });
        this.deleteArticleBtn = page.getByRole('button', {name: ' Delete Article' });

        this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });

        this.myArticle = page.locator('.row.article-content .col-md-12 p').first();
        this.myComment = page.locator('.card .card-block .card-text');

        this.doDialogClick = page.once('dialog', dialog => {
                    console.log(`Dialog message: ${dialog.message()}`);
                    dialog.dismiss().catch(() => {});
        });
    }

    async checkMyArticle() {
        await this.myArticle.textContent();
        return poster; 
    }

    async goUpdateMyArticle() {
        await this.editArticleBtn.click();
    }

    async deleteMyArticle() {
        await this.deleteArticleBtn.click();
        await this.doDialogClick;
    }

    async makeNewComment (text) {
        await this.commentInput.click();
        await this.commentInput.fill(text);

        await this.commentBtn.click();
    }

    async checkMyComment() {
        await this.myComment.textContent();
        return commText;
    }

    async deleteMyComment() {
        await this.deleteMyCommentBtn.click();
        await this.doDialogClick;
    }

}