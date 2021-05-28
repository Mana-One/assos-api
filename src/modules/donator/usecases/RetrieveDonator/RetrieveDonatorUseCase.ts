import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, left, Result, right } from "../../../../core/logic";
import { DonatorRepo } from "../../infra/repositories";
import { DonatorErrors } from "../errors";
import { Input }from "./RetrieveDonatorInput";
import { DonatorDto, Response } from "./RetrieveDonatorResponse";


export class RetrieveDonator implements UseCase<Input, Promise<Response>> {
    constructor(private donatorRepo: DonatorRepo){}

    async execute(request: Input): Promise<Response> {
        try {
            const donator = await this.donatorRepo.findById(new UniqueId(request.donatorId));
            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }
    
            return right(Result.ok<DonatorDto>({
                id: donator.getId().toString(),
                firstName: donator.getFirstName().getValue(),
                lastName: donator.getLastName().getValue(),
                email: donator.getEmail().getValue()
            }));
            
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }    
}