import { UseCase } from "../../../../core/domain";
import { AppErrors, Changes, Either, left, Result, right, WithChanges } from "../../../../core/logic";
import { User } from "../../domain";
import { UserEmail, UserName } from "../../../../shared/domain";
import { UserRepo } from "../../repositories";
import { IdentityErrors } from "../errors";


export interface Input {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.UserNotFound |
    Result<any>,
    Result<void>
>;

interface Props {
    findByEmail: UserRepo.FindByEmail;
    findById: UserRepo.FindById;
    save: UserRepo.Save;
}

export function makeEditUserUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findByEmail, findById, save } = props;
    
    return async function(request: Input): Promise<Response> {
        const changes = new Changes();
        
        try {
            const user = await findById(request.userId);            
            if(user === null){
                return left(new IdentityErrors.UserNotFound());
            }

            applyNameChanges(user, request, changes);
            await applyEmailChange(user, request, findByEmail, changes);

            const changesOrError = changes.combineChangeResults();
            if(changesOrError.success){
                await save(user);
                return right(Result.ok<void>());
            }
            
            return left(changesOrError);

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}

function applyNameChanges(user: User, request: Input, changes: Changes): void {
    if(request.firstName !== undefined){
        const firtNameOrError = UserName.create(request.firstName);
        if(firtNameOrError.success){
            changes.addChange(
                user.updateFirstName(firtNameOrError.getValue())
            );
        } else {
            changes.addChange(firtNameOrError);
        }
    }

    if(request.lastName !== undefined){
        const lastNameOrError = UserName.create(request.lastName);
        if(lastNameOrError.success){
            changes.addChange(
                user.updateFirstName(lastNameOrError.getValue())
            );
        } else {
            changes.addChange(lastNameOrError);
        }
    }
}

async function applyEmailChange(
    user: User, 
    request: Input, 
    findByEmail: UserRepo.FindByEmail, 
    changes: Changes): Promise<void> {

    if(request.email === undefined){
        return;
    }

    const emailOrError = UserEmail.create(request.email);
    if(!emailOrError.success){
        changes.addChange(emailOrError);
        return;
    }

    const email = emailOrError.getValue();
    try {
        const check = await findByEmail(email);
        if(check !== null){
            changes.addChange(new IdentityErrors.AccountAlreadyExists(email.getValue()));
        }

        changes.addChange(user.updateEmail(email));

    } catch(err) {
        changes.addChange(new AppErrors.UnexpectedError(err));
    }
}