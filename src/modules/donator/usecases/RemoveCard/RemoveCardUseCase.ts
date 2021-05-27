import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, left, Result, right } from "../../../../core/logic";
import { DonatorRepo } from "../../infra/repositories";
import { WalletRepo } from "../../infra/repositories/WalletRepo";
import { DonatorErrors } from "../errors";
import { Input } from "./RemoveCardInput";
import { Response } from "./RemoveCardResponse";


export class RemoveCard implements UseCase<Input, Promise<Response>> {
    constructor(
        private donatorRepo: DonatorRepo,
        private walletRepo: WalletRepo
    ){}

    async execute(request: Input): Promise<Response> {
        try {
            const card = await this.walletRepo.findCardById(request.cardId);
            if(card === null){
                return left(new DonatorErrors.CardNotFound());
            }

            const donator = await this.donatorRepo.findById(new UniqueId(request.donatorId));
            if(donator === null){
                return left(new DonatorErrors.DonatorNotFound());
            }
            
            if(!donator.hasCard(card)){
                return left(new DonatorErrors.CardNotFound());
            }

            donator.removeCard(card);
            await this.donatorRepo.save(donator);            
            return right(Result.ok<void>());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}