import { config } from "dotenv";
import { get } from "env-var";
config();


export namespace StoreConfig {
    export const PRIVATE_KEY: string = get("STRIPE_PRIVATE_KEY").required().asString();
    export const ENDPOINT_KEY: string = get("STRIPE_ENDPOINT_KEY").required().asString();
    export const MERCHANT_ENDPOINT_KEY: string = get("STRIPE_MERCHANT_ENDPOINT_KEY").required().asString();
    export const DONATION_SUCCESS_URL: string = get("STRIPE_DONATION_SUCCESS").required().asString();
    export const DONATION_FAIL_URL: string = get("STRIPE_DONATION_FAIL").required().asString();
    export const ONBOARDING_RETURN_URL: string = get("STRIPE_ONBOARDING_RETURN_URL").required().asString();
}