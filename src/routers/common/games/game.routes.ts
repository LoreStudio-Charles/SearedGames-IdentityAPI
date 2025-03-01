import { Request, Response } from'express';
import GameController from '@controllers/common/games/game.controller';

const express = require('express');
const router = express.Router();
const game_controller = new GameController();

router.get('/list', async(req: Request, res: Response) => {
    try {
        const games = await game_controller.list();
        res.send(games);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.post('/', async(req: Request, res: Response) => {
    try{
        const game = req.body.game;        
        const result = await game_controller.upsert(game);

        res.send(result);
    } catch(error) {
        console.log(error);
        res.status(404).send(error);
    }
});

export default  router;
