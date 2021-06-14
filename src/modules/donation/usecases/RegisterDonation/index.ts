import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { DonationRepo, RecipientRepo } from "../../repositories";
import { Amount, Donation, DonationType } from "../../domain";
import { DonationErrors } from "../errors";

export interface Input {
    amount: number;
    currency: string;
    type: DonationType;
    donatorId: string;
    recipientId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonationErrors.RecipientNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    recipientExists: RecipientRepo.Exists;
    save: DonationRepo.Save;
}

export function makeRegisterDonationUsecase(props: Props): UseCase<Input, Promise<Response>>{
    const { recipientExists, save } = props;

    return async function(request: Input): Promise<Response> {
        const amountRes = Amount.create(request.amount, request.currency);
        if(!amountRes.success){
            return left(amountRes);
        }

        try {
            if(!await recipientExists(request.recipientId)){
                return left(new DonationErrors.RecipientNotFound());
            }
    
            const donatorId = new UniqueId(request.donatorId);
            const recipientId = new UniqueId(request.recipientId);
    
            const donation = Donation.create({
                amount: amountRes.getValue(),
                date: new Date(),
                type: request.type,
                donatorId,
                recipientId
            }).getValue();
    
            await save(donation);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}