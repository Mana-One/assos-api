import { ShowcaseDto, ShowcaseListDto } from "../domain";


export namespace ShowcaseRepo {
    export interface FindById {
        (showcaseId: string): Promise<ShowcaseDto | null>;
    }

    export interface Search {
        (input: string, limit: number, offset: number): Promise<ShowcaseListDto>;
    }
}