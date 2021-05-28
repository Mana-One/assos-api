import { LoginController, ChangePasswordController, EditUserController, EditSelfController } from "./express";
import { Express, Request, Response, Router } from "express";
import { Login } from "../usecases/Login";
import { SequelizeUserRepo } from "./repositories/sequelize";
import { JWTAuthentication } from "../../../shared/services/JWT";
import { makeIsAuth } from "../../../shared/infra/express";
import { ChangePassword } from "../usecases/ChangePassword";
import { EditUser } from "../usecases/EditUser";

const router = Router();
const userRepo = new SequelizeUserRepo();
const authService = new JWTAuthentication();

const isAuth = makeIsAuth(authService);

const editUserUsecase = new EditUser(userRepo);
const changePasswordController = new ChangePasswordController(
    new ChangePassword(userRepo)
);
const editSelfController = new EditSelfController(
    editUserUsecase
);
const editUserController = new EditUserController(
    editUserUsecase
);
const loginController = new LoginController(
    new Login(userRepo, authService)
);

router.post(
    "/login", 
    async (req: Request, res: Response) => loginController.execute(req, res)
);

router.put(
    "/password",
    isAuth,
    async(req:Request, res: Response) => changePasswordController.execute(req, res)
);

router.put(
    "/self", 
    isAuth,
    async (req: Request, res: Response) => editSelfController.execute(req, res)
);

router.put(
    "/:userId", 
    isAuth,
    async (req: Request, res: Response) => editUserController.execute(req, res)
);

export function addIdentityRouter(app: Express): void {
    app.use("/identity", router);
}