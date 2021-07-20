import express, { Express, Request, Response, Router } from "express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { makeIsAuth } from "../../../shared/infra/express";
import { 
    createDonatorController, 
    deleteDonatorByAdminController, 
    deleteDonatorController, 
    listDonatorsController 
} from "./controllers";


const router = Router();

const isAuth = makeIsAuth({ 
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload 
});

router.route("/")
    .post(createDonatorController)
    .get(isAuth, listDonatorsController)
    .delete(isAuth, deleteDonatorController);

router.delete(
    "/:donatorId", 
    isAuth, 
    deleteDonatorByAdminController
);

export function addDonatorRouter(app: Express){
    app.use("/donator", express.json(), router);
}