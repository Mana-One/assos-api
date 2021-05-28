import express, { Request, Response } from "express";
import { AppConfig } from "../config";
import { addIdentityRouter } from "../modules/identity/infra";
import { sequelize } from "./sequelize";


async function run(){
    const app = express();
    app.use(express.json());

    addIdentityRouter(app);
    app.use("/", (req: Request, res: Response) => {
        return res.sendStatus(400);
    });

    await sequelize.sync();
    const port = AppConfig.PORT;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

run().catch(err => console.error(err));