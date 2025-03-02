import Group from '@db/models/common/group';
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

    async upsert(user: User){
        const memberGroup = await Group.findOne({where: { name: "Member" }});
        return User.findOne({ where: { name: user.name }})
        .then(async function(obj: User | null) {
            if(obj)
            {
                await user.save();
            } else {             
                if(memberGroup)
                    user.groupId = memberGroup.id;
                await User.create(user);
            }
            
            const returnVal = await User.findOne({ where: { name: user.name}});
            console.log("Value: " + JSON.stringify(returnVal));
            return returnVal;
        })
    }
}