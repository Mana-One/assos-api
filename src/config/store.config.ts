import { config } from "dotenv";
import { get } from "env-var";
config();


export namespace StoreConfig {
    export const PRIVATE_KEY: string = get("STRIPE_PRIVATE_KEY").required().asString();
}