import { UserEmail } from "../../../../../shared/domain";
import { User } from "../../../domain";
import { UserRepo } from "../UserRepo";
import { models } from "../../../../../infra/sequelize";
import { UserMap } from "../../../mappers";


export class SequelizeUserRepo implements UserRepo {
    async findByEmail(email: UserEmail): Promise<User | null> {
        const instance = await models.User.findOne({
            attributes: ["id", "firstName", "lastName", "email", "passord", "role"],
            where: { email: email.getValue() }
        });
        if(instance === null){
            return null;
        }

        return UserMap.toDomain(instance);
    }

    async findById(userId: string): Promise<User | null> {
        const instance = await models.User.findByPk(userId, {
            attributes: ["id", "firstName", "lastName", "email", "passord", "role"]
        });
        if(instance === null){
            return null;
        }

        return UserMap.toDomain(instance);
    }

    async save(user: User): Promise<void> {
        const props = await UserMap.toPersistence(user);
        await models.User.update(props, {
            where: { id: user.getId().toString() }
        });
    }
}