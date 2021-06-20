import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { Amount } from "../../domain";
import { DonationRepo, PayerRepo, RecipientRepo } from "../../repositories";
import { PaymentService } from "../../services";
import { DonationErrors } from "../errors";

export interface Input {
    amount: number;
    currency: string;
    payerId: string;
    recipientId: string;
    donationStoreReference: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonationErrors.RecipientNotFound |
    DonationErrors.PayerNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    findPayerById: PayerRepo.FindById,
    findRecipientById: RecipientRepo.FindById,
    setUpRecurringDonation: DonationRepo.SetUpRecurring
}

export function makeSetUpRecurringDonationUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { 
        findPayerById, 
        findRecipientById, 
        setUpRecurringDonation
    } = props;
    
    return async function(request: Input): Promise<Response> {
        const amountRes = Amount.create(request.amount, request.currency);
        if(!amountRes.success){
            return left(amountRes);
        }        

        const amount = amountRes.getValue();
        
        try {
            const payer = await findPayerById(request.payerId);
            const recipient = await findRecipientById(request.recipientId);
            if(payer === null){
                return left(new DonationErrors.PayerNotFound());
            }
            if(recipient === null){
                return left(new DonationErrors.RecipientNotFound());
            }
    
            await setUpRecurringDonation(
                payer.getId().toString(), 
                recipient.getId().toString(),
                amount,
                request.donationStoreReference
            );
            
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}