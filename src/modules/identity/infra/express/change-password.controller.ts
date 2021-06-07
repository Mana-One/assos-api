import { Request, Response } from "express";
import { ExpressController } from "../../../../core/infra";
import { AppErrors } from "../../../../core/logic";
import { IdentityErrors } from "../../usecases/errors";
import * as ChangePassword from "../../usecases/ChangePassword";
import { UseCase } from "../../../../core/domain";


export function makeChangePasswordController(
    changePasswordUsecase: UseCase<ChangePassword.Input, Promise<ChangePassword.Response>> 
){
    return async function(req: Request, res: Response){
        const { newPassword, checkPassword, oldPassword } = req.body;
        if(newPassword === undefined ||
            checkPassword === undefined ||
            oldPassword === undefined){
            return ExpressController.clientError(res);
        }

        const result = await changePasswordUsecase({
            userId: req.body.account.id,
            newPassword,
            checkPassword,
            oldPassword
        });

        if(result.isRight()){
            return ExpressController.ok(res);
        }

        if(result.isLeft()){
            const error = result.value;
            switch(error.constructor){
                case AppErrors.UnexpectedError:
                    return ExpressController.fail(res, error.getValue().message);
                case IdentityErrors.NewAndCheckPasswordNotMatching:
                    return ExpressController.clientError(res, error.getValue().message);
                case IdentityErrors.UserNotFound:
                    return ExpressController.notFound(res, error.getValue().message);
                default:
                    return ExpressController.clientError(res);
            }
        }
    }
}
