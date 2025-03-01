import Sequelize, { Association, CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';
import Group from './group';

const seared_writer = new SearedDatabase();

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare description: string;
}

Role.init(
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
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common'
});

export default Role;