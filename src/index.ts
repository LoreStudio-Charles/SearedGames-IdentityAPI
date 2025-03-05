import express from'express';
import dotenv from 'dotenv';

import AuthRouter from '@routers/common/accounts/auth.routes';
import GameRouter from '@routers/common/games/game.routes';
import UserRouter from '@routers/common/accounts/user.routes';
import GroupRouter from '@routers/common/accounts/group.routes';
import SessionRouter from '@routers/common/games/session.routes';
import Relationships from '@db/relationships';
import AbilityCost from './types/system/ability.cost';
import { AbilityResources } from './types/system/ability.resource';
import AbilityUnits from './types/system/ability.units';

dotenv.config();

const app = express();
const port = process.env.PORT;


const relationships = new Relationships();
relationships.init();

app.use(express.json());

app.use('/game', GameRouter);
app.use('/user', UserRouter);
app.use('/group', GroupRouter);
app.use('/auth', AuthRouter);
app.use('/session', SessionRouter);

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`)
});
