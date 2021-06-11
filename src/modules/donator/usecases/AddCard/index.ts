import { UseCase, UniqueId } from "../../../../core/domain";
import { Either, AppErrors, Result, left, right } from "../../../../core/logic";
import { CardLast4, Card } from "../../domain";
import { DonatorRepo } from "../../repositories";
import { DonatorErrors } from "../errors";


export interface Input {
    donatorId: string;
    last4: string;
    storeReference: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.DonatorNotFound |
    DonatorErrors.WalletIsFull |
    Result<any>,
    
    Result<void>
>;

interface Props {
    findById: DonatorRepo.FindById;
    save: DonatorRepo.Save;
}

export function makeAddCardUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findById, save } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const donator = await findById(request.donatorId);

            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }

            if(donator.isWalletFull()){
                return left(new DonatorErrors.WalletIsFull());
            }

            const last4Res = CardLast4.create(request.last4);
            if(!last4Res.success){
                return left(last4Res);
            }
            
            const last4 = last4Res.getValue();
            const cardRes = Card.create({ 
                last4, 
                storeReference: request.storeReference
            });
            if(!cardRes.success){
                return left(cardRes);
            }

            const card = cardRes.getValue();
            donator.addCard(card);

            await save(donator);
            return right(Result.ok<void>());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}