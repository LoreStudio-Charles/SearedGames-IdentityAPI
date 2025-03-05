import { Request, Response } from'express';
import AuthMiddleware from '@middleware/auth.middleware';
import SessionController from '@controllers/common/games/session.controller';
import GroupRoles from 'src/types/group.role';

const express = require('express');
const router = express.Router();
const session_controller = new SessionController();
const auth_middleware = new AuthMiddleware();


router.get('/list/:gameId', auth_middleware.verifyRole(GroupRoles.member), async(req: Request, res: Response) => {
    try {        
        const gameId = req.params.gameId;
        const sessionsForGame = await session_controller.listByGame(gameId);
        res.send(sessionsForGame);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.get('/list-all/:gameId', auth_middleware.verifyRole(GroupRoles.admin), async(req: Request, res: Response) => {
    try {        
        const gameId = req.params.gameId;
        const sessionsForGame = await session_controller.listByGame(gameId, true);
        res.send(sessionsForGame);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/search', auth_middleware.verifyRole(GroupRoles.member), async(req: Request, res: Response) => {
    try {        
        const query : SessionSearchQuery = req.body.query;
        if(!query.gameId)
            res.status(400).send("Must provide a game id.");
        const sessionsForGame = await session_controller.searchForSessions(query);

        res.send(sessionsForGame);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/', auth_middleware.verifyRole(GroupRoles.member), async(req: Request, res: Response) => {
    const user_id = req.headers.user_id;    
    try{
        const session = {...req.body.session, hostingPlayerId: user_id};
        console.log(`Session: ${session}`);

        const result = await session_controller.upsert(session);

        res.send(result);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.delete('/:id', auth_middleware.verifyRole(GroupRoles.member), async(req: Request, res: Response) => {
    try {        
        const id = req.params.id;
        const sessionsForGame = await session_controller.destroy(id);
        res.send(sessionsForGame);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

export default  router;