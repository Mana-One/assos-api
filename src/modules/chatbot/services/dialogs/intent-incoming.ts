const questions_list = {
    "whoareyou?": "I am a just a chatbot, I'm here to help you out!",
    "whatisachatbot?": "Chatbot is a applicati0n th47 coNDuc7 4 c0nv3rS47i0 i7h   um4n",
    "what is your purpose?": "Not to pass butter, sadly."
};

/* export a function that returns the dialog (array of functions) */
export function intentIncoming(deps:any) {
    return [
        (session:any, course:any) => {
            /* get the user input */
            const user_input = session.getMessage().data;
            if (!(user_input && user_input.length)) {
                return course.next();
            }

            /* check if user input is a valid question, if so save it in session and redirect it to the faq dialog */
            // @ts-ignore
            const answer = questions_list[user_input.toLowerCase().replace(/\s/g, "")];
            if (answer) {
                session.storage.set("answer", answer);
                return course.replace("faq");
            }

            /* ensure interation to keep going through and reach the trailing layer */
            return course.next();
        }
    ];
}