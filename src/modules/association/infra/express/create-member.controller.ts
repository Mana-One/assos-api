import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { isMemberRole } from "../../../../shared/domain";
import * as CreateMember from "../../usecases/CreateMember";
import { AssociationErrors } from "../../usecases/errors";


export function makeMemberController(
    usecase: UseCase<CreateMember.Input, Promise<CreateMember.Response>>
){
    return async function(req: Request, res: Response){
        const associationId = req.params.associationId;
        const { firstName, lastName, email, password, role } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'associationId', value: associationId },
            { key: 'firstName', value: firstName },
            { key: 'lastName', value: lastName },
            { key: 'email', value: email },
            { key: 'password', value: password }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }
        if(!isMemberRole(role)){
            return ExpressController.clientError(res, 'Invalid role');
        }

        const result = await usecase({
            associationId, firstName, lastName, email, password, role
        });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AssociationErrors.AssociationNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AssociationErrors.AccountAlreadyExists:
                return ExpressController.conflict(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}