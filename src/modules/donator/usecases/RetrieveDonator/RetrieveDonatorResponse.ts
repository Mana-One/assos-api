import { AppErrors, Either, Result } from "../../../../core/logic";
import { DonatorErrors } from "../errors";

export interface DonatorDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type Response = Either<
    AppErrors.UnexpectedError |
    DonatorErrors.DonatorNotFound |
    Result<any>,
    Result<DonatorDto>
>;