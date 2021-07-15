import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { ArticleDto } from "../../domain";
import { ArticleReadRepo } from "../../repositories";
import { ArticleErrors } from "../errors";


export interface Input {
    articleId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    ArticleErrors.ArticleNotFound,

    Result<ArticleDto>
>;

export interface Dependencies {
    findArticle: ArticleReadRepo.FindById
}

export function makeGetArticleUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { findArticle } = dependencies;

    return async function(request: Input): Promise<Response> {
        try {
            const article = await findArticle(request.articleId);
            if(article === null){
                return left(new ArticleErrors.ArticleNotFound());
            }
    
            return right(Result.ok<ArticleDto>(article));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}