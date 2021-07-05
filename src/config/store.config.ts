import { config } from "dotenv";
import { get } from "env-var";
config();


export namespace StoreConfig {
    export const PRIVATE_KEY: string = get("STRIPE_PRIVATE_KEY").required().asString();
    export const ENDPOINT_KEY: string = get("STRIPE_ENDPOINT_KEY").required().asString();
    export const DONATION_SUCCESS_URL: string = get("STRIPE_DONATION_SUCCESS").required().asString();
    export const DONATION_FAIL_URL: string = get("STRIPE_DONATION_FAIL").required().asString();
}