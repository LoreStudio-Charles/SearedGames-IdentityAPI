import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';

const seared_writer = new SearedDatabase();

class GroupRole extends Model<InferAttributes<GroupRole>, InferCreationAttributes<GroupRole>> {
    declare id: CreationOptional<string>;
}

GroupRole.init(
{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common'
});


export default GroupRole;