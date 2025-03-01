import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';

const seared_writer = new SearedDatabase();

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare id: CreationOptional<string>;
    
    declare name: string;

    declare description: string;

    declare publisher: string;

    declare status: string;
}

Game.init(
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
    publisher: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255]
        }
    },
    status: {
        type: Sequelize.ENUM,
        values: ['development', 'active', 'maintenance', 'discontinued']
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common'
});

export default Game;