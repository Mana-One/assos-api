import { UseCase, UniqueId } from "../../../../core/domain";
import { Either, AppErrors, Result, left, right } from "../../../../core/logic";
import { DonatorRepo } from "../../repositories";
import { WalletRepo } from "../../repositories/WalletRepo";
import { DonatorErrors } from "../errors";


export interface Input {
    donatorId: string;
    cardId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.CardNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    findById: DonatorRepo.FindById;
    findCardById: WalletRepo.FindCardById;
    save: DonatorRepo.Save;
}

export function makeRemoveCardUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findById, findCardById, save } = props;
    
    return async function(request: Input): Promise<Response> {
        try {
            const card = await findCardById(request.cardId);
            if(card === null){
                return left(new DonatorErrors.CardNotFound());
            }

            const donator = await findById(new UniqueId(request.donatorId));
            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }
            
            if(!donator.hasCard(card)){
                return left(new DonatorErrors.CardNotFound());
            }

            donator.removeCard(card);
            await save(donator);            
            return right(Result.ok<void>());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}