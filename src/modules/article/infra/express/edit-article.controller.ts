import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { Role } from "../../../../shared/domain";
import * as EditArticle from "../../usecases/EditArticle";
import { ArticleErrors } from "../../usecases/errors";


export function makeEditArticleController(
    usecase: UseCase<EditArticle.Input, Promise<EditArticle.Response>>
){
    return async function(req: Request, res: Response){
        const articleId = req.params.articleId;
        const guard = Guard.againstNullOrUndefined({
            key: 'articleId', value: articleId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const { title, content } = req.body;
        if(title === undefined && content === undefined){
            return ExpressController.clientError(res);
        }

        const result = await usecase({ articleId, title, content });
        if(result.isRight()){
            return ExpressController.ok(res);
        }

        const error = result.value;
        switch(error.constructor){
            case ArticleErrors.ArticleNotFound:
                return ExpressController.notFound(res, error.getValue().message);
            case AppErrors.UnexpectedError:
                return ExpressController.fail(res, error.getValue().message);
            default:
                return ExpressController.clientError(res, error.getValue());
        }
    }
}