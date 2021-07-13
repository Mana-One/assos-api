import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { ShowcaseDto } from "../../domain";
import { ShowcaseRepo } from "../../repositories";
import { ShowcaseErrors } from "../errors";


export interface Input {
    showcaseId: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    ShowcaseErrors.ShowcaseNotFound,

    Result<ShowcaseDto>
>;

interface Props {
    getShowcase: ShowcaseRepo.FindById
}

export function makeGetShowcaseUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { getShowcase } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const dto = await getShowcase(request.showcaseId);
            if(dto === null){
                return left(new ShowcaseErrors.ShowcaseNotFound());
            }
    
            return right(Result.ok<ShowcaseDto>(dto));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}