import { Request, Response } from "express";
import { ExpressController } from "../../../../core/infra";
import { AppErrors } from "../../../../core/logic";
import { IdentityErrors } from "../../usecases/errors";
import * as EditUser from "../../usecases/EditUser";
import { UseCase } from "../../../../core/domain";


export function makeEditSelfController(
    editUserUsecase: UseCase<EditUser.Input, Promise<EditUser.Response>>
){
    return async function(req: Request, res: Response){
        const { firstName, lastName, email } = req.body;
        const userId = req.body.account.id;
        if(userId === undefined){
            return ExpressController.unauthorized(res);
        }

        if(firstName === undefined &&
            lastName === undefined &&
            email === undefined){
            return ExpressController.clientError(res);
        }

        const result = await editUserUsecase({
            userId,
            firstName,
            lastName,
            email
        }); 

        if(result.isRight()){
            return ExpressController.ok(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            case IdentityErrors.UserNotFound:
                return ExpressController.notFound(res);
            default:
                return ExpressController.clientError(res);
        }
    }
}