import { UniqueId, UseCase } from "../../../../core/domain";
import { AppErrors, left, Result, right } from "../../../../core/logic";
import { Card, CardLast4, Donator } from "../../domain";
import { DonatorRepo } from "../../infra/repositories";
import { DonatorErrors } from "../errors";
import { Input } from "./AddCardInput";
import { Response } from "./AddCardResponse";


export class AddCard implements UseCase<Input, Promise<Response>> {
    constructor(private donatorRepo: DonatorRepo){}

    async execute(request: Input): Promise<Response> {
        let donator: Donator | null = null;
        try {
            const donatorId = new UniqueId(request.donatorId);
            donator = await this.donatorRepo.findById(donatorId);
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }

        if(donator === null){
            return left(new DonatorErrors.DonatorNotFound());
        }

        if(donator.isWalletFull()){
            return left(new DonatorErrors.WalletIsFull());
        }

        const last4Res = CardLast4.create(request.last4);
        if(!last4Res.success){
            return left(last4Res);
        }

        const last4 = last4Res.getValue();
        const cardRes = Card.create({ 
            last4, 
            storeReference: request.storeReference
        });
        if(!cardRes.success){
            return left(cardRes);
        }

        const card = cardRes.getValue();
        donator.addCard(card);
        try {
            await this.donatorRepo.save(donator);
            return right(Result.ok<void>());

        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }
}