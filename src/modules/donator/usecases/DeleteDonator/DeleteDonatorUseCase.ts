import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, left, Result, right } from "../../../../core/logic";
import { DonatorRepo } from "../../infra/repositories";
import { DonatorErrors } from "../errors";
import { Input } from "./DeleteDonatorInput";
import { Response } from "./DeletedonatorResponse";


export class DeleteDonator implements UseCase<Input, Promise<Response>> {
    constructor(private donatorRepo: DonatorRepo){}

    async execute(request: Input): Promise<Response> {
        try {
            const donator = await this.donatorRepo.findById(new UniqueId(request.donatorId));
            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }
    
            await this.donatorRepo.remove(donator);
            return right(Result.ok<void>());
            
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

    }
}