import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, getPaginated, left, Paginated, Result, right } from "../../../../core/logic";
import { DonatorListItemDto } from "../../domain";
import { DonatorReadRepo } from "../../repositories";

export interface Input {
    limit: number;
    offset: number;
}

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<Paginated<DonatorListItemDto>>
>;

interface Dependencies {
    list: DonatorReadRepo.ListDonators
}

export function makeListDonatorsUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { list } = dependencies;

    return async function(request: Input): Promise<Response> {
        try {
            const { total, donators } = await list(request.limit, request.offset);
            const paginated = getPaginated(total, donators, request.limit, request.offset);
            return right(Result.ok<Paginated<DonatorListItemDto>>(paginated));
            
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}