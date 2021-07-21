import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as DeleteAdmin from "../../usecases/DeleteAdmin";
import { AdminErrors } from "../../usecases/errors";


export function makeDeleteAdminController(
    usecase: UseCase<DeleteAdmin.Input, Promise<DeleteAdmin.Response>>
){
    return async function(req: Request, res: Response){
        const adminId = req.body.account?.id;
        const guard = Guard.againstNullOrUndefined({
            key: 'adminId', value: adminId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ adminId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AdminErrors.AdminNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}