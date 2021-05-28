import { LoginController } from "./express";
import { Express, Request, Response, Router } from "express";
import { Login } from "../usecases/Login";
import { SequelizeUserRepo } from "./repositories/sequelize";
import { JWTAuthentication } from "../../../shared/services/JWT";
import { makeIsAuth } from "../../../shared/infra/express";
import { ChangePassword } from "../usecases/ChangePassword";
import { ChangePasswordController } from "./express/change-password.controller";

const router = Router();
const userRepo = new SequelizeUserRepo();
const authService = new JWTAuthentication();

const isAuth = makeIsAuth(authService);

const changePasswordController = new ChangePasswordController(
    new ChangePassword(userRepo)
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

export function addIdentityRouter(app: Express): void {
    app.use("/identity", router);
}