export function byeTrailing(deps: {}) {
    return [
        (session:any, course:any) => {
            session.send("Goodbye! I hope I've been helpful!");
            return session.end()
        }
    ];
}