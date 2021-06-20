import express, { Router, Request, Response, Express } from "express";
import { paymentHooksController } from "./express";


const router = Router();

router.post(
    "/hooks", 
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => paymentHooksController(req, res) 
);

export function addDonationRouter(app: Express){
    app.use("/donation", router);
}