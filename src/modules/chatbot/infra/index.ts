import express, {Express, Request, Response, Router} from "express";
import {getMessages, sendMessage} from "./messageFlow";


const router = Router();


router.route("/")
    .get(
        async (req: Request, res: Response) => getMessages(req, res)
    )
    .post(
        async (req: Request, res: Response) => sendMessage(req, res)
    )


export function addChatBotRouter(app: Express): void {
    app.use("/chatbot", express.json(), router);
}