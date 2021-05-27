import { AppErrors, Either, Result } from "../../../../core/logic";
import { DonatorErrors } from "../errors";

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.DonatorNotFound,
    Result<void>
>;