import { UniqueId } from "../../../../core/domain";
import { User, UserEmail } from "../../domain";

export interface UserRepo {
    findByEmail(email: UserEmail): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    save(user: User): Promise<void>;
}