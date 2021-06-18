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
}