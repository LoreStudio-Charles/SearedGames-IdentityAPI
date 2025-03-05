'use strict';

const table = { schema: 'common', tableName: 'Games' }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(table, 
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      iconImageUrl: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      publisher: {
          type: Sequelize.STRING,
          allowNull: false
      },
      status: {
          type: Sequelize.ENUM,
          values: ['development', 'active', 'maintenance', 'discontinued']
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
     await queryInterface.dropTable(table);
  }
};
