import { AppErrors, Either, Result } from "../../../../core/logic";

export interface CardDto {
    readonly id: string;
    readonly last4: string;
    readonly storeReference: string;
}

export interface WalletDto {
    readonly cards: CardDto[];
}

export type Response = Either<
    AppErrors.UnexpectedError,
    Result<WalletDto>
>;