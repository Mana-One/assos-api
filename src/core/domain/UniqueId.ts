import { v4 } from "uuid";
import { Identifier } from "./Identifier";


export class UniqueId extends Identifier<string | number> {
    constructor(id?: string | number){
        super(id !== undefined ? id : v4());
    }
}