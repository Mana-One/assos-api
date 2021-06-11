import { ModelCtor } from "sequelize";
import { StoreService } from "../../../modules/donator/services";
import { Role } from "../../../shared/domain";
import { UserInstance } from "../models/User";


export function addUserHooks(
    User: ModelCtor<UserInstance>,
    removeDonator: StoreService.RemoveDonator
){
    User.afterDestroy(async user => {
        if(user.role === Role.DONATOR){
            await removeDonator(user.storeReference);
        }
    });
}