export function faqTrailing(deps: any) {
    return [
        (session: any, course: any) => {

            const have_answer = session.storage.get("answer");
            if (have_answer) return course.next();


            if (session.storage.get("answer_max_tries") > 0) {
                session.send("Do you have another question?");
            } else {
                session.send("Ask me a question, I'll do my best.");
            }

            const response = session.getMessage().data;
            return course.wait();
        },
        (session: any, course: any) => {
            const have_answer = session.storage.get("answer");
            if (!have_answer) {
                let max_tries = session.storage.get("answer_max_tries") || 0;
                if (max_tries >= 2) {
                    session.send("I can't help you if I can't understand you.");
                    session.storage.set("answer_max_tries", 0);
                    return course.replace("bye");
                }
                session.send("Sorry, I don't have an answer to that.");
                session.storage.set("answer_max_tries", ++max_tries);
                return course.replace("faq");
            }

            session.storage.set("answer_max_tries", 0);

            session.send(have_answer);
            session.storage.set("answer", null);

            return course.next();
        },
        (session: any, course: any) => {
            session.send("Want to ask another question?");
            return course.wait();
        },
        (session: any, course: any) => {
            const response = session.getMessage().data;
            if (response != "yes" && response != "y") {
                session.send("Alright!");
                return course.replace("bye");
            }
            return course.replace("faq");
        }
    ];
}