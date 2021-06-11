import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as CreateDonator from "../../usecases/CreateDonator";
import { DonatorErrors } from "../../usecases/errors";


export function makeCreateDonatorController(
    createDonatorUsecase: UseCase<CreateDonator.Input, Promise<CreateDonator.Response>>
){
    return async function(req: Request, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: "firstName", value: firstName },
            { key: "lastName", value: lastName },
            { key: "email", value: email },
            { key: "password", value: password }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message)
        }

        const result = await createDonatorUsecase({ firstName, lastName, email, password });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonatorErrors.AccountAlreadyExists:
                return ExpressController.conflict(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}