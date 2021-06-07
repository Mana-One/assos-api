import { sign, verify } from "jsonwebtoken";
import { AppConfig } from "../../../config";
import { AccessToken, TokenPayload } from "../../domain";
import { Authentication } from "../../services";


export namespace JWTAuthentication  {
    export const createToken: Authentication.CreateToken = async (payload: TokenPayload): Promise<AccessToken> => {
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

    export const verifyAndRetrievePayload: Authentication.VerifyAndRetrievePayload = async (token: AccessToken): Promise<TokenPayload> => {
        return new Promise<TokenPayload>((resolve, reject) => {
            verify(token, AppConfig.SECRET_KEY, {}, (err, result) => {
                if(err){
                    return reject(err);
                }

                if(Authentication.isTokenPayload(result)){                    
                    return resolve(result)
                }
                return reject(new Error("Invalid payload"));
            });
        });
    }    
}