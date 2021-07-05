import { Response } from "express";
import { StripeStore } from "../../../../../infra/stripe";
import { ExpressController } from "../../../../../core/infra";
import { Amount, Payer, Recipient } from "../../../domain";
import { StoreConfig } from "../../../../../config";

interface Payload {
    recipient: Recipient;
    payer: Payer;
    amount: Amount;
}

export async function createPaymentSessionController(payload: Payload, res: Response){
    const metadata =  {
        payerId: payload.payer.getId().toString(),
        recipientId: payload.recipient.getId().toString()
    };

    try {
        const session = await StripeStore.checkout.sessions.create({
            success_url: StoreConfig.DONATION_SUCCESS_URL,
            cancel_url: StoreConfig.DONATION_FAIL_URL,
            customer: payload.payer.getStoreReference(),
            payment_method_types: ["card"],
            mode: "payment",
            metadata,
            line_items: [{
                price_data: {
                    currency: payload.amount.getCurrency().toLowerCase(),
                    unit_amount_decimal: String(Math.floor(payload.amount.getValue() * 100)),
                    product_data: {
                        name: "Donation"
                    }
                },
                quantity: 1
            }],
            payment_intent_data: {
                on_behalf_of: payload.recipient.getStoreReference(),
                metadata
            }
        });
    
        return ExpressController.created(res, { sessionId: session.id });

    } catch(err) {
        return ExpressController.fail(res, err);
    }
}