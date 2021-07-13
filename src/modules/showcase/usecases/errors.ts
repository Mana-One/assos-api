import { Result, UseCaseError } from "../../../core/logic";

export namespace ShowcaseErrors {
    export class ShowcaseNotFound extends Result<UseCaseError> {
        constructor(){
            super(false, {
                message: 'Showcase not found'
            });
        }
    }
}