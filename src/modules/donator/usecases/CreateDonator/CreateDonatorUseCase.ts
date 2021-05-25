import { UseCase } from "../../../../core/domain";
import { AppErrors, left, Result, right } from "../../../../core/logic";
import { UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Donator, StoreReference, Wallet } from "../../domain";
import { DonatorRepo } from "../../infra/repositories";
import { StoreService } from "../../infra/store";
import { DonatorErrors } from "../errors";
import { Input } from "./CreateDonatorInput";
import { Response } from "./CreateDonatorResponse";

export class CreateDonator implements UseCase<Input, Promise<Response>> {
    constructor(
        private donatorRepo: DonatorRepo, 
        private storeService: StoreService
    ){}

    async execute(request: Input): Promise<Response> {
        const firstName = UserName.create(request.firstName);
        const lastName = UserName.create(request.lastName);
        const email = UserEmail.create(request.email);
        const password = UserPassword.createNotHashed(request.password);
        const res = Result.combine([firstName, lastName, email, password]);
        if(!res.success){
            return left(res);
        }

        let storeReference: StoreReference;
        try {
            if(await this.donatorRepo.isEmailUsed(email.getValue())){
                return left(new DonatorErrors.AccountAlreadyExists());
            }

            storeReference = await this.storeService.register({
                firstName: firstName.getValue(),
                lastName: lastName.getValue()
            })

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        const donator = Donator.create({
            firstName: firstName.getValue(), 
            lastName: lastName.getValue(), 
            email: email.getValue(), 
            password: password.getValue(),
            storeReference,
            wallet: new Wallet()
        }).getValue();

        try {
            await this.donatorRepo.save(donator);
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        return right(Result.ok<Donator>(donator));
    }
}