import { LoginController } from "./express";
import { Express, Request, Response, Router } from "express";
import { Login } from "../usecases/Login";
import { SequelizeUserRepo } from "./repositories/sequelize";
import { JWTAuthentication } from "../../../shared/services/JWT";

const router = Router();
const userRepo = new SequelizeUserRepo();
const authService = new JWTAuthentication();

const loginController = new LoginController(
    new Login(userRepo, authService)
);

router.post(
    "/login", 
    async (req: Request, res: Response) => loginController.execute(req, res)
)

export function addIdentityRouter(app: Express): void {
    app.use("/identity", router);
}