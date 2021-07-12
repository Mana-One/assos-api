import { ShowcaseListDto } from "../domain";

export namespace ShowcaseRepo {
    export interface Search {
        (input: string, limit: number, offset: number): Promise<ShowcaseListDto>;
    }
}