import { sign, verify } from "jsonwebtoken";
import { AppConfig } from "../../../config";
import { AccessToken, TokenPayload } from "../../domain";
import { Authentication, isTokenPayload } from "../Authentication";


export class JWTAuthentication implements Authentication {
    async createToken(payload: TokenPayload): Promise<AccessToken> {
        return new Promise<AccessToken>((resolve, reject) => {
            return sign(
                payload, 
                AppConfig.SECRET_KEY, 
                { expiresIn: "1d" }, 
                (err, result) => {
                    if(err){
                        return reject(err);
                    }

                    if(result === undefined){
                        return reject(new Error("Could not create token"));
                    }

                    return resolve(result);
                }
            );   
        });
    }

    async verifyAndRetrievePayload(token: AccessToken): Promise<TokenPayload> {
        return new Promise<TokenPayload>((resolve, reject) => {
            verify(token, AppConfig.SECRET_KEY, {}, (err, result) => {
                if(err){
                    return reject(err);
                }

                if(isTokenPayload(result)){                    
                    return resolve(result)
                }
                return reject(new Error("Invalid payload"));
            })
        });
    }    
}