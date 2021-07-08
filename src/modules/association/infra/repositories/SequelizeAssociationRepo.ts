import { models, sequelize } from "../../../../infra/sequelize";
import { UserEmail } from "../../../../shared/domain";
import { Association, Member } from "../../domain";
import { AssociationMap, MemberMap } from "../../mappers";
import { AssociationRepo } from "../../repositories";


export namespace SequelizeAssociationRepo {
    export const createAssociation: AssociationRepo.CreateAssociation = async (association: Association, manager: Member): Promise<void> => {
        const transaction = await sequelize.transaction();

        const associationData = AssociationMap.toPersistence(association);        
        await models.Association.create(associationData, { transaction });

        const managerData = await MemberMap.toPersistence(manager);
        await models.User.create(managerData, { transaction });
        await transaction.commit();
    }

    export const findById: AssociationRepo.FindById = async (associationId: string): Promise<Association | null> => {
        const instance = await models.Association.findByPk(associationId);
        if(instance === null){
            return null;
        }

        return AssociationMap.toDomain(instance);
    }

    export const isMemberEmailUsed: AssociationRepo.IsMemberEmailUsed = async (email: UserEmail): Promise<boolean> => {
        const check = await models.User.findOne({
            where: { email: email.getValue() }
        });
        return check === null;
    }

    export const remove: AssociationRepo.Remove = async (association: Association): Promise<void> => {
        await models.Association.destroy({
            where: { id: association.getId().toString() }
        });
    }

    export const save: AssociationRepo.Save = async (association: Association): Promise<void> => {
        const data = AssociationMap.toPersistence(association);
        await models.Association.update(data, {
            where: { id: data.id }
        });
    }
}