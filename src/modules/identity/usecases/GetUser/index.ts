import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UserRepo } from "../../repositories";
import { IdentityErrors } from "../errors";
import { UserDto, UserMap } from "../../mappers";


export interface Input {
    userId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    IdentityErrors.UserNotFound,

    Result<UserDto>
>;

interface Props {
    findById: UserRepo.FindById;
}

export function makeGetUserUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findById } = props;
    
    return async function(request: Input): Promise<Response> {       
        try {
            const user = await findById(request.userId);            
            if(user === null){
                return left(new IdentityErrors.UserNotFound());
            }

            return right(Result.ok<UserDto>(UserMap.toDto(user)));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}