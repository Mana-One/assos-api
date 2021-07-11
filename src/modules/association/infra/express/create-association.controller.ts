import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as CreateAssociation from "../../usecases/CreateAssociation";
import { AssociationErrors } from "../../usecases/errors";


export function makeCreateAssociationController(
    usecase: UseCase<CreateAssociation.Input, Promise<CreateAssociation.Response>>
){
    return async function(req: Request, res: Response){
        const { name, email, bannerUrl, presentation, manager } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'name', value: name },
            { key: 'email', value: email },
            { key: 'bannerUrl', value: bannerUrl },
            { key: 'presentation', value: presentation },
            { key: 'manager', value: manager },
            { key: 'manager firstname', value: manager.firstName },
            { key: 'manager lastname', value: manager.lastName },
            { key: 'manager email', value: manager.email },
            { key: 'manager password', value: manager.password }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({
            name, email, bannerUrl, presentation, manager
        });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AssociationErrors.AccountAlreadyExists:
                return ExpressController.conflict(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}