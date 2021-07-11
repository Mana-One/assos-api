import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as GetAssociation from "../../usecases/GetAssociation";
import { AssociationErrors } from "../../usecases/errors";
import { AssociationDto } from "../../mappers";


export function makeGetAssociationController(
    usecase: UseCase<GetAssociation.Input, Promise<GetAssociation.Response>>
){
    return async function(req: Request, res: Response){
        const associationId = req.params.associationId;
        const guard = Guard.againstNullOrUndefined({
            key: 'associationId', value: associationId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ associationId });
        if(result.isRight()){
            return ExpressController.ok<AssociationDto>(res, result.value.getValue());
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