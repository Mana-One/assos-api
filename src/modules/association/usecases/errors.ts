import { Result, UseCaseError } from "../../../core/logic";


export namespace AssociationErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Account already exists"
            });
        }
    }

    export class AssociationNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Association not found"
            });
        }
    }

    export class MemberNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: "Member not found"
            });
        }
    }

    export class NeedAtLeastOneManager extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: 'At least one manager must be present in an association'
            });
        }
    }
}