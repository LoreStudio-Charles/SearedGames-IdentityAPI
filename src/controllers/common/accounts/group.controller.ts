import Group from '@db/models/common/group'
import User from '@db/models/common/user';
import UserController from './auth.controller';



export default class GroupController {
    list() {
        return Group.findAll();
    }

    getByName(name: string) {
        return Group.findOne({ where: { name }});
    }

    getById(id: string) {
        return Group.findOne({where: { id }});
    }

    upsert(group: Group){
        return Group.findOne({ where: { name: group.name }})
        .then(async function(obj: Group | null) {
            if(obj)
            {
                await Group.update(
                    group,
                    {
                        where: {
                            id: obj.id
                        }
                    }
                );                
            } else {
                console.log(group);
                await Group.create(group);
            }
            
            return await Group.findOne({ where: { name: group.name}});
        })
    }

    async addMember(group_id: string, user_id: string) {
        try {
            return User.findOne({ where: { id: user_id }})
            .then(async function(user: User | null) {
                if(user)
                {
                    Group.findOne({ where: { id: group_id }})
                    .then(async function(group:Group | null) {
                        if(group)
                        {
                            user.groupId = group.id;
                            await user.save();
                        }                 
                    });
                } 
                
                return await User.findOne({ where: { name: user?.name}});
            });
        } catch(error) {
            console.log(error);
            return null;
        }

    }
}