import Sequelize, { Association, CreationOptional, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';
import Group from './group';
import { AsyncResource } from 'async_hooks';

const seared_writer = new SearedDatabase();

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare iconImageUrl: string;
    declare email: string;
    declare password_hash: string;
    declare isBanned: boolean;
    declare Group: NonAttribute<Group>;
    declare groupId: NonAttribute<string>;
}

User.init(
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
    iconImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: './images/icons/default.jpg',
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isBanned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common',
});

User.belongsTo(Group, { foreignKey: 'groupId' });

export default User;