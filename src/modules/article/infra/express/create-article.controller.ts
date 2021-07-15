import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as CreateArticle from "../../usecases/CreateArticle";


export function makeCreateArticleController(
    usecase: UseCase<CreateArticle.Input, Promise<CreateArticle.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER){
            return ExpressController.forbidden(res);
        }

        const associationId = req.body.account?.associationId;
        const { title, content } = req.body;
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'associationId', value: associationId },
            { key: 'title', value: title },
            { key: 'content', value: content }
        ]);
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ title, content, associationId });
        if(result.isRight()){
            return ExpressController.created(res);
        }

        const error = result.value;
        switch(error.constructor){
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}