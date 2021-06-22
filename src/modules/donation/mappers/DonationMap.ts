import { RecipientDto, RecipientMap } from "./RecipientMap";
import { Amount, Donation } from "../domain";
import { UniqueId } from "../../../core/domain";


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

    export function toPersistence(donation: Donation){
        return Object.freeze({
            id: donation.getId().toString(),
            amount: donation.getAmount().getValue(),
            currency: donation.getAmount().getCurrency(),
            type: donation.getType(),
            payerId: donation.getPayerId().toString(),
            recipientId: donation.getRecipient().getId().toString()
        });
    }

    export function toDomain(raw: any){
        const recipient = RecipientMap.toDomain(raw.Association);

        return Donation.create({
            amount: Amount.create(raw.amount, raw.currency).getValue(),
            type: raw.type,
            payerId: new UniqueId(raw.payerId),
            date: new Date(raw.date),
            recipient
        }, new UniqueId(raw.id)).getValue();
    }
}