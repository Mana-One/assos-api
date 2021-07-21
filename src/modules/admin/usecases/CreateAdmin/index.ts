import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Admin } from "../../domain";
import { AdminWriteRepo } from "../../repositories";
import { AdminErrors } from "../errors";

export interface Input {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AdminErrors.AccountAlreadyExists |
    Result<any>,

    Result<void>
>;

interface Dependencies {
    exists: AdminWriteRepo.Exists,
    save: AdminWriteRepo.Save
}

export function makeCreateAdminUsecase(dependencies: Dependencies): UseCase<Input, Promise<Response>> {
    const { exists, save } = dependencies;

    return async function(request: Input): Promise<Response> {
        const firstNameRes = UserName.create(request.firstName);
        const lastNameRes = UserName.create(request.lastName);
        const emailRes = UserEmail.create(request.email);
        const passwordRes = UserPassword.createNotHashed(request.password);
        const res = Result.combine([firstNameRes, lastNameRes, emailRes, passwordRes]);
        if(!res.success){
            return left(res);
        }

        const firstName = firstNameRes.getValue();
        const lastName = lastNameRes.getValue();
        const email = emailRes.getValue();
        const password = passwordRes.getValue();

        try {
            if(await exists(email.getValue())){
                return left(new AdminErrors.AccountAlreadyExists());
            }
    
            const admin = Admin.create({ firstName, lastName, email, password }).getValue();
            await save(admin);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}