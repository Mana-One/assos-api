import { UniqueId } from "../../../core/domain";
import { Recipient } from "../domain";

export interface RecipientDto {
    readonly id: string;
    readonly name: string;
}

export namespace RecipientMap {
    export function toDto(recipient: Recipient){
        return Object.freeze({
            id: recipient.getId().toString(),
            name: recipient.getName()
        });
    }

    export function toDomain(raw: any): Recipient {
        return Recipient.create({
            name: raw.name,
            storeReference: raw.storeReference
        }, new UniqueId(raw.id)).getValue();
    }
}