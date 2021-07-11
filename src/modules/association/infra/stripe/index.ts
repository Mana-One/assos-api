import { StripeStore } from "../../../../infra/stripe";
import { StoreReference } from "../../domain";
import { Merchantservice } from "../../services";


export namespace StripeMerchantService {
    export const registerMerchant: Merchantservice.RegisterMerchant = async (name: string, email: string): Promise<StoreReference> => {
        const account = await StripeStore.accounts.create({
            type: 'express',
            business_profile: {
                name
            },
            capabilities: {
                card_payments: {
                    requested: true
                },
                transfers: {
                    requested: true
                }
            },
            email 
        });

        return account.id;
    }
}