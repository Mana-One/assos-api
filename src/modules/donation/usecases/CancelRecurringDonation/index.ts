import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { DonationRepo, PayerRepo, RecipientRepo } from "../../repositories";
import { PaymentService } from "../../services";
import { DonationErrors } from "../errors";

export interface Input {
    payerId: string;
    recipientId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonationErrors.PayerNotFound |
    DonationErrors.RecipientNotFound |
    DonationErrors.RecipientNotFound,
    
    Result<void>
>;

interface Props {
    cancelRecurringPayment: PaymentService.CancelRecurringPayment,
    findPayerById: PayerRepo.FindById,
    findRecipientById: RecipientRepo.FindById,
    findRecurringDonation: DonationRepo.FindRecurring,
    removeRecurringDonation: DonationRepo.RemoveRecurring
}

export function makeCancelRecurringDonationUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { 
        cancelRecurringPayment, 
        findPayerById, 
        findRecipientById,
        findRecurringDonation,
        removeRecurringDonation 
    } = props;
    
    return async function(request: Input): Promise<Response> {
        try {
            const payer = await findPayerById(request.payerId);
            const recipient = await findRecipientById(request.recipientId);
            if(payer === null){
                return left(new DonationErrors.PayerNotFound());
            }
            if(recipient === null){
                return left(new DonationErrors.RecipientNotFound());
            }
    
            const recurring = await findRecurringDonation(request.payerId, request.recipientId);
            if(recurring === null){
                return left(new DonationErrors.RecurringDonationNotFound());
            }
    
            await cancelRecurringPayment(recurring.getStoreReference());
            await removeRecurringDonation(recurring);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}