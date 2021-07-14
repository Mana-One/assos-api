import { Article } from "../domain";

export namespace ArticleWriteRepo {
    export interface Save {
        (article: Article): Promise<void>;
    }
}