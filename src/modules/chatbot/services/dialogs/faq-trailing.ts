/* export a function that returns the dialog (array of functions) */
export function faqTrailing(deps:any) {
    return [
        (session:any, course:any) => {
            /* if have an answer, jump to the next step */
            const have_answer = session.storage.get("answer");
            if (have_answer) return course.next();


            if(session.storage.get("answer_max_tries")>0){
                session.send("Do you have another question ?");
            }else{
                session.send("Can I help you?");
            }

            const response = session.getMessage().data;
            if (response === "no" || response === "n") {
                session.send("Alright!");
                return course.replace("bye");
            }
            return course.wait();
        },
        (session:any, course:any) => {
            const have_answer = session.storage.get("answer");
            if (!have_answer) {
                /* if retries reaches more than 2 times, say bye and end the session */
                let max_tries = session.storage.get("answer_max_tries") || 0;
                if (max_tries >= 2) {
                    session.send("I can't help you if I can't understand you.");
                    /* reset tries counter */
                    session.storage.set("answer_max_tries", 0);
                    return course.replace("bye");
                }
                session.send("Sorry, I don't have an answer to that.");
                session.storage.set("answer_max_tries", ++max_tries);
                return course.replace("faq");
            }

            /* reset tries counter */
            session.storage.set("answer_max_tries", 0);

            /* send answer and set its session value to null */
            session.send(have_answer);
            session.storage.set("answer", null);

            return course.next();
        },
        (session:any, course:any) => {
            /* ask if want to ask another question */
            session.send("Want to ask another question?");
            return course.wait();
        },
        (session:any, course:any) => {
            /* if response is yes, redirect to the faq dialog again, if not say bye */
            const response = session.getMessage().data;
            if (response != "yes" && response != "y") {
                session.send("Alright!");
                return course.replace("bye");
            }
            return course.replace("faq");
        }
    ];
}