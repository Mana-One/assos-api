import { UseCase } from "../../../../core/domain";
import { Either, AppErrors, Result, Paginated, getPaginated, right, left } from "../../../../core/logic";
import { DonationDto, DonationMap } from "../../mappers";
import { DonationRepo } from "../../repositories";


export interface Input {
    recipientId: string;
    limit: number;
    offset: number;
}

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<Paginated<DonationDto>>
>;

interface Props {
    listDonations: DonationRepo.ListByRecipientId
}

export function makeListReceivedDonationsUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { listDonations } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const { total, donations } = await listDonations(request.recipientId, request.limit, request.offset);
            const donationListDto = donations.map(elm => DonationMap.toDto(elm));
            const paginated = getPaginated<DonationDto>(
                total, donationListDto, request.limit, request.offset
            );
    
            return right(Result.ok<Paginated<DonationDto>>(paginated));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}