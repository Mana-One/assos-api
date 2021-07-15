import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as RemoveArticle from "../../usecases/RemoveArticle";
import { ArticleErrors } from "../../usecases/errors";


export function makeRemoveArticleController(
    usecase: UseCase<RemoveArticle.Input, Promise<RemoveArticle.Response>>
){
    return async function(req: Request, res: Response){
        if(req.body.account?.role !== Role.MANAGER){
            return ExpressController.forbidden(res);
        }

        const articleId = req.params.articleId;
        const guard = Guard.againstNullOrUndefined({
            key: 'articleId', value: articleId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ articleId });
        if(result.isRight()){
            return ExpressController.noContent(res);
        }

        const error = result.value;
        switch(error.constructor){
            case ArticleErrors.ArticleNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
        }
    }
}