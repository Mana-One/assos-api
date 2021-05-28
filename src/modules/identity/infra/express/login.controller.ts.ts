import { Request, Response } from "express";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Result } from "../../../../core/logic";
import { AccessToken } from "../../../../shared/domain";
import { IdentityErrors } from "../../usecases/errors";
import { Login } from "../../usecases/Login";

export class LoginController extends ExpressController {
    constructor(private usecase: Login){
        super();
    }

    protected async executeImpl(req: Request, res: Response){
        const { email, password } = req.body;
        if(email === undefined || password === undefined){
            return this.clientError(res);
        }

        const result = await this.usecase.execute({
            email, password
        });
        if(result.isLeft()){
            const error = result.value;
            switch(error.constructor){
                case AppErrors.UnexpectedError:
                    return this.fail(res, error.getValue().message);
                case IdentityErrors.UserNotFound:
                    return this.notFound(res, error.getValue().message);
                default:
                    return this.clientError(res, error.getValue());
            }
        }

        const token = (<Result<AccessToken>>result).getValue();
        return this.createdWithPayload(res, { token });
    }
}