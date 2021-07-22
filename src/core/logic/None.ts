export type None = null | undefined;

export function isNone(value: any): value is None {
    return value === undefined ||value === null;
}