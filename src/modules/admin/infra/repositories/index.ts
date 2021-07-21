import { UniqueId } from "../../../../core/domain";
import { models } from "../../../../infra/sequelize";
import { Role, UserEmail, UserName, UserPassword } from "../../../../shared/domain";
import { Admin } from "../../domain";
import { AdminWriteRepo } from "../../repositories";


export namespace SequelizeAdminWrtieRepo {
    export const findById: AdminWriteRepo.FindById = async (id: string): Promise<Admin | null> => {
        const instance = await models.User.findOne({
            where: {
                role: Role.ADMIN,
                id
            }
        });
        if(instance === null){
            return null;
        }

        return Admin.create({
            firstName: UserName.create(instance.firstName).getValue(),
            lastName: UserName.create(instance.lastName).getValue(),
            email: UserEmail.create(instance.email).getValue(),
            password: UserPassword.createHashed(instance.password).getValue()
        }, new UniqueId(instance.id)).getValue();
    }

    export const exists: AdminWriteRepo.Exists = async (email: string): Promise<boolean> => {
        const instance = await models.User.findOne({
            where: {
                role: Role.ADMIN,
                email
            }
        });
        return instance !== null;
    }

    export const remove: AdminWriteRepo.Remove = async (admin: Admin): Promise<void> => {
        await models.User.destroy({ where: { id: admin.getId().toString() }});
    }

    export const save: AdminWriteRepo.Save = async (admin: Admin): Promise<void> => {
        await models.User.create({
            id: admin.getId().toString(),
            firstName: admin.getFirstName().getValue(),
            lastName: admin.getLastName().getValue(),
            email: admin.getEmail().getValue(),
            role: Role.ADMIN,
            password: await admin.getHashedPassword()
        });
    }
}