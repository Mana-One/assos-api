import { RecipientDto, RecipientMap } from "./RecipientMap";
import { Donation } from "../domain";


export interface DonationDto {
    readonly id: string;
    readonly amount: number;
    readonly currency: string;
    readonly type: string;
    readonly recipient: RecipientDto;
}

export namespace DonationMap {
    export function toDto(donation: Donation){
        return Object.freeze({
            id: donation.getId().toString(),
            amount: donation.getAmount().getValue(),
            currency: donation.getAmount().getCurrency(),
            type: donation.getType(),
            recipient: RecipientMap.toDto(donation.getRecipient())
        });
    }
}