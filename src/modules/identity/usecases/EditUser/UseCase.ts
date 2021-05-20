import { UseCase } from "../../../../core/domain";
import { AppErrors, Changes, Either, left, Result, right, WithChanges } from "../../../../core/logic";
import { User, UserEmail, UserName } from "../../domain";
import { UserRepo } from "../../infra/repositories";
import { IdentityErrors } from "../errors";

interface Input {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.UserNotFound |
    Result<any>,
    Result<void>
>;

export class EditUser implements UseCase<Input,Promise<Response>>, WithChanges {
    readonly changes: Changes;

    constructor(private userRepo: UserRepo){
        this.changes = new Changes();
    }

    async execute(request: Input): Promise<Response> {
        let user: User | null = null;
        try {
            user = await this.userRepo.findById(request.userId);
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        if(user === null){
            return left(new IdentityErrors.UserNotFound());
        }

        this.applyNameChanges(user, request);
        await this.applyEmailChange(user, request);

        const changesOrError = this.changes.combineChangeResults();
        if(changesOrError.success){
            try {
                await this.userRepo.save(user);
                return right(Result.ok<void>());

            } catch(err){
                return left(new AppErrors.UnexpectedError(err));
            }
        }

        return left(changesOrError);
    }

    private applyNameChanges(user: User, request: Input): void {
        if(request.firstName !== undefined){
            const firtNameOrError = UserName.create(request.firstName);
            if(firtNameOrError.success){
                this.changes.addChange(
                    user.updateFirstName(firtNameOrError.getValue())
                );
            } else {
                this.changes.addChange(firtNameOrError);
            }
        }

        if(request.lastName !== undefined){
            const lastNameOrError = UserName.create(request.lastName);
            if(lastNameOrError.success){
                this.changes.addChange(
                    user.updateFirstName(lastNameOrError.getValue())
                );
            } else {
                this.changes.addChange(lastNameOrError);
            }
        }
    }

    private async applyEmailChange(user: User, request: Input): Promise<void> {
        if(request.email === undefined){
            return;
        }

        const emailOrError = UserEmail.create(request.email);
        if(!emailOrError.success){
            this.changes.addChange(emailOrError);
            return;
        }

        const email = emailOrError.getValue();
        try {
            const check = await this.userRepo.findByEmail(email);
            if(check !== null){
                this.changes.addChange(new IdentityErrors.AccountAlreadyExists(email.getValue()));
            }
    
            this.changes.addChange(user.updateEmail(email));

        } catch(err) {
            this.changes.addChange(new AppErrors.UnexpectedError(err));
        }
    }
}

