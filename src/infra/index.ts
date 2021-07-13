import express, { Request, Response } from "express";
import { AppConfig } from "../config";
import { addIdentityRouter } from "../modules/identity/infra";
import { sequelize } from "./sequelize";
import cors from "cors";
import { addDonatorRouter } from "../modules/donator/infra";
import { addDonationRouter } from "../modules/donation/infra";
import { addAssociationRouter } from "../modules/association/infra";
import { addShowcaseRouter } from "../modules/showcase/infra/express";


async function run(){
    const app = express();
    app.use(cors({ origin: true }));

    addIdentityRouter(app);
    addDonatorRouter(app);
    addDonationRouter(app);
    addAssociationRouter(app);
    addShowcaseRouter(app);
    
    app.use("/", (req: Request, res: Response) => {
        return res.status(404).send("No endpoint");
    });

    await sequelize.sync();
    const port = AppConfig.PORT;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

run().catch(err => console.error(err));