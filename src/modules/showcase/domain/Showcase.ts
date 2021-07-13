import { Result } from "../../../core/logic";


export interface ShowcaseProps {
    id: string;
    name: string;
    email: string;
    bannerUrl: string;
    presentation: string;
}

export type ShowcaseDto = Readonly<ShowcaseProps>;

export namespace Showcase {
    export function create(props: ShowcaseProps): Result<ShowcaseDto>{
        return Result.ok<ShowcaseDto>(Object.freeze(props));
    }
}