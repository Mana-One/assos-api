import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { DonationRepo, RecipientRepo } from "../../repositories";
import { Amount, Donation, DonationType } from "../../domain";
import { DonationErrors } from "../errors";

export interface Input {
    amount: number;
    currency: string;
    type: DonationType;
    payerId: string;
    recipientId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonationErrors.RecipientNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    findRecipient: RecipientRepo.FindById;
    save: DonationRepo.Save;
}

export function makeRegisterDonationUsecase(props: Props): UseCase<Input, Promise<Response>>{
    const { findRecipient, save } = props;

    return async function(request: Input): Promise<Response> {
        const amountRes = Amount.create(request.amount, request.currency);
        if(!amountRes.success){
            return left(amountRes);
        }

        try {
            const recipient = await findRecipient(request.recipientId)
            if(recipient === null){
                return left(new DonationErrors.RecipientNotFound());
            }
    
            const payerId = new UniqueId(request.payerId);
    
            const donation = Donation.create({
                amount: amountRes.getValue(),
                date: new Date(),
                type: request.type,
                payerId,
                recipient
            }).getValue();
    
            await save(donation);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}