import { AppErrors, Either, Result } from "../../../../core/logic";
import { Donator } from "../../domain";
import { DonatorErrors } from "../errors";

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.AccountAlreadyExists |
    Result<any>,
    Result<Donator>
>;