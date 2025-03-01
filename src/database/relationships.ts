import Group from "./models/common/group";
import GroupRole from "./models/common/group_role";
import Role from "./models/common/role";
import User from "./models/common/user";

export default class Relationships {
    init() {
        // Common schema relationships
        User.belongsTo(Group, { foreignKey: 'groupId' });
        Group.hasMany(User, { foreignKey: 'groupId' });
        Group.belongsToMany(Role, {through: GroupRole, foreignKey: 'groupId' });
        Role.belongsToMany(Group, {through: GroupRole, foreignKey: 'roleId' });
    }
}