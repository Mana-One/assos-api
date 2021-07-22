import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { ShowcaseDto } from "../../domain";
import { ShowcaseErrors } from "../../usecases/errors";
import * as GetShowcase from "../../usecases/GetShowcase";


export function makeGetShowcaseController(
    usecase: UseCase<GetShowcase.Input, Promise<GetShowcase.Response>>
){
    return async function(req: Request, res: Response){
        const showcaseId = req.params.showcaseId;
        const guard = Guard.againstNullOrUndefined({
            key: 'showcaseId', value: showcaseId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ showcaseId });
        if(result.isRight()){
            const dto = result.value.getValue();
            return ExpressController.ok<ShowcaseDto>(res, dto);
        }

        const error = result.value;
        switch(error.constructor){
            case ShowcaseErrors.ShowcaseNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}