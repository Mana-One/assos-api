import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppErrors {
    export class UnexpectedError extends Result<UseCaseError> {
        constructor(readonly err: any){
            super(false, {
                message: "An unexpected error occurred"
            });
        }
    }
}