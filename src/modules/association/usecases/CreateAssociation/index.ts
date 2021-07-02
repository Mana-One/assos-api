import { UseCase } from "../../../../core/domain";
import { AppErrors, Either, left, Result, right } from "../../../../core/logic";
import { Role, UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Association, Member } from "../../domain";
import { AssociationRepo } from "../../repositories";
import { Merchantservice } from "../../services";
import { AssociationErrors } from "../errors";

export interface Input {
    name: string;
    email: string;
    bannerUrl: string;
    presentation: string;
    storeReference: string;
    manager: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
} 

export type Response = Either<
    AppErrors.UnexpectedError |
    AssociationErrors.AccountAlreadyExists |
    Result<any>,
    Result<void>
>;

interface Props {
    registerMerchant: Merchantservice.RegisterMerchant;
    isEmailUsed: AssociationRepo.IsMemberEmailUsed;
    createAssociation: AssociationRepo.CreateAssociation;
}

export function makeCreateAssociationUsecase(props: Props): UseCase<Input, Promise<Response>> {
    const { registerMerchant, isEmailUsed, createAssociation } = props;

    return async function(request: Input): Promise<Response> {
        const assoEmailRes = UserEmail.create(request.email);
        const managerEmailRes = UserEmail.create(request.manager.email);
        const firstNameRes = UserName.create(request.manager.firstName);
        const lastNameRes = UserName.create(request.manager.lastName);
        const passwordRes = UserPassword.createNotHashed(request.manager.password);
        const res = Result.combine([
            assoEmailRes,
            managerEmailRes, 
            firstNameRes, 
            lastNameRes, 
            passwordRes
        ]);
        if(!res.success){
            return left(res);
        }  

        try {
            if(await isEmailUsed(managerEmailRes.getValue())){
                return left(new AssociationErrors.AccountAlreadyExists());
            } 
            
            const storeReference = await registerMerchant(request.name, request.email);
            const associationRes = Association.create({
                name: request.name,
                email: assoEmailRes.getValue(),
                bannerUrl: request.bannerUrl,
                presentation: request.presentation,
                storeReference
            });
            if(!associationRes.success){
                return left(associationRes)
            }
    
            const association = associationRes.getValue();
            const manager = Member.create({
                firstName: firstNameRes.getValue(),
                lastName: lastNameRes.getValue(),
                email: managerEmailRes.getValue(),
                password: passwordRes.getValue(),
                role: Role.MANAGER,
                associationId: association.getId()
            }).getValue();
    
            await createAssociation(association, manager);
            return right(Result.ok());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}