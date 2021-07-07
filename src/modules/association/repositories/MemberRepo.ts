import { Member } from "../domain";

export namespace MemberRepo {
    export interface CountManagers {
        (associationId: string): Promise<number>;
    }

    export interface FindMember {
        (memberId: string, associationId: string): Promise<Member | null>;
    }

    export interface Remove {
        (member: Member): Promise<void>;
    }

    export interface Save {
        (member: Member): Promise<void>;
    }
}