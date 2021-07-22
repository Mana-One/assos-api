import { Result } from "../../../core/logic";


export interface ShowcaseListItemProps {
    id: string;
    name: string;
}

export type ShowcaseListItemDto = Readonly<ShowcaseListItemProps>;

export interface  ShowcaseListDto {
    readonly total: number;
    readonly showcases: Array<Readonly<ShowcaseListItemProps>>;
}

export namespace ShowcaseList {
    export function create(props: ShowcaseListItemProps[], total: number): Result<ShowcaseListDto> {
        return Result.ok<ShowcaseListDto>(
            Object.freeze({
                total,
                showcases: props.map(elm => Object.freeze(elm))
            })
        );
    }
}