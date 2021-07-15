import { models } from "../../../../infra/sequelize";
import { ArticleDto, ArticleListDto, createArticleDto, createArticleListDto } from "../../domain";
import { ArticleReadRepo } from "../../repositories";


export namespace SequelizeArticleReadRepo {
    export const findById: ArticleReadRepo.FindById = async (articleId: string): Promise<ArticleDto | null> => {
        const instance = await models.Article.findByPk(articleId);
        if(instance === null){
            return null;
        }

        return createArticleDto(instance);
    }

    export const listByAssociation: ArticleReadRepo.ListByAssociation = async (
        associationId: string, 
        limit: number, 
        offset: number
    ): Promise<ArticleListDto> => {
        const { count: total, rows} = await models.Article.findAndCountAll({
            where: { associationId },
            order: [['publicationDate', 'DESC']],
            limit,
            offset
        });

        return createArticleListDto(rows, total);
    }
}