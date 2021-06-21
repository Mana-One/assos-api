import { Request, Response } from "express";
import { ExpressController } from "../../../../../core/infra";
import { Amount } from "../../../domain";
import { SequelizeDonationRepo, SequelizeRecipientRepo } from "../../sequelize";
import { SequelizePayerRepo } from "../../sequelize/SequelizePayerRepo";
import { createPaymentSessionController } from "./create-payment-session.controller";
import { createRecurringSessionController } from "./create-recurring-session.controller";


export async function checkoutSessionController(req: Request, res: Response){
    const { mode, recipientId, amount, currency } = req.body;
    const payerId = req.body.account?.id;

    if(mode !== "payment" && mode !== "subscription"){
        return ExpressController.clientError(res, "Invalid mode");
    }

    const amountRes = Amount.create(amount, currency);
    if(!amountRes.success){
        return ExpressController.clientError(res);
    }

    const payer = await SequelizePayerRepo.findById(payerId);    
    const recipient = await SequelizeRecipientRepo.findById(recipientId);
    if(payer === null || recipient === null){
        return ExpressController.notFound(res)
    }

    if(mode === "payment"){
        return await createPaymentSessionController({
            amount: amountRes.getValue(),
            payer,
            recipient
        }, res);
    }

    const recurring = SequelizeDonationRepo.findRecurring(payerId, recipientId);
    if(recurring !== null){
        return ExpressController.conflict(res, "Existing recurring donation for this recipient");
    }

    return await createRecurringSessionController({
        amount: amountRes.getValue(),
        payer,
        recipient
    }, res);
}