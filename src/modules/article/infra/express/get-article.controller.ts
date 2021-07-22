import { Request, Response } from "express";
import { UseCase } from "../../../../core/domain";
import { ExpressController } from "../../../../core/infra";
import { AppErrors, Guard } from "../../../../core/logic";
import { ArticleDto } from "../../domain";
import { ArticleErrors } from "../../usecases/errors";
import * as GetArticle from "../../usecases/GetArticle";


export function makeGetArticleController(
    usecase: UseCase<GetArticle.Input, Promise<GetArticle.Response>>
){
    return async function(req: Request, res: Response){
        const articleId = req.params.articleId;
        const guard = Guard.againstNullOrUndefined({
            key: 'articleId', value: articleId
        });
        if(!guard.success){
            return ExpressController.clientError(res, guard.message);
        }

        const result = await usecase({ articleId });
        if(result.isRight()){
            return ExpressController.ok<ArticleDto>(res, result.value.getValue());
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