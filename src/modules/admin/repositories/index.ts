import { Optional } from "../../../core/logic";
import { Admin } from "../domain";


export namespace AdminWriteRepo {
    export interface Exists {
        (email: string): Promise<boolean>;
    }

    export interface FindById {
        (id: string): Promise<Optional<Admin>>;
    }

    export interface Save {
        (admin: Admin): Promise<void>;
    }

    export interface Remove {
        (admin: Admin): Promise<void>;
    }
}