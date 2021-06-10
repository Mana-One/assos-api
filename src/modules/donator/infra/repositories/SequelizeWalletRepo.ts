import { models } from "../../../../infra/sequelize";
import { Card } from "../../domain";
import { CardMap } from "../../mappers";
import { WalletRepo } from "../../repositories/WalletRepo";

export namespace SequelizeWalletRepo {
    export const findCardById: WalletRepo.FindCardById = async (cardId: string): Promise<Card | null> => {
        const instance = await  models.Card.findByPk(cardId);
        if(instance === null){
            return null;
        }

        return CardMap.toDomain(instance);
    }

    export const retrieveByDonatorId: WalletRepo.RetrieveByDonatorId = async (donatorId: string): Promise<Card[]> => {
        const instances = await models.Card.findAll({
            where: { donatorId },
            limit: 5,
            order: [["id", "ASC"]]
        });
        return instances.map(instance => CardMap.toDomain(instance));
    }
}