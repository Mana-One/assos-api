import { User, UserEmailProps } from "../../domain";

export interface UserRepo {
    findByEmail(email: UserEmailProps): Promise<User.Type | null>
    save(user: User.Type): Promise<User.Type>
}