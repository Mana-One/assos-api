import { Result } from "./Result";

export interface WithChanges {
    readonly changes: Changes;
}

export class Changes {
    private changes: Result<any>[] = [];

    addChange(result: Result<any>): void {
        this.changes.push(result);
    }

    combineChangeResults(): Result<any> {
        return Result.combine(this.changes);
    }
}