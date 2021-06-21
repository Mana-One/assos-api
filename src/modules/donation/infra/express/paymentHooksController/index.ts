import { Request, Response } from "express";
import Stripe from "stripe";
import { StoreConfig } from "../../../../../config";
import { ExpressController } from "../../../../../core/infra";
import { StripeStore } from "../../../../../infra/stripe"
import { DonationType } from "../../../domain";
import { registerDonationController, setUpRecurringDonationController } from "./controllers";


export async function paymentHooksController(req: Request, res: Response){
    const sig = req.headers['stripe-signature'];
    if(sig == null || !Buffer.isBuffer(req.body)){
        return ExpressController.clientError(res, "Missing signature or body");
    }

    try {
        const event = StripeStore.webhooks.constructEvent(req.body, sig, StoreConfig.ENDPOINT_KEY);
        switch(event.type){
            case "checkout.session.completed":
                const session = <Stripe.Checkout.Session>event.data.object;
                return await handleCheckoutSession(session, res);
            default:
                return ExpressController.forbidden(res, "Unhandled event");
        }

    } catch(err) {
        return ExpressController.clientError(res, "Event not verified");
    }    
}

async function handleCheckoutSession(
    session: Stripe.Checkout.Session,
    res: Response
){
    const data = session.metadata;
    if(data === null){
        return ExpressController.clientError(res, "No metadata");
    }

    switch(session.mode){        
        case "payment":
            return await registerDonationController({
                amount: Number.parseInt(String(session.amount_total)) / 100,
                currency: String(session.currency),
                type: DonationType.SINGLE,
                payerId: data.payerId,
                recipientId: data.recipientId
            }, res);

        case "subscription":
            return await setUpRecurringDonationController({
                amount: Number.parseInt(String(session.amount_total)) / 100,
                currency: String(session.currency),
                donationStoreReference: session.subscription,
                payerId: data.payerId,
                recipientId: data.recipientId
            }, res);

        default:
            return ExpressController.forbidden(res);
    }
}