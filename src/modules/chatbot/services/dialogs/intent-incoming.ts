const questions_list = {
    "whoareyou?": "I am a just a chatbot, I'm here to help you out!",
    "whatisachatbot?": "Chatbot is a application that conduct conversation with humans",
    "help": "You can ask questions like \"what is assos?\" or \"who are you?\"",
    "whatisassos?": "Asso's is a platform which aims to help associations finance their projects",
    "howareyou?": "I'm fine thank you!",
    "whatisyourname?": "Unfortunately I don't have a name, you can call me chatbot!"
};


export function intentIncoming(deps: any) {
    return [
        (session: any, course: any) => {

            const user_input = session.getMessage().data;
            if (!(user_input && user_input.length)) {
                return course.next();
            }

            // @ts-ignore
            const answer = questions_list[user_input.toLowerCase().replace(/\s/g, "")];
            if (answer) {
                session.storage.set("answer", answer);
                return course.replace("faq");
            }

            return course.next();
        }
    ];
}