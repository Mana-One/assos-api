import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { UserEmail } from "../../../../shared/domain";
import { EditAssociationInfoProps } from "../../domain";
import { AssociationRepo } from "../../repositories";
import { AssociationErrors } from "../errors";


export interface Input {
    associationId: string;
    name?: string;
    email?: string;
    bannerUrl?: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.AssociationNotFound |
    Result<any>,

    Result<void>
>;

interface Props {
    findAssociation: AssociationRepo.FindById,
    save: AssociationRepo.Save
}

export function makeEditInfoUsecase(props: Props): UseCase<Input, Promise<Response>>{
    const { findAssociation, save } = props;

    return async function(request: Input): Promise<Response> {
        try {
            const association = await findAssociation(request.associationId);
        
            if(association === null){
                return left(new AssociationErrors.AssociationNotFound());
            }

            const data: EditAssociationInfoProps = {
                name: request.name,
                bannerUrl: request.bannerUrl
            }

            if(request.email !== undefined){
                const emailRes = UserEmail.create(request.email);
                if(!emailRes.success){
                    return left(emailRes);
                }
                data.email = emailRes.getValue();
            }

            const editResult = association.editInfo(data);
            if(!editResult.success){
                return left(editResult);
            }

            await save(association);
            return right(Result.ok());

        } catch(err) { 
            return left(new AppErrors.UnexpectedError(err)); 
        }
    }
}