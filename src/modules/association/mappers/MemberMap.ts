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
}