import { Donator } from "../domain";

export interface DonatorDto {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
}

export namespace DonatorMap {
    export function toDto(donator: Donator){
        return Object.freeze({
            id: donator.getId().toString(),
            firstName: donator.getFirstName().getValue(),
            lastName: donator.getLastName().getValue(),
            email: donator.getEmail().getValue()
        });
    }
}