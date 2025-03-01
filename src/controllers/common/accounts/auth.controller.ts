import RefreshToken from '@db/models/common/refresh_tokens';
import User from '@db/models/common/user'
import * as argon2 from 'argon2';
import jwt, { UserJwtPayload } from 'jsonwebtoken';



export default class UserController {
    failed_login_result = {
        "success": false,
        "status": "Login failed. Access Denied.",
        "access_token": "",
        "refresh_token": ""
    }
    async password_login(id: string, password: string) {

        const user = await User.findOne({where: {name: id}});
        const hash = user?.password_hash as string;

        if(user == null)
            return this.failed_login_result;
        try {
            if(await this.login(hash, password)) {            
                const token_payload = {
                    username: user?.name
                }

                const access_token = jwt.sign(token_payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '720s' }); 

                const refresh_token = (await this.save_refresh_token(
                    user?.id as string, 
                    jwt.sign(token_payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '120d' })
                )).token;

                return {
                    "success": true,
                    "status": "Login successful.",
                    "access_token": access_token,
                    "refresh_token": refresh_token
                };
            } else {
                return this.failed_login_result;
            }
        } catch(error) {
            console.log(error);
            return this.failed_login_result;
        }
    }
    
    async login(hash: string, password: string) : Promise<boolean> {
        if(await argon2.verify(hash, password)) {
            return true;
        }
        return false;
    }

    async save_refresh_token(uid: string, token: string) {
        console.log({uid, token});
        const refresh_token = await RefreshToken.findOne({where: { uid }})
        if(refresh_token)
        {
            return refresh_token;
        }
        return await RefreshToken.create({ uid, token });
    }

    async check_refresh_token(token: string) {
        const refresh_token = await RefreshToken.findOne({where: { token }});
        if(refresh_token)
            return true;
        else return false;
    }

    async logout(token: string) {
        const refresh_token = await RefreshToken.findOne({where: { token }});
        if(refresh_token)
        {
            await RefreshToken.destroy({where: { token }});
            return true;
        } else return false;
    }
}