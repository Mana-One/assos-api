import { UniqueId } from "../../../../core/domain";
import { UserEmail } from "../../../../shared/domain";
import { Donator } from "../../domain";

export interface DonatorRepo {
    isEmailUsed(email: UserEmail): Promise<boolean>;
    findById(donatorId: UniqueId): Promise<Donator | null>;
    remove(donator: Donator): Promise<void>;
    save(donator: Donator): Promise<void>;
}