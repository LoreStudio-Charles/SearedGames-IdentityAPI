import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import SearedDatabase from '@db/seared_database.js';

const seared_writer = new SearedDatabase();

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
    declare token: string;
    declare uid: string;
}

RefreshToken.init({
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uid: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: seared_writer.instance,
    schema: 'common'
});

export default RefreshToken;