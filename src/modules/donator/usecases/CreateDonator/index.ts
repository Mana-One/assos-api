import { UseCase } from "../../../../core/domain";
import { Either, AppErrors, Result, left, right } from "../../../../core/logic";
import { UserName, UserEmail, UserPassword } from "../../../../shared/domain";
import { Donator, StoreReference, Wallet } from "../../domain";
import { DonatorRepo } from "../../repositories";
import { StoreService } from "../../services";
import { DonatorErrors } from "../errors";


export interface Input {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.AccountAlreadyExists |
    Result<any>,
    Result<Donator>
>;

interface Props {
    isEmailUsed: DonatorRepo.IsEmailUsed;
    register: StoreService.Register;
    save: DonatorRepo.Save;
}

export function makeCreateDonatorUseCase(props: Props): UseCase<Input, Promise<Response>> {
    const { isEmailUsed, register, save } = props;
    
    return async function(request: Input): Promise<Response> {
        const firstName = UserName.create(request.firstName);
        const lastName = UserName.create(request.lastName);
        const email = UserEmail.create(request.email);
        const password = UserPassword.createNotHashed(request.password);
        const res = Result.combine([firstName, lastName, email, password]);
        if(!res.success){
            return left(res);
        }

        try {
            if(await isEmailUsed(email.getValue())){
                return left(new DonatorErrors.AccountAlreadyExists());
            }

            const storeReference = await register({
                firstName: firstName.getValue(),
                lastName: lastName.getValue(),
                email: email.getValue()
            });

            const donator = Donator.create({
                firstName: firstName.getValue(), 
                lastName: lastName.getValue(), 
                email: email.getValue(), 
                password: password.getValue(),
                storeReference,
                wallet: new Wallet()
            }).getValue();

            await save(donator);
            return right(Result.ok<Donator>(donator));

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}