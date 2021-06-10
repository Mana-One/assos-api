import { models, sequelize } from "../../../../infra/sequelize";
import { Role, UserEmail } from "../../../../shared/domain";
import { Donator } from "../../domain";
import { DonatorMap, WalletMap } from "../../mappers";
import { DonatorRepo } from "../../repositories";

export namespace SequelizeDonatorRepo {
    export const isEmailUsed: DonatorRepo.IsEmailUsed = async (email: UserEmail): Promise<boolean> => {
        const instance = await models.User.findOne({
            where: { email: email.getValue() }
        });
        return instance !== null;
    }

    export const findById: DonatorRepo.FindById = async (donatorId: string): Promise<Donator | null> => {
        const instance = await models.User.findOne({
            where: {
                id: donatorId,
                role: Role.DONATOR
            },
            include: [{
                model: models.Card,
                attributes: { exclude: ["donatorId"] },
                limit: 5,
                order: [["id", "ASC"]]
            }]
        });
        if(instance === null){
            return null;
        }

        return DonatorMap.toDomain(instance);
    }

    export const remove: DonatorRepo.Remove = async (donator: Donator): Promise<void> => {
        await models.User.destroy({
            where: {
                id: donator.getId().value,
                role: Role.DONATOR
            }
        });
    }

    export const save: DonatorRepo.Save = async (donator: Donator): Promise<void> => {
        const transaction = await sequelize.transaction();
        const [instance] = await models.User
            .upsert(await DonatorMap.toPersistence(donator), { transaction });

        if(donator.countNewlyAddedCards() > 0){
            const newCards = WalletMap.toPersistence(
                donator.getNewlyAddedCards(), 
                instance.id
            );

            await models.Card.bulkCreate(newCards);
        }

        if(donator.countRemovedCards() > 0){
            const deletedCards = WalletMap.toPersistence(
                donator.getRemovedCards(), 
                instance.id
            );

            await models.Card.bulkCreate(deletedCards);
        }

        await transaction.commit();
    }
}