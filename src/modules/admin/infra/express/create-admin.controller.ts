import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as CreateAdmin from "../../usecases/CreateAdmin";
import { AdminErrors } from "../../usecases/errors";


export function makeCreateAdminController(
    usecase: UseCase<CreateAdmin.Input, Promise<CreateAdmin.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const { firstName, lastName, email, password } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'firstName', value: firstName },
            { key: 'lastName', value: lastName },
            { key: 'email', value: email },
            { key: 'password', value: password }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ firstName, lastName, email, password });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AdminErrors.AccountAlreadyExists:
                return ExpressController.conflict(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(error.getValue());
        }
    }
}