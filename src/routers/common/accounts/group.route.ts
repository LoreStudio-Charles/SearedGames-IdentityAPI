import { Request, Response } from'express';
import AuthMiddleware from '@middleware/auth.middleware';
import GroupController from '@controllers/common/accounts/group.controller';

const express = require('express');
const router = express.Router();
const group_controller = new GroupController();
const auth_middleware = new AuthMiddleware();

router.get('/list', auth_middleware.verifyRole, async(req: Request, res: Response) => {
    try {
        const users = await group_controller.list();
        res.send(users);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.get('/:id', auth_middleware.verifyRole, async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await group_controller.getById(id);
        res.send(user);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/', async(req: Request, res: Response) => {    
    try{
        const group = req.body.group;
        
        console.log("Upserting group.");
        const result = await group_controller.upsert(group);
        res.send(result);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/join', async(req: Request, res: Response) => {
    try {
        const user_id = req.body.uid;
        const group_id = req.body.gid;
        const result = await group_controller.addMember(group_id, user_id);
        console.log(result);
        if(!result)
            res.status(404).send("And error has occurred.")
        else
            res.send(result);
    } catch(error) {
        res.status(400).send("An error has occurred.")
    }
});

export default  router;
