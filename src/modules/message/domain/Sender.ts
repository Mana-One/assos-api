import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";
import { Role } from "../../../shared/domain";


interface SenderProps {
    name: string;
    role: Role
}

export class Sender extends Entity<SenderProps> {
    getId(): UniqueId {
        return this._id;
    }

    getName(): string {
        return this.props.name;
    }

    getRole(): Role {
        return this.props.role;
    }

    static create(props: SenderProps, id?: UniqueId): Result<Sender> {
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'name', value: props.name },
            { key: 'role', value: props.role }
        ]);
        if(!guard.success){
            return Result.ko<Sender>(guard.message)
        } 

        if(props.name.length === 0){
            return Result.ko<Sender>('Invalid name');
        }

        return Result.ok<Sender>(new Sender(props, id));
    }
}