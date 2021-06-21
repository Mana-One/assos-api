import express, { Router, Request, Response, Express } from "express";
import { makeIsAuth } from "../../../shared/infra/express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { makeCancelRecurringDonationUsecase } from "../usecases/CancelRecurringDonation";
import { makeCancelRecurringDonationController, paymentHooksController } from "./express";
import { SequelizeDonationRepo, SequelizeRecipientRepo } from "./sequelize";
import { SequelizePayerRepo } from "./sequelize/SequelizePayerRepo";
import { StripePaymentService } from "./stripe";


const router = Router();
const isAuth = makeIsAuth({
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload
});

const cancelRecurringDonationUsecase = makeCancelRecurringDonationUsecase({
    cancelRecurringPayment: StripePaymentService.cancelRecurringPayment,
    findPayerById: SequelizePayerRepo.findById,
    findRecipientById: SequelizeRecipientRepo.findById,
    findRecurringDonation: SequelizeDonationRepo.findRecurring,
    removeRecurringDonation: SequelizeDonationRepo.removeRecurring
});

const cancelRecurringDonationController = makeCancelRecurringDonationController(
    cancelRecurringDonationUsecase
);

router.post(
    "/hooks", 
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => paymentHooksController(req, res) 
);

router.delete(
    "/recurring", 
    express.json(),
    isAuth, 
    async (req: Request, res: Response) => cancelRecurringDonationController(req, res)
)

export function addDonationRouter(app: Express){
    app.use("/donation", router);
}