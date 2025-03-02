import { Request, Response } from'express';
import * as argon2 from 'argon2';
import AuthMiddleware from '@middleware/auth.middleware';
import UserController from '@controllers/common/accounts/user.controller';
import RefreshToken from '@db/models/common/refresh_tokens';
import GroupRoles from 'src/types/group.role';

const express = require('express');
const router = express.Router();
const user_controller = new UserController();
const auth_middleware = new AuthMiddleware();

router.get('/list', auth_middleware.verifyRole(GroupRoles.admin), async(req: Request, res: Response) => {
    try {
        const users = await user_controller.list();
        res.send(users);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.get('/:id', auth_middleware.verifyRole(GroupRoles.admin), async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await user_controller.getById(id);
        res.send(user);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/', async(req: Request, res: Response) => {    
    try{
        const user = req.body.user;
        user.password_hash = await argon2.hash(user.password);
        delete user.password;
        
        console.log("Upserting User.");
        const result = await user_controller.upsert(user);
        console.log(result);

        res.send(result);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/ban', auth_middleware.verifyRole(GroupRoles.admin), async(req: Request, res: Response) => {
    try {
        const uid = req.body.uid;
        const ban_status = req.body.ban_status;
        const user = await user_controller.getById(uid);

        if(user)
        {
            user.banned = ban_status;
        
            console.log(`User: ${user.name} has has banned status set to ${ban_status}`);
            if(ban_status)
            {
                const refresh_token = await RefreshToken.findOne({where: { uid }});
                if(refresh_token)
                    await RefreshToken.destroy({where: { token: refresh_token?.token }});
            }
            
            await user_controller.upsert(user);
            res.status(200).send("Ban status successfully updated.");
            return;
        }
        res.status(404).send("An error has occurred. If this error persists, please contact support.");
        return;

    } catch(error) {
        console.log(error);
        res.status(500).send("An error has occurred. If this error persists, please contact support.");
    }
});

export default  router;
