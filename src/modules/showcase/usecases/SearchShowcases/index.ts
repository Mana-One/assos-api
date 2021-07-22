import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, getPaginated, left, Paginated, Result, right } from "../../../../core/logic";
import { ShowcaseListItemDto } from "../../domain";
import { ShowcaseRepo } from "../../repositories";

export interface Input {
    input: string;
    limit: number;
    offset: number;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    Result<any>,

    Result<Paginated<ShowcaseListItemDto>>
>;

interface Props {
    search: ShowcaseRepo.Search
}

export function makeSearchShowcasesUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { search } = props;

    return async function(request: Input): Promise<Response> {
        if(request.input.length === 0){
            return left(Result.ko<any>('Invalid input'));
        }
        try {
            const { total, showcases } = await search(request.input, request.limit, request.offset);
            const paginated = getPaginated<ShowcaseListItemDto>(
                total, showcases, request.limit, request.offset
            );
            return right(Result.ok<Paginated<ShowcaseListItemDto>>(paginated));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}