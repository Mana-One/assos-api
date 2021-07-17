import {request, Request, Response} from "express";
import {ExpressController} from "../../../core/infra";
import {Bot, Message, MessageTypes} from "bard-builder";
import {setup_flow} from "../services/flow";

const bot = new Bot({name: "chatbot"});
setup_flow(bot);
bot.start();
pullProcess();

let messagesQueue: any[] = [];


function pullProcess(): NodeJS.Timeout | NodeJS.Immediate {
    /* get message from chatbot */
    const message = bot.pull();
    /* if it is an Error instance, re-run this with delay (probably empty) */
    if (message instanceof Error) {
        return setTimeout(() => pullProcess(), 500);
    }

    /* send message to message broker */
    console.log(message);
    messagesQueue.push(message);

    /* re-run this */
    return setImmediate(() => pullProcess());
}


export function getMessages(req: Request, res: Response){
    let message=messagesQueue[0];
    if(message !== null && message !== undefined){
        messagesQueue.shift();
        return ExpressController.ok<any>(res,message);
    }
    else{
        return ExpressController.notFound(res);
    }
}

export function sendMessage(req: Request, res: Response){
    let body = req.body;
    if(body.contact && body.session && body.origin && body.data){
        bot.push(new Message(body.contact, body.session, body.origin, body.data, MessageTypes.TEXT));
        //let response = bot.pull();
        return ExpressController.ok<any>(res);
    }
    return ExpressController.forbidden(res);

}