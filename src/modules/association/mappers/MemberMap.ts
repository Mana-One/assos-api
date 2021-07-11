import { UniqueId } from "../../../core/domain";
import { UserEmail, UserName, UserPassword } from "../../../shared/domain";
import { Member } from "../domain";

export interface MemberDto {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly role: string
}

export namespace MemberMap {
    export function toDto(member: Member): MemberDto {
        return Object.freeze({
            id: member.getId().toString(),
            firstName: member.getFirstName().getValue(),
            lastName: member.getLastName().getValue(),
            role: member.getRole()
        });
    }

    export async function toPersistence(member: Member){
        return Object.freeze({
            id: member.getId().toString(),
            firstName: member.getFirstName().getValue(),
            lastName: member.getLastName().getValue(),
            email: member.getEmail().getValue(),
            password: await member.getHashedPassword(),
            role: member.getRole(),
            associationId: member.getAssociationId().toString()
        });
    }

    export function toDomain(raw: any): Member {
        return Member.create({
            firstName: UserName.create(raw.firstName).getValue(),
            lastName: UserName.create(raw.lastName).getValue(),
            email: UserEmail.create(raw.email).getValue(),
            password: UserPassword.createHashed(raw.password).getValue(),
            role: raw.role,
            associationId: new UniqueId(raw.associationId)
        }, new UniqueId(raw.id)).getValue();
    }
}