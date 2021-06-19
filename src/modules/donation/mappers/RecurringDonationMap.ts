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
}