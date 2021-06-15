import { Payer } from "../domain";


export namespace PayerRepo {
    export interface FindById {
        (payerId: string): Promise<Payer | null>;
    }
}