import { Op } from 'sequelize';
import { escape } from 'mysql2';
import { models } from "../../../../infra/sequelize";
import { Showcase, ShowcaseDto, ShowcaseList, ShowcaseListDto } from "../../domain";
import { ShowcaseRepo } from "../../repositories";


export namespace SequelizeShowcaseRepo {
    export const findById: ShowcaseRepo.FindById = async (
        showcaseId: string
    ): Promise<ShowcaseDto | null> => {
        const instance = await models.Association.findByPk(showcaseId, {
            attributes: {
                exclude: ['status', 'storeReference']
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
            where: { name: { [Op.like]: `${escape(input)}%` }},
            order: [['name', 'ASC']],
            limit,
            offset
        });
        return ShowcaseList.create(showcases, total).getValue();
    }
}