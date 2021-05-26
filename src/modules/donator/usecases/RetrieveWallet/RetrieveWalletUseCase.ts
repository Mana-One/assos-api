import { UseCase } from "../../../../core/domain";
import { AppErrors, left, Result, right } from "../../../../core/logic";
import { Card } from "../../domain";
import { WalletRepo } from "../../infra/repositories/WalletRepo";
import { Input } from "./RetrieveWalletInput";
import { Response, WalletDto } from "./RetrieveWalletResponse";


export class RetrieveWallet implements UseCase<Input, Promise<Response>> {
    constructor(private walletRepo: WalletRepo){}

    async execute(request: Input): Promise<Response> {
        try {
            const wallet = await this.walletRepo.retrieveByDonatorId(request.donatorId);
            const walletDto = await this.mapToDto(wallet);
            return right(Result.ok<WalletDto>(walletDto));
             
        } catch(err) {
            return left(new AppErrors.UnexpectedError(err));
        }
    }

    private async mapToDto(wallet: Card[]) {
        const cards = await Promise.all(wallet.map(async card => {
            return Object.freeze({
                id: card.getId().toString(),
                last4: card.getLast4().getValue(),
                storeReference: card.getStoreReference()
            });
        }));
        return Object.freeze({ cards });
    }
}