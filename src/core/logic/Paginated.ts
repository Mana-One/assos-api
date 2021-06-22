export interface Paginated<T> {
    readonly total: number;
    readonly previousOffset: number | null;
    readonly nextOffset: number | null;
    readonly data: T[]
}

export function getPaginated<T>(total: number, data: T[], limit: number, offset: number): Paginated<T> {
    const previousOffset = offset <= 0 || total < limit ? 
        null : 
        offset - limit;
    const lastOffset = total % limit === 0 ? 
        Math.floor(total / limit) * limit - limit :
        Math.floor(total / limit) * limit;

    if(total === limit || 
        lastOffset === 0 || 
        offset >= lastOffset){

        return Object.freeze({ total, previousOffset, nextOffset: null, data });
    }

    return Object.freeze({ total, previousOffset, nextOffset: offset + limit, data });
}

export function getOffset(offsetValue?: string): number {
    const offset = Number.parseInt(offsetValue as string);
    if(isNaN(offset) || offset < 0){
        return 0;
    }
    return offset;
}

export function getLimit(defaultValue: number, limitValue?: string): number {
    const limit = Number.parseInt(limitValue as string);
    if(isNaN(limit) || limit <= 0){
        return defaultValue;
    }
    return limit;
}