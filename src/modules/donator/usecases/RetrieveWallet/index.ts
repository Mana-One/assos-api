import { UseCase } from "../../../../core/domain";
import { Either, AppErrors, Result, right, left } from "../../../../core/logic";
import { WalletDto, WalletMap } from "../../mappers";
import { WalletRepo } from "../../repositories/WalletRepo";


export interface Input {
    donatorId: string;
};

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<WalletDto>
>;

interface Props {
    retrieveByDonatorId: WalletRepo.RetrieveByDonatorId;
}

export function makeRetrieveWalletUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { retrieveByDonatorId } = props;
    
    return async function(request: Input): Promise<Response> {
        try {
            const wallet = await retrieveByDonatorId(request.donatorId);
            const walletDto = WalletMap.toDto(wallet);
            return right(Result.ok<WalletDto>(walletDto));
             
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}