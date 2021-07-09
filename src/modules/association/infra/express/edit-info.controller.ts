import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as EditInfo from "../../usecases/EditInfo";
import { AssociationErrors } from "../../usecases/errors";


export function makeEditInfoController(
    usecase: UseCase<EditInfo.Input, Promise<EditInfo.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER && 
            req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const { associationId } = req.params;
        const guard = Guard.againstNullOrUndefined({
            key: 'associationId', value: associationId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const { name, email, bannerUrl } = req.body;
        if(name === undefined && 
            email === undefined && 
            bannerUrl === undefined){
            return ExpressController.clientError(res);
        }

        const result = await usecase({ associationId, name, email, bannerUrl });
        if(result.isRight()){
            return ExpressController.ok(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AssociationErrors.AssociationNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(error.getValue());
        }
    }
}