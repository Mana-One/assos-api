import {rootTrailing} from "./dialogs/root-trailing";
import {faqTrailing} from "./dialogs/faq-trailing";
import {byeTrailing} from "./dialogs/bye-trailing";
import {intentIncoming} from "./dialogs/intent-incoming";

/*
    export a function that receives the chatbot as a parameter, then link the dialogs to it
*/
// @ts-ignore
export function setup_flow(bot) {
    const deps = {};

    /* link dialogs into our chatbot */
    bot.trailing("root", rootTrailing(deps));
    bot.trailing("faq", faqTrailing(deps));
    bot.trailing("bye", byeTrailing(deps));
    bot.incoming("intent", intentIncoming(deps));
}
