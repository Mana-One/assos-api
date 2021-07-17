import {Bot, Message, MessageTypes} from "bard-builder";
import {setup_flow} from "./flow"



export namespace BotService {

     let messagesQueue: any[] = [];


    export function initializeBot() {
        /* declare the chatbot instance */
        const bot = new Bot({name: "chatBot"});
        setup_flow(bot);
        bot.start();
        return bot;
    }

}
