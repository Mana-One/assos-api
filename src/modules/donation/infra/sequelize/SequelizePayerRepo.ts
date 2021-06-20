import { models } from "../../../../infra/sequelize";
import { Payer } from "../../domain";
import { PayerMap } from "../../mappers";
import { PayerRepo } from "../../repositories";

export namespace SequelizePayerRepo {
    export const findById: PayerRepo.FindById = async (payerId: string): Promise<Payer | null> => {
        const instance = await models.User.findByPk(payerId, {
            attributes: ["id", "storeReference"]
        });
        if(instance === null){
            return null;
        }
        
        return PayerMap.toDomain(instance);
    }
}