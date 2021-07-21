import { Request, Response } from "express";
import { ExpressController } from "../../../../core/infra";
import { AppErrors } from "../../../../core/logic";
import { IdentityErrors } from "../../usecases/errors";
import * as EditUser from "../../usecases/EditUser";
import { Role } from "../../../../shared/domain";
import { UseCase } from "../../../../core/domain";


export function makeEditUserController(
    editUserUsecase: UseCase<EditUser.Input, Promise<EditUser.Response>>
){

    return async function(req: Request, res: Response){
        const { firstName, lastName, email } = req.body;
        const userId = req.params.userId;
        if(userId === undefined){
            return ExpressController.clientError(res);
        }

        if(req.body.account.role !== Role.ADMIN &&
            req.body.account.id !== userId){
            return ExpressController.forbidden(res);
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
