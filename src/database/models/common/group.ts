import Sequelize, { Association, CreationOptional, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';
import User from './user';
import GroupRole from './group_role';
import Role from './role';

const seared_writer = new SearedDatabase();

class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
    declare description: string;
    declare id: CreationOptional<string>;
    declare name: string;
    declare iconImageUrl: string;
    declare Roles: NonAttribute<Array<Role>>;
}

Group.init(
{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255]
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    iconImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: './images/icons/default.jpg',
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common'
});

Group.belongsToMany(Role, {through: GroupRole, foreignKey: 'groupId'});

export default Group;