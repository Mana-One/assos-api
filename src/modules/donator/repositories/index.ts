import { UserEmail } from "../../../shared/domain";
import { Donator, DonatorListDto } from "../domain";

export namespace DonatorWriteRepo {
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

export namespace DonatorReadRepo {
    export interface ListDonators {
        (limit: number, offset: number): Promise<DonatorListDto>;
    }
}