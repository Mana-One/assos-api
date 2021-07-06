import { UserEmail } from "../../../shared/domain";
import { Association, Member } from "../domain";


export namespace AssociationRepo {
    export interface CreateAssociation {
        (association: Association, manager: Member): Promise<void>;
    }

    export interface FindById {
        (associationId: string): Promise<Association | null>;
    }

    export interface IsMemberEmailUsed {
        (email: UserEmail): Promise<boolean>;
    }

    export interface Remove {
        (association: Association): Promise<void>;
    }

    export interface Save {
        (assocaition: Association): Promise<void>;
    }
}