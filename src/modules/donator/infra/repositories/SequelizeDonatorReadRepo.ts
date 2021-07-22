import { models } from "../../../../infra/sequelize";
import { Role } from "../../../../shared/domain";
import { createDonatorListDto, DonatorListDto } from "../../domain";
import { DonatorReadRepo } from "../../repositories";

export namespace SequelizeDonatorReadRepo {
    export const listDonators: DonatorReadRepo.ListDonators = async (
        limit: number, offset: number
    ): Promise<DonatorListDto> => {
        const { count: total, rows: instances } = await models.User.findAndCountAll({
            where: { role: Role.DONATOR },
            order: [['lastName', 'ASC'], ['firstName', 'ASC']],
            limit,
            offset
        });
        return createDonatorListDto(instances, total);
    }
}