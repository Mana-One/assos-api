import { StoreReference } from "../domain";

export namespace Merchantservice {
    export interface RegisterMerchant {
        (name: string, email: string): Promise<StoreReference>;
    }
}