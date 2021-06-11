import { ModelCtor } from "sequelize";
import { StoreService } from "../../../modules/donator/services";
import { CardInstance } from "../models/Card";
import { UserInstance } from "../models/User";


export function addCardHooks(
    Card: ModelCtor<CardInstance>,
    User: ModelCtor<UserInstance>,
    attachCard: StoreService.AttachCard,
    removeCard: StoreService.RemoveCard
){
    Card.afterCreate(async (card: CardInstance, options) => {
        const donator = await User.findByPk(
            card.donatorId,
            { 
                transaction: options.transaction,
                rejectOnEmpty: true 
            }
        );

        try {
            await attachCard(donator.storeReference, card.storeReference); 
        } catch(err){
            if(options.transaction != null){
                await options.transaction.rollback();
            }
            throw err;
        } 
    })

    Card.afterDestroy(async card => {
        await removeCard(card.storeReference);
    })
}