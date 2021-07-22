import express, { Request, Response } from "express";
import { AppConfig } from "../config";
import { addIdentityRouter } from "../modules/identity/infra";
import { sequelize } from "./sequelize";
import cors from "cors";
import { addDonatorRouter } from "../modules/donator/infra";
import { addDonationRouter } from "../modules/donation/infra";
import { addChatBotRouter } from "../modules/chatbot/infra";
import { addAssociationRouter } from "../modules/association/infra";
import { addShowcaseRouter } from "../modules/showcase/infra/express";
import { addArticleRouter } from "../modules/article/infra";
import { addSocket } from "../modules/message/infra";
import { createServer } from "http";
import { addAdminRouter } from "../modules/admin/infra";


async function run(){
    const app = express();
    const httpServer = createServer(app);
    app.use(cors({ origin: true }));

    addIdentityRouter(app);
    addDonatorRouter(app);
    addDonationRouter(app);
    addChatBotRouter(app);
    addAssociationRouter(app);
    addShowcaseRouter(app);
    addArticleRouter(app);
    addSocket(httpServer);
    addAdminRouter(app);
    
    app.use("/", (req: Request, res: Response) => {
        return res.status(404).send("No endpoint");
    });

    await sequelize.sync();
    const port = AppConfig.PORT;
    httpServer.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

run().catch(err => console.error(err));