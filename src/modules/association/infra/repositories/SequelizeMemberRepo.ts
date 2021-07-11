import { models } from "../../../../infra/sequelize";
import { Role } from "../../../../shared/domain";
import { Member } from "../../domain";
import { MemberMap } from "../../mappers";
import { MemberRepo } from "../../repositories";


export namespace SequelizeMemberRepo {
    export const countManagers: MemberRepo.CountManagers = async (associationId: string): Promise<number> => {
        return models.User.count({
            where: {
                role: Role.MANAGER,
                associationId
            }
        });
    }

    export const findMember: MemberRepo.FindMember = async (memberId: string, associationId: string): Promise<Member | null> => {
        const instance = await models.User.findOne({
            where: {
                id: memberId,
                associationId
            }
        });
        if(instance === null){
            return null;
        }

        return MemberMap.toDomain(instance);
    }

    export const listMembersByAssociation: MemberRepo.ListMembersByAsociation = async (
        associationId: string, 
        limit: number, 
        offset: number, 
        role?: string
        ): Promise<MemberRepo.ListMembersResponse> => {

        if(role !== undefined){
            const { count: total, rows } = await models.User.findAndCountAll({
                where: { role, associationId },
                order: [['id', 'DESC']],
                limit,
                offset
            });
            const members = rows.map(elm => MemberMap.toDomain(elm));
            return { total, members };

        }

        const { count: total, rows } = await models.User.findAndCountAll({
            where: { associationId },
            order: [['id', 'DESC']],
            limit,
            offset
        });
        const members = rows.map(elm => MemberMap.toDomain(elm));
        return { total, members };
    }

    export const remove: MemberRepo.Remove = async (member: Member): Promise<void> => {
        await models.User.destroy({
            where: { 
                id: member.getId().toString(),
                associationId: member.getAssociationId().toString()
            }
        });
    }

    export const save: MemberRepo.Save = async (member: Member): Promise<void> => {
        const data = await MemberMap.toPersistence(member);
        await models.User.upsert(data);
    }
}