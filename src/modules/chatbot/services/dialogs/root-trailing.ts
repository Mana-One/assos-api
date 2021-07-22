export function rootTrailing(deps: any) {
    return [
        (session: any, course: any) => {

            const known_user = session.storage.get("known");

            let greeting_message = "Hello! I am Asso's Chatbot!";

            if(known_user){
                greeting_message = "Hello! Again!";
            }

            session.send(greeting_message);
            session.storage.set("known", true);

            return course.replace("faq");
        }
    ];
}