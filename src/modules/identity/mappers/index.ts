import { UniqueId } from "../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";
import { User } from "../domain";


export interface UserDto {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly role: string;
}

export namespace UserMap {
    export function toDomain(raw: any): User | null {
        const email = UserEmail.create(raw.email).getValue();
        const firstName = UserName.create(raw.firstName).getValue();
        const lastName = UserName.create(raw.lastName).getValue();
        const password = UserPassword.createHashed(raw.password).getValue();
        const uid = new UniqueId(raw.id);
    
        return User.create({
            firstName,
            lastName,
            email,
            password,
            role: raw.role
        }, uid).getValue();
    }

    export async function toPersistence(user: User) {
        return {
            firstName: user.getFirstName().getValue(),
            lastName: user.getLastName().getValue(),
            email: user.getEmail().getValue(),
            password: await user.getHashedPassword()
        }
    }

    export function toDto(user: User): UserDto {
        return {
            id: user.getId().toString(),
            firstName: user.getFirstName().getValue(),
            lastName: user.getLastName().getValue(),
            email: user.getEmail().getValue(),
            role: user.getRole()
        }
    } 
}