import { UniqueId } from "../../../core/domain";
import { Amount, Donation, Recipient } from "../domain";
import { RecurringDonation } from "../domain/RecurringDonation";
import { RecipientDto, RecipientMap } from "./RecipientMap";

export interface RecurringDonationDto {
    readonly amount: number;
    readonly currency: string;
    readonly createAt: Date;
    readonly recipient: RecipientDto;
}

export namespace RecurringDonationMap {
    export function toDto(recurring: RecurringDonation): RecurringDonationDto {
        return Object.freeze({
            amount: recurring.getAmount().getValue(),
            currency: recurring.getAmount().getCurrency(),
            createAt: recurring.getCreatedAt(),
            recipient: RecipientMap.toDto(recurring.getRecipient())
        })
    }

    export function toDomain(raw: any){
        const recipient = RecipientMap.toDomain(raw.Association);

        return RecurringDonation.create(
            new UniqueId(raw.payerId),
            recipient,
            Amount.create(raw.amount, raw.currency).getValue(),
            String(raw.storeReference),
            new Date(raw.createdAt)
        ).getValue();
    }
}