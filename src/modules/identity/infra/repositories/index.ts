import { UserEmail } from "../../../../shared/domain";
import { User } from "../../domain";
import { UserRepo } from "../../repositories";
import { models } from "../../../../infra/sequelize";
import { UserMap } from "../../mappers";


export namespace SequelizeUserRepo  {
    export const findByEmail: UserRepo.FindByEmail = async (email: UserEmail): Promise<User | null> => {
        const instance = await models.User.findOne({
            attributes: ["id", "firstName", "lastName", "email", "password", "role", "associationId"],
            where: { email: email.getValue() }
        });
        if(instance === null){
            return null;
        }

        return UserMap.toDomain(instance);
    }

    export const findById: UserRepo.FindById = async (userId: string): Promise<User | null> => {
        const instance = await models.User.findByPk(userId, {
            attributes: ["id", "firstName", "lastName", "email", "password", "role", "associationId"]
        });
        if(instance === null){
            return null;
        }

        return UserMap.toDomain(instance);
    }

    export const save: UserRepo.Save = async (user: User): Promise<void> => {
        const props = await UserMap.toPersistence(user);
        await models.User.update(props, {
            where: { id: user.getId().toString() }
        });
    }
}