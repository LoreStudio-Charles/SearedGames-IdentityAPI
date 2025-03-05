import Game from '@db/models/games/game';

export default class GameController {
    list() {
        return Game.findAll();
    }

    getByName(name: string) {
        return Game.findOne({ where: { name }});
    }

    getById(id: string) {
        return Game.findOne({where: { id }});
    }

    upsert(game: Game){
        return Game.findOne({ where: { name: game.name }})
        .then(async function(obj: Game | null) {
            if(obj)
            {
                await Game.update(
                    game,
                    {
                        where: {
                            id: obj.id
                        }
                    }
                );                
            } else {                        
                await Game.create(game);
            }
            
            return await Game.findOne({ where: { name: game.name}});
        })
    }
}