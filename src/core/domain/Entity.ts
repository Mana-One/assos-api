import { UniqueId } from "./UniqueId";

function isEntity(v: any): v is Entity<any>{
    return v instanceof Entity;
}

export class Entity<T> {
    protected readonly _id: UniqueId;
    protected props: T;

    constructor(props: T, id?: UniqueId){
        this._id = !!id ? id : new UniqueId();
        this.props = props;
    }

    equals(obj?: Entity<T>): boolean {
        if(obj === null || obj === undefined){
            return false;
        }

        if(this === obj){
            return true;
        }

        if(!isEntity(obj)){
            return false;
        }

        return this._id.equals(obj._id);
    }
}