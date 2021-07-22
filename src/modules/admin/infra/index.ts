import express, { Router, Express } from "express";
import { makeIsAuth } from "../../../shared/infra/express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { createAdminController, deleteAdminController } from "./controllers";


const isAuth = makeIsAuth({
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload
});
const router = Router();

router.route('/')
    .post(isAuth, createAdminController)
    .delete(isAuth, deleteAdminController);


export function addAdminRouter(app: Express){
    app.use('/admins', express.json(), router);
}