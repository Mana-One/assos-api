import { Result, UseCaseError } from "../../../core/logic";

export namespace ArticleErrors {
    export class ArticleNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: 'Article not found'
            });
        }
    }
}