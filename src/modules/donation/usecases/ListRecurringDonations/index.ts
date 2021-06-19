import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, getPaginated, left, Paginated, Result, right } from "../../../../core/logic";
import { RecurringDonationDto, RecurringDonationMap } from "../../mappers";
import { DonationRepo } from "../../repositories";

export interface Input {
    payerId: string;
    limit: number;
    offset: number;
}

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<Paginated<RecurringDonationDto>>
>;

interface Props {
    listRecurring: DonationRepo.ListRecuringByPayerId;
}

export function makeListRecurringDonationsUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { listRecurring } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const { total, recurringDonations } = await listRecurring(request.payerId, request.limit, request.offset);
            const recurringListDto = recurringDonations.map(elm => RecurringDonationMap.toDto(elm));
            const paginated = getPaginated<RecurringDonationDto>(
                total, recurringListDto, request.limit, request.offset
            );

            return right(Result.ok<Paginated<RecurringDonationDto>>(paginated));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}