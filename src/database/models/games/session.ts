import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model, NonAttribute, DataTypes } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';
import Game from './game';
import User from '../common/user';

const seared_writer = new SearedDatabase();

class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    declare id: CreationOptional<string>;

    declare Game: NonAttribute<Game>;

    declare gameId: string;

    declare sessionAccessLevel: string;
    
    declare name: string;

    declare description: string;

    declare hostingPlayerId: string;

    declare ipAddress: string;

    declare tags: Array<string>;

    declare isPasswordProtected: boolean;

    declare maxPlayerCount: number;
}



Session.init(
{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    gameId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: { model: 'Games', key: 'id' }
    },
    sessionAccessLevel: {
        type: Sequelize.STRING,
        allowNull: false,        
        values: ['solo', 'private', 'friends', 'public']
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
        allowNull: false
    },
    hostingPlayerId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: { model: 'Users', key: 'id' }
    },
    ipAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    isPasswordProtected: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    maxPlayerCount: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common'
});

Session.belongsTo(Game, { foreignKey: 'gameId' });
Session.belongsTo(User, { foreignKey: 'hostingPlayerId' })

export default Session;