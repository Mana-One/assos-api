import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { ArticleWriteRepo } from "../../repositories";
import { ArticleErrors } from "../errors";

export interface Input {
    articleId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    ArticleErrors.ArticleNotFound,

    Result<void>
>;

interface Props {
    findArticle: ArticleWriteRepo.FindById,
    remove: ArticleWriteRepo.Remove
}

export function makeRemoveArticleUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findArticle, remove } = props;

    return async function(request: Input): Promise<Response> {
        try { 
            const article = await findArticle(request.articleId);
            if(article === null){
                return left(new ArticleErrors.ArticleNotFound());
            }
    
            await remove(article);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}