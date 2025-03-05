'use strict';

const { DataTypes } = require('sequelize');

const sessionTable = { schema: 'common', tableName: 'Sessions' }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(sessionTable, 
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      gameId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Games', key: 'id' }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      hostingPlayerId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' }
      },
      sessionAccessLevel: {
        type: Sequelize.STRING
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      isPasswordProtected: {
        type: Sequelize.BOOLEAN
      },
      maxPlayerCount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },  

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable(sessionTable);
  }
};
