import { UniqueId } from "../../../core/domain";
import { Role, UserEmail, UserName, UserPassword } from "../../../shared/domain";
import { Donator } from "../domain";
import { WalletMap } from "./WalletMap";

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

    export function toDomain(raw: any): Donator {
        const uid = new UniqueId(raw.id);
        const email = UserEmail.create(raw.email).getValue();
        const firstName = UserName.create(raw.firstName).getValue();
        const lastName = UserName.create(raw.lastName).getValue();
        const password = UserPassword.createHashed(raw.password).getValue();
        const storeReference = raw.storeReference;
        const wallet = WalletMap.toDomain(raw.Cards);

        return Donator.create({
            firstName,
            lastName,
            email,
            password,
            storeReference,
            wallet
        }, uid).getValue();
    }

    export async function toPersistence(donator: Donator){
        return Object.freeze({
            id: donator.getId().toString(),
            firstName: donator.getFirstName().getValue(),
            lastName: donator.getLastName().getValue(),
            email: donator.getEmail().getValue(),
            password: await donator.getHashedPassword(),
            role: Role.DONATOR
        });
    }
}