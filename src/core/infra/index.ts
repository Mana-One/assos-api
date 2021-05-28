import { Request, Response } from "express";


export abstract class ExpressController {
    protected abstract executeImpl(req: Request, res: Response): Promise<any>;

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.executeImpl(req, res);
        } catch(err) {
            console.error(`[ExpressController]: Uncaught controller error`);
            console.error(err);
            this.fail(res, 'An unexpected error occurred');
        }
    }
  
    public static jsonResponse(res: Response, code: number, message: string){
        return res.status(code).json({ message });
    }
  
    public ok<T>(res: Response, dto?: T) {
        if(!!dto){
            res.type('application/json');
            return res.status(200).json(dto);

        } else {
            return res.sendStatus(200);
        }
    }
  
    public created(res: Response){
        return res.sendStatus(201);
    }

    public createdWithPayload<T>(res: Response, dto: T){
        return res.status(201).json(dto);
    }
  
    public clientError(res: Response, message?: string){
        return ExpressController.jsonResponse(res, 400, message ? message : "Bad request");
    }
  
    public unauthorized(res: Response, message?: string){
        return ExpressController.jsonResponse(res, 401, message ? message : "Unauthorized");
    }

    public forbidden(res: Response, message?: string){
        return ExpressController.jsonResponse(res, 403, message ? message : "Forbidden");
    }
  
    public notFound(res: Response, message?: string){
        return ExpressController.jsonResponse(res, 404, message ? message : "Not found");
    }
  
    public conflict(res: Response, message?: string){
        return ExpressController.jsonResponse(res, 409, message ? message : 'Conflict');
    }
  
    public fail(res: Response, error: Error | string){
        console.error(error);
        return res.status(500).json({
            message: error.toString()
        });
    }
}