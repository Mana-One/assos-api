import express, { Router, Request, Response, Express } from "express";
import { makeIsAuth } from "../../../shared/infra/express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { paymentHooksController } from "./express";
import { checkoutSessionController } from "./express/checkoutSessionController";
import { 
    listDonationsController, 
    listRecurringDonationsController, 
    cancelRecurringDonationController, listReceivedDonationsController 
} from "./controllers";


const router = Router();
const isAuth = makeIsAuth({
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload
});

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

router.get(
    "/received",
    express.json(),
    isAuth,
    async (req: Request, res: Response) => listReceivedDonationsController(req, res)
)

router.route("/recurring")
.all(express.json())
.get(
    isAuth,
    async (req: Request, res: Response) => listRecurringDonationsController(req, res)
)
.delete(
    isAuth, 
    async (req: Request, res: Response) => cancelRecurringDonationController(req, res)
)

export function addDonationRouter(app: Express){
    app.use("/donation", router);
}