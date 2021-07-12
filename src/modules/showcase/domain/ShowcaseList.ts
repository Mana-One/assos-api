import { Result } from "../../../core/logic";


export interface ShowcaseListItemProps {
    id: string;
    name: string;
}

export interface  ShowcaseListDto {
    readonly total: number;
    readonly showcases: Array<Readonly<ShowcaseListItemProps>>;
}

export namespace ShowcaseList {
    export function create(props: ShowcaseListItemProps[]): Result<ShowcaseListDto> {
        return Result.ok<ShowcaseListDto>(
            Object.freeze({
                total: props.length,
                showcases: props.map(elm => Object.freeze(elm))
            })
        );
    }
}