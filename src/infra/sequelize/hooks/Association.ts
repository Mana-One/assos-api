import { ModelCtor } from "sequelize";
import { AssociationInstance } from "../models/Association";
import { StripeStore } from "../../stripe"


export function addAssociationHooks(
    Association: ModelCtor<AssociationInstance>
){
    Association.afterDestroy(async association => {
        await StripeStore.accounts.del(association.storeReference);
    });
}