import { Article } from "../domain";

export namespace ArticleWriteRepo {
    export interface FindById {
        (articleId: string): Promise<Article | null>;
    }

    export interface Save {
        (article: Article): Promise<void>;
    }
}