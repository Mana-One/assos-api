import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as DeleteAssociation from "../../usecases/DeleteAssociation";
import { AssociationErrors } from "../../usecases/errors";


export function makeDeleteAssociationController(
    usecase: UseCase<DeleteAssociation.Input, Promise<DeleteAssociation.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER && req.body.account?.role !== Role.ADMIN){
            return ExpressController.forbidden(res);
        }

        const associationId = req.params.associationId;
        const guard = Guard.againstNullOrUndefined(
            { key: 'associationId', value: associationId }
        );
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        if(req.body.account?.role === Role.MANAGER && 
            req.body.account?.associationId !== associationId){
            return ExpressController.forbidden(res);
        }

        const result = await usecase({ associationId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AssociationErrors.AssociationNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}