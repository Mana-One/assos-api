import { Request, Response } from "express";
import Stripe from "stripe";
import { StoreConfig } from "../../../../../config";
import { ExpressController } from "../../../../../core/infra";
import { StripeStore } from "../../../../../infra/stripe"


export async function paymentHooksController(req: Request, res: Response){
    const sig = req.headers['stripe-signature'];
    if(sig == null || !Buffer.isBuffer(req.body)){
        console.log("oops")
        return ExpressController.clientError(res, "Missing signature or body");
    }

    try {
        const event = StripeStore.webhooks.constructEvent(req.body, sig, StoreConfig.ENDPOINT_KEY);
        switch(event.type){
            case "checkout.session.completed":
                console.log("hey")
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
    switch(session.mode){        
        case "payment":
            console.log("payment")
            break
            //return await registerDonationController(data, res);
        case "subscription":
            console.log("sub")
            break
            //return await setUpRecurringDonationController(data, res);
        default:
            return ExpressController.forbidden(res);
    }
    return ExpressController.ok(res);
}