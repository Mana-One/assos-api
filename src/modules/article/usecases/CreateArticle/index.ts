import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { Article } from "../../domain";
import { ArticleWriteRepo } from "../../repositories";


export interface Input {
    title: string;
    content: string;
    associationId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    Result<any>,

    Result<void>
>;

interface Props {
    save: ArticleWriteRepo.Save
}

export function makeCreateArticleUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { save } = props;

    return async function(request: Input): Promise<Response> {
        const articleRes = Article.create({
            title: request.title,
            content: request.content,
            publicationDate: new Date(),
            associationId: new UniqueId(request.associationId)
        });
        if(!articleRes.success){
            return left(articleRes);
        }

        const article = articleRes.getValue();

        try {
            await save(article);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}