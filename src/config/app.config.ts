import { config } from "dotenv";
import { get } from "env-var";
config();

export namespace AppConfig {
    export const PORT: number = get("PORT").default(3000).asIntPositive();
    export const API_DOMAIN: string = get("API_DOMAIN").required().asString();
    export const SECRET_KEY: string = get("SECRET_KEY").required().asString();
    export const UPLOAD_PATH: string = get("UPLOAD_PATH").required().asString();
}