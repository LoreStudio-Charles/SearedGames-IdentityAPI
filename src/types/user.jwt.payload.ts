import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
    export interface UserJwtPayload extends jwt.JwtPayload {
        name: string
    }
}