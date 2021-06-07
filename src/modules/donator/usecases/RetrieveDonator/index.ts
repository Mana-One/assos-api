import { UseCase, UniqueId } from "../../../../core/domain";
import { Either, AppErrors, Result, left, right } from "../../../../core/logic";
import { DonatorDto, DonatorMap } from "../../mappers";
import { DonatorRepo } from "../../repositories";
import { DonatorErrors } from "../errors";


export interface Input {
    donatorId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.DonatorNotFound |
    Result<any>,
    Result<DonatorDto>
>;

interface Props {
    findById: DonatorRepo.FindById;
}

export function makeRetrieveDonatorUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { findById } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const donator = await findById(request.donatorId);
            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }
            
            const dto = DonatorMap.toDto(donator);
            return right(Result.ok<DonatorDto>(dto));
            
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}