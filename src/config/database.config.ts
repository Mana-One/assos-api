import { config } from "dotenv";
import { get } from "env-var";
config();

export namespace DatabaseConfig {
    export const DIALECT: string = get("DB_DIALECT").required().asString();
    export const HOST: string = get("DB_HOST").required().asString();
    export const NAME: string = get("DB_NAME").required().asString();
    export const USER: string = get("DB_USER").required().asString();
    export const PASSWORD: string = get("DB_PASSWORD").required().asString();
    export const PORT: number = get("DB_PORT").required().asIntPositive();
}