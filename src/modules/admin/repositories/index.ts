import { Admin } from "../domain";


export namespace AdminWriteRepo {
    export interface Save {
        (admin: Admin): Promise<void>;
    }

    export interface Remove {
        (admin: Admin): Promise<void>;
    }
}