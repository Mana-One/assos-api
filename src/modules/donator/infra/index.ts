import { makeAddCardController, 
    makeCreateDonatorController, 
    makeDeleteDonatorController, 
    makeRemoveCardController, 
    makeRetrieveWalletController, 
    makeRetrieveDonatorController 
} from "./express";
import { SequelizeDonatorRepo, SequelizeWalletRepo } from "./repositories";
import { Express, Request, Response, Router } from "express";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { makeIsAuth } from "../../../shared/infra/express";
import { makeAddCardUseCase } from "../usecases/AddCard";
import { makeCreateDonatorUseCase } from "../usecases/CreateDonator";
import { makeDeleteDonatorUseCase } from "../usecases/DeleteDonator";
import { makeRemoveCardUseCase } from "../usecases/RemoveCard";
import { makeRetrieveDonatorUseCase } from "../usecases/RetrieveDonator";
import { makeRetrieveWalletUseCase } from "../usecases/RetrieveWallet";
import { StripeStoreService } from "./stripe";


const router = Router();

const isAuth = makeIsAuth({ 
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload 
});
const addCardUsecase = makeAddCardUseCase({
    findById: SequelizeDonatorRepo.findById,
    save: SequelizeDonatorRepo.save
});
const createDonatorUsecase = makeCreateDonatorUseCase({
    isEmailUsed: SequelizeDonatorRepo.isEmailUsed,
    register: StripeStoreService.register,
    save: SequelizeDonatorRepo.save
});
const deleteDonatorUseCase = makeDeleteDonatorUseCase({
    findById: SequelizeDonatorRepo.findById,
    remove: SequelizeDonatorRepo.remove
});
const removeCardUsecase = makeRemoveCardUseCase({
    findById: SequelizeDonatorRepo.findById,
    findCardById: SequelizeWalletRepo.findCardById,
    save: SequelizeDonatorRepo.save
});
const retrieveDonatorUsecase = makeRetrieveDonatorUseCase({
    findById: SequelizeDonatorRepo.findById
});
const retrieveWalletUsecase = makeRetrieveWalletUseCase({
    retrieveByDonatorId: SequelizeWalletRepo.retrieveByDonatorId
});

const addCardController = makeAddCardController(addCardUsecase);
const createDonatorController = makeCreateDonatorController(createDonatorUsecase);
const deleteDonatorController = makeDeleteDonatorController(deleteDonatorUseCase);
const removeCardController = makeRemoveCardController(removeCardUsecase);
const retrieveDonatorController = makeRetrieveDonatorController(retrieveDonatorUsecase);
const retrieveWalletController = makeRetrieveWalletController(retrieveWalletUsecase);

router.route("/")
    .post(async (req: Request, res: Response) => createDonatorController)
    .get(isAuth, async (req: Request, res: Response) => retrieveDonatorController)
.delete(isAuth, async (req: Request, res: Response) => deleteDonatorController);

router.route("/wallet")
    .post(isAuth, async (req: Request, res: Response) => addCardController)
    .get(isAuth, async (req: Request, res: Response) => retrieveWalletController);

router.delete(
    "/wallet/:cardId",
    isAuth,
    async (req: Request, res: Response) => removeCardController
);

export function addDonatorRouter(app: Express){
    app.use("/donator", router);
}