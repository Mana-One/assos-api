import { Request, Response } from "express";
import { ExpressController } from "../../../../core/infra";
import { AppErrors } from "../../../../core/logic";
import { IdentityErrors } from "../../usecases/errors";
import { EditUser } from "../../usecases/EditUser";


export class EditSelfController extends ExpressController {
    constructor(private usecase: EditUser){
        super();
    }

    async executeImpl(req: Request, res: Response){
        const { firstName, lastName, email } = req.body;
        const userId = req.body.account.id;
        if(userId === undefined){
            return this.unauthorized(res);
        }

        if(firstName === undefined &&
            lastName === undefined &&
            email === undefined){
            return this.clientError(res);
        }

        const result = await this.usecase.execute({
            userId,
            firstName,
            lastName,
            email
        }); 

        if(result.isRight()){
            return this.ok(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AppErrors.UnexpectedError:
                return this.fail(res, error.getValue().message);
            case IdentityErrors.UserNotFound:
                return this.notFound(res);
            default:
                return this.clientError(res);
        }
    }
}