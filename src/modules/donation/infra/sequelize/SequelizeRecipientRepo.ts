import { Recipient } from "../../domain";
import { RecipientRepo } from "../../repositories";
import { models } from "../../../../infra/sequelize";
import { RecipientMap } from "../../mappers";


export namespace SequelizeRecipientRepo {
    export const findById: RecipientRepo.FindById = async (recipientId: string): Promise<Recipient | null> => {
        const instance = await models.Association.findByPk(recipientId, {
            attributes: ["id", "name", "storeReference"]
        });
        if(instance === null){
            return null;
        }
        
        return RecipientMap.toDomain(instance);
    }
}