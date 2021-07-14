import { Article } from "../domain";

export namespace ArticleWriteRepo {
    export interface FindById {
        (articleId: string): Promise<Article | null>;
    }

    export interface Remove {
        (article: Article): Promise<void>;
    }

    export interface Save {
        (article: Article): Promise<void>;
    }
}