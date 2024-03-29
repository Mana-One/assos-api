import { Request, Response, NextFunction } from "express";
import { Authentication } from "../../services";


interface Props {
    verifyAndRetrievePayload: Authentication.VerifyAndRetrievePayload
}

export function makeIsAuth(props: Props){
    const { verifyAndRetrievePayload } = props;

    return async function(req: Request, res: Response, next: NextFunction){
        const header = req.headers.authorization;
        if(header === undefined || header.indexOf("Bearer ") === -1){
            return res.sendStatus(401);
        }

        const token = header.slice(7);
        try {
            req.body.account = await verifyAndRetrievePayload(token);
        } catch(err) {
            return res.sendStatus(403);
        }

        next();
    }
}