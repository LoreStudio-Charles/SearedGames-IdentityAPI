'use strict';

const table = { schema: 'common', tableName: 'Games' }
const nowUtc = new Date().toUTCString();
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      id: uuidv4(),
      name: 'Virtue',
      publisher: "Seared Games",
      description: `Virtue is a game of heroic adventure, sacrifice, and loss. To win, sometimes you must lose it all.`,
      status: "development",
      createdAt: nowUtc,
      updatedAt: nowUtc
    }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(table, null, {});
  }
};
