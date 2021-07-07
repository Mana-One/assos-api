import { Member } from "../domain";

export namespace MemberRepo {
    export interface ListMembersResponse {
        total: number;
        members: Member[];
    }

    export interface CountManagers {
        (associationId: string): Promise<number>;
    }

    export interface FindMember {
        (memberId: string, associationId: string): Promise<Member | null>;
    }

    export interface ListMembersByAsociation {
        (aId: string, limit: number, offset: number, role?: string): Promise<ListMembersResponse>;
    }
 
    export interface Remove {
        (member: Member): Promise<void>;
    }

    export interface Save {
        (member: Member): Promise<void>;
    }
}