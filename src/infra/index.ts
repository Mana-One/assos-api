import express, {Request, Response} from "express";
import {AppConfig} from "../config";
import {addIdentityRouter} from "../modules/identity/infra";
import {sequelize} from "./sequelize";
import cors from "cors";
import {addDonatorRouter} from "../modules/donator/infra";
import {addDonationRouter} from "../modules/donation/infra";
import * as http from "http";
import {Server} from "socket.io";
import {handleEvents} from "./socket";


async function run() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {origin: true}
    });
    app.use(cors({origin: true}));
    handleEvents(io);

    addIdentityRouter(app);
    addDonatorRouter(app);
    addDonationRouter(app);
    app.use("/", (req: Request, res: Response) => {
        return res.status(404).send("No endpoint");
    });

    await sequelize.sync();
    const port = AppConfig.PORT;
    server.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

run().catch(err => console.error(err));
