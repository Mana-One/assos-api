import { makeLoginController, makeChangePasswordController, makeEditUserController, makeEditSelfController, makeGetSelfController, makeGetUserController } from "./express";
import { Express, Request, Response, Router } from "express";
import { SequelizeUserRepo } from "./repositories";
import { JWTAuthentication } from "../../../shared/infra/JWT";
import { makeIsAuth } from "../../../shared/infra/express";
import { makeEditUserUseCase } from "../usecases/EditUser";
import { makeChangePasswordUseCase } from "../usecases/ChangePassword";
import { makeLoginUseCase } from "../usecases/Login";
import { makeGetUserUseCase } from "../usecases/GetUser";


const router = Router();

const isAuth = makeIsAuth({
    verifyAndRetrievePayload: JWTAuthentication.verifyAndRetrievePayload
});

const changePasswordUsecase = makeChangePasswordUseCase({
    findById: SequelizeUserRepo.findById,
    save: SequelizeUserRepo.save
});

const editUserUsecase = makeEditUserUseCase({
    findByEmail: SequelizeUserRepo.findByEmail,
    findById: SequelizeUserRepo.findById,
    save: SequelizeUserRepo.save
});

const getUserUsecase = makeGetUserUseCase({
    findById: SequelizeUserRepo.findById
});

const loginUsecase = makeLoginUseCase({
    findByEmail: SequelizeUserRepo.findByEmail,
    createToken: JWTAuthentication.createToken
})


const changePasswordController = makeChangePasswordController(changePasswordUsecase);
const editSelfController = makeEditSelfController(editUserUsecase);
const editUserController = makeEditUserController(editUserUsecase);
const getSelfController = makeGetSelfController(getUserUsecase);
const getUserController = makeGetUserController(getUserUsecase);
const loginController = makeLoginController(loginUsecase);

router.post(
    "/login", 
    async (req: Request, res: Response) => loginController(req, res)
);

router.put(
    "/password",
    isAuth,
    async(req:Request, res: Response) => changePasswordController(req, res)
);

router.route("/self")
.get(
    isAuth,
    async (req: Request, res: Response) => getSelfController(req, res)
)
.put(
    isAuth,
    async (req: Request, res: Response) => editSelfController(req, res)
);

router.route("/:userId")
.get(
    isAuth,
    async (req: Request, res: Response) => getUserController(req, res)
)
.put( 
    isAuth,
    async (req: Request, res: Response) => editUserController(req, res)
);

export function addIdentityRouter(app: Express): void {
    app.use("/identity", router);
}