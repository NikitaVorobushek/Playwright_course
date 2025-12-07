// export class NewArticlePage {

//     constructor(page) {
//         this.page = page;

//         this.publishArticleBtn = page.getByRole('button', {name: 'Publish Article' });

//         this.ArticleTitle = page.getByRole('textbox', {name: 'Article Title' });
//         this.ArticleAbout = page.getByRole('textbox', {name: 'What\'s this article about?' }); //нету
//         this.ArticleTopic = page.getByRole('textbox', {name: 'Write your article (in markdown)' });
//         this.ArticleTag = page.getByRole('textbox', {name: 'Enter tags' });
//     }

//     async makeNewArticle (title, about, topic, tag) {

//         await this.ArticleTitle.click();
//         await this.ArticleTitle.fill(title);

//         await this.ArticleAbout.click();
//         await this.ArticleAbout.fill(about);

//         await this.ArticleTopic.click();
//         await this.ArticleTopic.fill(topic);

//         await this.ArticleTag.click();
//         await this.ArticleTag.fill(tag);

//         await this.publishArticleBtn.click();
//     }
// }