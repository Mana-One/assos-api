import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as EditPresentation from "../../usecases/EditPresentation";
import { AssociationErrors } from "../../usecases/errors";


export function makeEditPresentationController(
    usecase: UseCase<EditPresentation.Input, Promise<EditPresentation.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER && 
            req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const associationId = req.params.associationId;
        const { presentation } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'associationId', value: associationId },
            { key: 'presentation', value: presentation }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        if(req.body.account?.role === Role.MANAGER && 
            req.body.account?.associationId !== associationId){
            return ExpressController.forbidden(res);
        }

        const result = await usecase({ associationId, presentation });
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
                return ExpressController.clientError(res, error.getValue());
        }
    }
}