import { Recipient } from "../../domain";
import { RecipientRepo } from "../../repositories";
import { models } from "../../../../infra/sequelize";
import { RecipientMap } from "../../mappers";
import { AssociationStatus } from "../../../association/domain";


export namespace SequelizeRecipientRepo {
    export const findById: RecipientRepo.FindById = async (recipientId: string): Promise<Recipient | null> => {
        const instance = await models.Association.findOne({
            attributes: ["id", "name", "storeReference"],
            where: {
                id: recipientId,
                status: AssociationStatus.VALID
            }
        });
        if(instance === null){
            return null;
        }
        
        return RecipientMap.toDomain(instance);
    }
}