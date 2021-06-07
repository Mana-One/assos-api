import { UserEmail, UserName } from "../../../shared/domain";
import { Donator, StoreReference } from "../domain";


export namespace StoreService {
    export interface RegisterInput {
        firstName: UserName;
        lastName: UserName;
        email: UserEmail;
    }
    
    export interface Register {
        (input: RegisterInput): Promise<StoreReference>;
    }
    
    export interface RemoveDonator {
        (donator: Donator): Promise<void>;
    }
}