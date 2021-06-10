import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import * as DeleteDonator from "../../usecases/DeleteDonator";
import { DonatorErrors } from "../../usecases/errors";


export function makeDeleteDonatorController(
    deletedonatorUsecase: UseCase<DeleteDonator.Input, Promise<DeleteDonator.Response>>
){
    return async function(req: Request, res: Response){
        const { donatorId } = req.body;
        const guard = Guard.againstNullOrUndefined({ 
            key: "donatorId", value: donatorId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await deletedonatorUsecase({ donatorId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case DonatorErrors.DonatorNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}