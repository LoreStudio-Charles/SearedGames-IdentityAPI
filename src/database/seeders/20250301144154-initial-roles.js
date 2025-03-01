'use strict';
const { v4: uuidv4 } = require('uuid');
const nowUtc = new Date().toUTCString();

const table = { schema: 'common', tableName: 'Roles' }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
    await queryInterface.bulkInsert(table, [
      {
        id: uuidv4(),
        name: "Admin",
        description: "An administrator of the Seared Games library.",
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        name: "Developer",
        description: "A developer of Seared Games.",
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        name: "Moderator",
        description: "A moderator of the Seared Games community.",
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        name: "Subscriber",
        description: "A member who has an active subscription to all Seared Games services.",
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        name: "Member",
        description: "A member of the Seared Games community. Access to individual games is dependent upon purchase of that game.",
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  }
};
