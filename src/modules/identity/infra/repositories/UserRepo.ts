import { User } from "../../domain";
import { UserEmail } from "../../.././../shared/domain";

export interface UserRepo {
    findByEmail(email: UserEmail): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    save(user: User): Promise<void>;
}