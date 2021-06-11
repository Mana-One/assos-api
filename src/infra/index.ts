import express, { Request, Response } from "express";
import { AppConfig } from "../config";
import { addIdentityRouter } from "../modules/identity/infra";
import { sequelize } from "./sequelize";
import cors from "cors";
import { addDonatorRouter } from "../modules/donator/infra";


async function run(){
    const app = express();
    app.use(express.json());
    app.use(cors({ origin: true }));

    addIdentityRouter(app);
    addDonatorRouter(app);
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