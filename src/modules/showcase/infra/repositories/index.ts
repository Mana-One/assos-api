import { Op } from 'sequelize';
import { models } from "../../../../infra/sequelize";
import { Showcase, ShowcaseDto, ShowcaseList, ShowcaseListDto } from "../../domain";
import { ShowcaseRepo } from "../../repositories";
import { AssociationStatus } from '../../../association/domain';


export namespace SequelizeShowcaseRepo {
    export const findById: ShowcaseRepo.FindById = async (
        showcaseId: string
    ): Promise<ShowcaseDto | null> => {
        const instance = await models.Association.findOne({
            attributes: { exclude: ['status', 'storeReference'] },
            where: { 
                id: showcaseId, 
                status: AssociationStatus.VALID
            }
        });
        if(instance === null){
            return null;
        }

        return Showcase.create(instance).getValue();
    }

    export const search: ShowcaseRepo.Search = async (
        input: string, 
        limit: number, 
        offset: number
    ): Promise<ShowcaseListDto> => {
        const { count: total, rows: showcases } = await models.Association.findAndCountAll({
            attributes: ['id', 'name'],
            where: { 
                name: { [Op.like]: `${input}%` },
                status: AssociationStatus.VALID 
            },
            order: [['name', 'ASC']],
            limit,
            offset
        });
        return ShowcaseList.create(showcases, total).getValue();
    }
}