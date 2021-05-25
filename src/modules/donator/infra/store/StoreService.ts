import { UserName } from "../../../../shared/domain";
import { Donator, StoreReference } from "../../domain";

export interface RegisterInput {
    fisrtName: UserName;
    lastName: UserName;
}

export interface StoreService {
    register(input: RegisterInput): Promise<StoreReference>;
    removeDonator(donator: Donator): Promise<void>;
}