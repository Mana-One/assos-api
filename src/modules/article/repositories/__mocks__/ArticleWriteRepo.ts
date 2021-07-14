import { UniqueId } from "../../../../core/domain";
import { Article } from "../../domain";

export const FindById = {
    null: async (articleId: string) => null,
    notNull: async (articleId: string) => {
        return Article.create({
            title: 'a title',
            content: 'a content',
            publicationDate: new Date(),
            associationId: new UniqueId('an association id')
        }, new UniqueId(articleId)).getValue();
    },
    throw: async (articleId: string) => { throw new Error('oopsie'); }
}

export const Save = {
    ok: async (article: Article) => {},
    throw: async (article: Article) => { throw new Error('oopsie'); }
}