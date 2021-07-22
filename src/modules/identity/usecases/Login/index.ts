import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UseCase } from "../../../../core/domain";
import { Authentication } from "../../../../shared/services";
import { UserRepo } from "../../repositories";
import { UserEmail, UserPassword } from "../../../../shared/domain";
import { IdentityErrors } from "../errors";
import { AccessToken } from "../../../../shared/domain";


export interface Input {
    email: string,
    password: string
}

export type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.UserNotFound |
    Result<any>,
    Result<AccessToken>
>;

interface Props {
    findByEmail: UserRepo.FindByEmail;
    createToken: Authentication.CreateToken;
}

export function makeLoginUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findByEmail, createToken } = props;

    return async function(request: Input): Promise<Response> {
        const emailOrFail = UserEmail.create(request.email);
        const passwordOrFail = UserPassword.createNotHashed(request.password);
        const res = Result.combine([emailOrFail, passwordOrFail]);
        if(!res.success){
            return left(res);
        }

        const email = emailOrFail.getValue();
        const password = passwordOrFail.getValue();

        try {
            const user = await findByEmail(email);
            if(user === null || !await user.comparePassword(password.getValue())){
                return left(new IdentityErrors.UserNotFound());
            }

            const associationId = user.getAssociationId();            
            const token = await createToken({
                id: user.getId().toString(),
                username: `${user.getFirstName().getValue()} ${user.getLastName().getValue()}`,
                role: user.getRole(),
                associationId: associationId === null ? null : associationId.toString()
            });
            
            return right(Result.ok<AccessToken>(token));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}