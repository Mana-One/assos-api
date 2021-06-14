export namespace DonatorRepo {
    export interface Exists {
        (donatorId: string): Promise<boolean>;
    }
}