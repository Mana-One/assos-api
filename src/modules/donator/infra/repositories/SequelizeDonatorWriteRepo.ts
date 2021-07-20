import { models } from "../../../../infra/sequelize";
import { Role, UserEmail } from "../../../../shared/domain";
import { Donator } from "../../domain";
import { DonatorMap } from "../../mappers";
import { DonatorWriteRepo } from "../../repositories";

export namespace SequelizeDonatorWriteRepo {
    export const isEmailUsed: DonatorWriteRepo.IsEmailUsed = async (email: UserEmail): Promise<boolean> => {
        const instance = await models.User.findOne({
            where: { email: email.getValue() }
        });
        return instance !== null;
    }

    export const findById: DonatorWriteRepo.FindById = async (donatorId: string): Promise<Donator | null> => {
        const instance = await models.User.findOne({
            where: {
                id: donatorId,
                role: Role.DONATOR
            }
        });
        if(instance === null){
            return null;
        }

        return DonatorMap.toDomain(instance);
    }

    export const remove: DonatorWriteRepo.Remove = async (donator: Donator): Promise<void> => {
        await models.User.destroy({
            where: {
                id: donator.getId().toString(),
                role: Role.DONATOR
            }
        });
    }

    export const save: DonatorWriteRepo.Save = async (donator: Donator): Promise<void> => {
        await models.User.upsert(await DonatorMap.toPersistence(donator));
    }
}