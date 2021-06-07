import { User } from "../domain";
import { UserEmail } from "../../../shared/domain";


export namespace UserRepo {
    export interface FindByEmail {
        (email: UserEmail): Promise<User | null>;
    }

    export interface FindById {
        (userId: string): Promise<User | null>;
    }

    export interface Save {
        (user: User): Promise<void>;
    }
}