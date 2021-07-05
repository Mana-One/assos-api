import { Member } from "../domain";

export namespace MemberRepo {
    export interface Save {
        (member: Member): Promise<void>;
    }
}