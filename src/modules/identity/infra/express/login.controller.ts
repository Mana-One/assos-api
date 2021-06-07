import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors } from "../../../../core/logic";
import { AccessToken } from "../../../../shared/domain";
import { IdentityErrors } from "../../usecases/errors";
import * as Login from "../../usecases/Login";


export function makeLoginController(
    loginUsecase: UseCase<Login.Input, Promise<Login.Response>>
){

    return async function(req: Request, res: Response){
        const { email, password } = req.body;
        if(email === undefined || password === undefined){
            return ExpressController.clientError(res);
        }

        let result = await loginUsecase({
            email, password
        });

        if(result.isRight()){
            const token = result.value.getValue();
            return ExpressController.created<{token: AccessToken}>(res, { token });
        }

        if(result.isLeft()){
            const error = result.value;
            switch(error.constructor){
                case AppErrors.UnexpectedError:
                    return ExpressController.fail(res, error.getValue().message);
                case IdentityErrors.UserNotFound:
                    return ExpressController.notFound(res, error.getValue().message);
                default:
                    return ExpressController.clientError(res, error.getValue());
            }
        }
    }
}