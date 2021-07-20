import { UseCase } from "../../../../core/domain";
import { Either, AppErrors, Result, left, right } from "../../../../core/logic";
import { DonatorWriteRepo } from "../../repositories";
import { DonatorErrors } from "../errors";


export interface Input {
    donatorId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.DonatorNotFound,
    Result<void>
>;

interface Props {
    findById: DonatorWriteRepo.FindById;
    remove: DonatorWriteRepo.Remove;
}

export function makeDeleteDonatorUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findById, remove } = props;
    
    return async function(request: Input): Promise<Response> {
        try {
            const donator = await findById(request.donatorId);
            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }
    
            await remove(donator);
            return right(Result.ok<void>());
            
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

    }
}