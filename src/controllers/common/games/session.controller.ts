import Session from '@db/models/games/session';

export default class SessionController {
    listByGame(gameId: string, showAll: boolean = false) {
        if(showAll)
            return Session.findAll({ where: { gameId: gameId }});
        
        return Session.findAll({ where: { gameId: gameId }})
            .then(sessions => {
                return sessions.filter(s=> {
                    return this.isVisibleToUser(s);
                })
            });
    }

    async searchForSessions(query: SessionSearchQuery){
        return this.listByGame(query.gameId).then(sessions => {
            return sessions.filter(s => {
                if(query.name)
                    return s.name.toLowerCase().includes(query.name.toLowerCase());
                return true;
            }).filter(s => {
                if(query.sessionAccessLevel)
                    return s.sessionAccessLevel == query.sessionAccessLevel;
                return true;
            }).filter(s => {
                if(query.isPasswordProtected)
                    return s.isPasswordProtected == query.isPasswordProtected;
                return true;
            }).filter(s => {
                if(query.maxPlayerCount)
                    return s.maxPlayerCount > query.maxPlayerCount;
                return true;
            }).filter(s => {
                if(query.tags)
                    return query.tags.every(t => { 
                        if(!s.tags || s.tags.length == 0) return false;
                        return s.tags.includes(t);
                    });
                return true
            })
        });
    }

    getByName(name: string) {
        return Session.findOne({ where: { name }});
    }

    getById(id: string) {
        return Session.findOne({where: { id }});
    }

    upsert(session: Session){
        return Session.findOne({ where: { name: session.name }})
        .then(async function(obj: Session | null) {
            if(obj)
            {
                await session.save();                
            } else {                        
                await Session.create(session);
            }
            
            return await Session.findOne({ where: { name: session.name}});
        })
    }

    destroy(id: string) {
        Session.findOne({where: { id }})
        .then(async function(session: Session | null){
            if(session)
            {
                await session.destroy();
            }
        });
    }

    private isVisibleToUser(session: Session) {
        const isPublic = session.sessionAccessLevel === 'public';
        console.log(`Is Public? ${isPublic}`);
        return isPublic || this.isFriendHostedSession(session);
    }

    
    // TODO: Users need to have a relationship to other users. 
    // We will query to see if the owner of the session is a 
    // is a friend of the player, and if so show the session.
    // For now everyone is super friendly...
    private isFriendHostedSession(session: Session)
    {
        return session.sessionAccessLevel === 'friends'; // For now assume everyone is friends?
    }

}