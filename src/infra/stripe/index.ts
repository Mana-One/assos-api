import { StoreConfig } from "../../config";
import Stripe from "stripe"


export const StripeStore = new Stripe(StoreConfig.PRIVATE_KEY, {
    // @ts-ignore
    apiVersion: " 2020-03-02"
})