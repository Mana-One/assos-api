export interface Repo<T> {
    exists(entity: T): Promise<boolean>;
    save(entity: T): Promise<T>;
}