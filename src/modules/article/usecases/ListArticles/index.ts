import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, getPaginated, left, Paginated, Result, right } from "../../../../core/logic";
import { ArticleListItemDto } from "../../domain";
import { ArticleReadRepo } from "../../repositories";


export interface Input {
    associationId: string;
    limit: number;
    offset: number;
}

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<Paginated<ArticleListItemDto>>
>;

interface Dependencies {
    listArticles: ArticleReadRepo.ListByAssociation
}

export function makeListArticlesUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { listArticles } = dependencies;

    return async function(request: Input): Promise<Response> {
        try {
            const { total, articles } = await listArticles(
                request.associationId, 
                request.limit, 
                request.offset
            );
    
            const paginated = getPaginated(total, articles, request.limit, request.offset);
            return right(Result.ok<Paginated<ArticleListItemDto>>(paginated));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}