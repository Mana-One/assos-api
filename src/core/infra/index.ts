import { Response } from "express";


export namespace ExpressController {  
    function jsonResponse(res: Response, code: number, message: string){
        return res.status(code).json({ message });
    }
  
    export function ok<T>(res: Response, dto?: T) {
        if(!!dto){
            res.type('application/json');
            return res.status(200).json(dto);

        } else {
            return res.sendStatus(200);
        }
    }
  
    export function created<T>(res: Response, dto?: T){
        if(!!dto){
            return res.status(201).json(dto);
        }
        return res.sendStatus(201);
    }

    export function noContent(res: Response){
        return res.sendStatus(204);
    }
  
    export function clientError(res: Response, message?: string){
        return jsonResponse(res, 400, message ? message : "Bad request");
    }
  
    export function unauthorized(res: Response, message?: string){
        return jsonResponse(res, 401, message ? message : "Unauthorized");
    }

    export function forbidden(res: Response, message?: string){
        return jsonResponse(res, 403, message ? message : "Forbidden");
    }
  
    export function notFound(res: Response, message?: string){
        return jsonResponse(res, 404, message ? message : "Not found");
    }
  
    export function conflict(res: Response, message?: string){
        return jsonResponse(res, 409, message ? message : 'Conflict');
    }
  
    export function fail(res: Response, error: Error | string){
        return res.status(500).json({
            message: error.toString()
        });
    }
}