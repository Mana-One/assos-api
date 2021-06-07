import { UserEmail } from "../../../shared/domain";
import { Donator } from "../domain";

export namespace DonatorRepo {
    export interface IsEmailUsed {
        (email: UserEmail): Promise<boolean>;
    }
    
    export interface FindById {
        (donatorId: string): Promise<Donator | null>;
    }

    export interface Remove {
        (donator: Donator): Promise<void>;
    }
    
    export interface Save {
        (donator: Donator): Promise<void>;
    }
}