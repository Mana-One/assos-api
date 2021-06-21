import express, { Router, Request, Response, Express } from "express";
import { makeIsAuth } from "../../../shared/infra/express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { makeCancelRecurringDonationUsecase } from "../usecases/CancelRecurringDonation";
import { makeListDonationsUsecase } from "../usecases/ListDonations";
import { makeCancelRecurringDonationController, makeListDonationsController, paymentHooksController } from "./express";
import { checkoutSessionController } from "./express/checkoutSessionController";
import { SequelizeDonationRepo, SequelizeRecipientRepo, SequelizePayerRepo } from "./sequelize";
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
const listDonationsUsecase = makeListDonationsUsecase({
    listDonations: SequelizeDonationRepo.listByPayerId
});

const cancelRecurringDonationController = makeCancelRecurringDonationController(
    cancelRecurringDonationUsecase
);
const listDonationsController = makeListDonationsController(
    listDonationsUsecase
);

router.get(
    "/", 
    express.json(), 
    isAuth,
    async (req: Request, res: Response) => listDonationsController(req, res)
);

router.post(
    "/hooks", 
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => paymentHooksController(req, res) 
);

router.post(
    "/checkout",
    express.json(),
    isAuth,
    async (req: Request, res: Response) => checkoutSessionController(req, res)
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