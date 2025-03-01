import User from '@db/models/common/user.js'



export default class UserController {
    list() {
        return User.findAll();
    }

    getByName(name: string) {
        return User.findOne({ where: { name }});
    }

    getById(id: string) {
        return User.findOne({where: { id }});
    }

    upsert(user: User){
        return User.findOne({ where: { name: user.name }})
        .then(async function(obj: User | null) {
            if(obj)
            {
                await User.update(
                    user,
                    {
                        where: {
                            id: obj.id
                        }
                    }
                );                
            } else {                        
                await User.create(user);
            }
            
            return await User.findOne({ where: { name: user.name}});
        })
    }
}