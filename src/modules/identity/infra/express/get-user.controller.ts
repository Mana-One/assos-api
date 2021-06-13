import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { Role } from "../../../../shared/domain";
import { UserDto } from "../../mappers";
import { IdentityErrors } from "../../usecases/errors";
import * as GetUser from "../../usecases/GetUser";


export function makeGetUserController(
    getUserUsecase: UseCase<GetUser.Input, Promise<GetUser.Response>>
){
    return async function(req: Request, res: Response){
        const { role: requesterRole } = req.body.account;
        if(requesterRole !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const { userId } = req.params;
        if(userId == null){
            return ExpressController.clientError(res);
        }

        const result = await getUserUsecase({ userId });
        if(result.isRight()){
            return ExpressController.ok<UserDto>(res, result.value.getValue());
        }

        const error = result.value;
        switch(error.constructor){
            case IdentityErrors.UserNotFound:
                return ExpressController.notFound(res);
            default:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}