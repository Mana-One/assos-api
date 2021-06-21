import { Response } from "express";
import { StripeStore } from "../../../../../infra/stripe";
import { ExpressController } from "../../../../../core/infra";
import { Amount, Payer, Recipient } from "../../../domain";

interface Payload {
    recipient: Recipient;
    payer: Payer;
    amount: Amount;
}

export async function createRecurringSessionController(payload: Payload, res: Response){
    const metadata =  {
        payerId: payload.payer.getId().toString(),
        recipientId: payload.recipient.getId().toString()
    };

    try {
        const session = await StripeStore.checkout.sessions.create({
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/fail",
            customer: payload.payer.getStoreReference(),
            payment_method_types: ["card"],
            mode: "subscription",
            metadata,
            line_items: [{
                price_data: {
                    currency: payload.amount.getCurrency().toLowerCase(),
                    unit_amount_decimal: String(Math.floor(payload.amount.getValue() * 100)),
                    product_data: {
                        name: "Donation"
                    },                    
                    recurring: {
                        interval: "month"
                    }
                },
                quantity: 1
            }],
            subscription_data: {
                transfer_data: {
                    destination: payload.recipient.getStoreReference()
                },
                metadata
            }
        });
    
        return ExpressController.created(res, { sessionId: session.id });

    } catch(err) {
        return ExpressController.fail(res, err);
    }

}