import { 
    makeCreateDonatorController, 
    makeDeleteDonatorController
} from "./express";
import { SequelizeDonatorWriteRepo } from "./repositories";
import express, { Express, Request, Response, Router } from "express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { makeIsAuth } from "../../../shared/infra/express";
import { makeCreateDonatorUseCase } from "../usecases/CreateDonator";
import { makeDeleteDonatorUseCase } from "../usecases/DeleteDonator";
import { StripeStoreService } from "./stripe";


const router = Router();

const isAuth = makeIsAuth({ 
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload 
});
const createDonatorUsecase = makeCreateDonatorUseCase({
    isEmailUsed: SequelizeDonatorWriteRepo.isEmailUsed,
    register: StripeStoreService.register,
    save: SequelizeDonatorWriteRepo.save
});
const deleteDonatorUseCase = makeDeleteDonatorUseCase({
    findById: SequelizeDonatorWriteRepo.findById,
    remove: SequelizeDonatorWriteRepo.remove
});

const createDonatorController = makeCreateDonatorController(createDonatorUsecase);
const deleteDonatorController = makeDeleteDonatorController(deleteDonatorUseCase);

router.route("/")
    .post(async (req: Request, res: Response) => createDonatorController(req, res))
    .delete(isAuth, async (req: Request, res: Response) => deleteDonatorController(req, res));

export function addDonatorRouter(app: Express){
    app.use("/donator", express.json(), router);
}