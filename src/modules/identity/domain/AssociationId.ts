import { UniqueId } from "../../../core/domain"

export class AssociationId extends UniqueId {
    constructor(id?: string | number){
        super(id);
    }
}