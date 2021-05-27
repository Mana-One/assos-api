import { AppErrors, Either, Result } from "../../../../core/logic";
import { DonatorErrors } from "../errors";

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.CardNotFound |
    Result<any>,

    Result<void>
>;