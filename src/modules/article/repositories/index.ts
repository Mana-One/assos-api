import { Article, ArticleDto, ArticleListDto } from "../domain";

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

export namespace ArticleReadRepo {
    export interface FindById {
        (articleId: string): Promise<ArticleDto | null>;
    }

    export interface ListByAssociation {
        (associationId: string, limit: number, offset: number): Promise<ArticleListDto>;
    }
}