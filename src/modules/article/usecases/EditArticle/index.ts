import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { ArticleWriteRepo } from "../../repositories";
import { ArticleErrors } from "../errors";


export interface Input {
    articleId: string;
    title?: string;
    content?: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    ArticleErrors.ArticleNotFound,

    Result<void>
>;

interface Props {
    findArticle: ArticleWriteRepo.FindById,
    save: ArticleWriteRepo.Save
}

export function makeEditArticleUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { findArticle, save } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const article = await findArticle(request.articleId);
            if(article === null){
                return left(new ArticleErrors.ArticleNotFound());
            }
    
            const editRes = article.editInfo({ ...request });
            if(!editRes.success){
                return left(editRes);
            }
    
            await save(article);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}