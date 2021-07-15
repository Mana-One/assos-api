import { UniqueId } from "../../../../core/domain";
import { models } from "../../../../infra/sequelize";
import { Article } from "../../domain";
import { ArticleWriteRepo } from "../../repositories";


export namespace SequelizeArticleWriteRepo {
    export const findById: ArticleWriteRepo.FindById = async (
        articleId: string
    ): Promise<Article | null> => {
        const instance = await models.Article.findByPk(articleId);
        if(instance === null){
            return null;
        }

        return Article.create({
            title: instance.title,
            content: instance.content,
            publicationDate: new Date(instance.publicationDate),
            associationId: new UniqueId(instance.associationId)
        }, new UniqueId(instance.id)).getValue();
    }

    export const remove: ArticleWriteRepo.Remove = async (article: Article): Promise<void> => {
        await models.Article.destroy({
            where: { id: article.getId().toString() }
        });
    }

    export const save: ArticleWriteRepo.Save = async (article: Article): Promise<void> => {
        await models.Article.upsert({
            id: article.getId().toString(),
            title: article.getTitle(),
            content: article.getContent(),
            publicationDate: article.getPublicationDate(),
            associationId: article.getAssociationId().toString()
        });
    }
}