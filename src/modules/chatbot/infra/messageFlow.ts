import {request, Request, Response} from "express";
import {ExpressController} from "../../../core/infra";
import {Bot, Message, MessageTypes} from "bard-builder";
import {setup_flow} from "../services/flow";
import {ChatBotMessage} from "../model/chatbot-message.model";

const bot = new Bot({name: "chatbot"});
setup_flow(bot);
bot.start();
pullProcess();

let messagesQueue: ChatBotMessage[] = [];


function pullProcess(): NodeJS.Timeout | NodeJS.Immediate {

    const message = bot.pull();

    if (message instanceof Error) {
        return setTimeout(() => pullProcess(), 500);
    }

    messagesQueue.push(message);
    return setImmediate(() => pullProcess());
}


export function getMessages(req: Request, res: Response) {
    let message = messagesQueue[0];
    if (message !== null && message !== undefined) {
        messagesQueue.shift();
        return ExpressController.ok<any>(res, message);
    } else {
        return ExpressController.noContent(res);
    }
}

export function sendMessage(req: Request, res: Response) {
    let body = req.body;
    if (body.contact && body.session && body.origin && body.data) {
        bot.push(new Message(body.contact, body.session, body.origin, body.data, MessageTypes.TEXT));
        return ExpressController.ok<any>(res);
    }
    return ExpressController.forbidden(res);

}