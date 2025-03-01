import * as argon2 from 'argon2';

import { Request, Response } from'express';
import jwt, { UserJwtPayload } from 'jsonwebtoken';
import AuthController from '@controllers/common/accounts/auth.controller';
import User from '@db/models/common/user';
import RefreshToken from '@db/models/common/refresh_tokens';

const express = require('express');
const router = express.Router();
const auth_controller = new AuthController();

router.post('/login', async(req: Request, res: Response) => {
    
    const {type: auth_type, id, token} = req.body;
    let result = auth_controller.failed_login_result;

    switch(auth_type) {
        case "password":
            result = await auth_controller.password_login(id, token);
    }

    if(result.success)
        res.send(result);
    else
        res.status(403).send(result);
});

router.post('/token', async(req: Request, res: Response) => {
    const refresh_token = req.body.token;
    const type = req.body.type;
    
    if(refresh_token == null)
        return res.status(403).send("Access denied.");

    const token_result = await auth_controller.check_refresh_token(refresh_token);
    console.log(`Token Result: ${token_result}`);

    if(!token_result)
        return res.status(403).send("Access denied.");
    
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string, {}, (error, jwt_payload) => {
        const user = jwt_payload as UserJwtPayload;
        if(error) {
            return res.status(403).send("Access denied.");
        }
        const token_payload = {
            username: user?.username
        }
        const access_token = jwt.sign(token_payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '120s' }); 
        res.json({
            "status": "Login successful.",
            "access_token": access_token
        })
    })
    
});

router.post('/logout', async(req: Request, res: Response) => {
    try {
        const refresh_token = req.body.token;
    
        if(refresh_token == null)
            return res.status(403).send("No token provided.");

        if(await auth_controller.logout(refresh_token))
            res.status(204).send("Logout successful.");
        else
            res.status(404).send("Logout failed.")
    } catch(error) {
        console.log(error);
        res.status(403).send("Access denied.");
    }
});

export default  router;
