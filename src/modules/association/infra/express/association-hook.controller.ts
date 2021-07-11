import { Request, Response } from 'express';
import Stripe from 'stripe';
import { StoreConfig } from '../../../../config';
import { ExpressController } from '../../../../core/infra';
import { models } from '../../../../infra/sequelize';
import { StripeStore } from '../../../../infra/stripe';
import { AssociationStatus } from '../../domain';


export async function associationHooksController(req: Request, res: Response){
    const sig = req.headers['stripe-signature'];
    if(sig == null || !Buffer.isBuffer(req.body)){
        return ExpressController.clientError(res, 'Missing signature or body');
    }

    try {
        const event = StripeStore.webhooks.constructEvent(req.body, sig, StoreConfig.MERCHANT_ENDPOINT_KEY);
        switch(event.type){
            case 'account.updated':
                const account = <Stripe.Account>event.data.object;
                return await handleAccountUpdated(account, res);
            default:
                return ExpressController.forbidden(res, 'Unhandled event');
        }

    } catch(err) {
        return ExpressController.clientError(res, 'Event not verified');
    }    
}

async function handleAccountUpdated(
    account: Stripe.Account,
    res: Response
){
    const association = await models.Association.findOne({
        where: { storeReference: account.id }
    });
    if(association === null){
        return ExpressController.notFound(res, 'Account not found');
    }

    if(account.charges_enabled){
        await association.update({
            status: AssociationStatus.VALID
        });
    }
    return ExpressController.ok(res);
}