import { UserEmail } from "../../../shared/domain";
import { Association, Member } from "../domain";


export namespace AssociationRepo {
    export interface CreateAssociation {
        (association: Association, manager: Member): Promise<void>;
    }

    export interface IsMemberEmailUsed {
        (email: UserEmail): Promise<boolean>;
    }
}