'use strict';
const { v4: uuidv4 } = require('uuid');
const nowUtc = new Date().toUTCString();

const table = { schema: 'common', tableName: 'GroupRoles' }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Group IDs  
    const [ adminGroup ] = await queryInterface.sequelize.query('SELECT ID from common."Groups" where name = :name', {replacements: { name: 'Administrator'}, type: queryInterface.sequelize.QueryTypes.SELECT})
    const [ memberGroup ] = await queryInterface.sequelize.query('SELECT ID from common."Groups" where name = :name', {replacements: { name: 'Member'}, type: queryInterface.sequelize.QueryTypes.SELECT})

    console.log(adminGroup)
    // Role IDs  
    const [ adminRole ] = await queryInterface.sequelize.query('SELECT ID from common."Roles" where name = :name', {replacements: { name: 'Admin'}, type: queryInterface.sequelize.QueryTypes.SELECT})
    const [ developerRole ]  = await queryInterface.sequelize.query('SELECT ID from common."Roles" where name = :name', {replacements: { name: 'Developer'}, type: queryInterface.sequelize.QueryTypes.SELECT})
    const [ moderatornRole ]  = await queryInterface.sequelize.query('SELECT ID from common."Roles" where name = :name', {replacements: { name: 'Moderator'}, type: queryInterface.sequelize.QueryTypes.SELECT})
    const [ subscriberRole ] = await queryInterface.sequelize.query('SELECT ID from common."Roles" where name = :name', {replacements: { name: 'Subscriber'}, type: queryInterface.sequelize.QueryTypes.SELECT})
    const [ memberRole ] = await queryInterface.sequelize.query('SELECT ID from common."Roles" where name = :name', {replacements: { name: 'Member'}, type: queryInterface.sequelize.QueryTypes.SELECT})

    


    await queryInterface.bulkInsert(table, [
      {
        id: uuidv4(),
        groupId: adminGroup.id,
        roleId: adminRole.id,
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        groupId: adminGroup.id,
        roleId: developerRole.id,
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        groupId: adminGroup.id,
        roleId: moderatornRole.id,
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        groupId: adminGroup.id,
        roleId: subscriberRole.id,
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        groupId: adminGroup.id,
        roleId: memberRole.id,
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
      {
        id: uuidv4(),
        groupId: memberGroup.id,
        roleId: memberRole.id,
        createdAt: nowUtc,
        updatedAt: nowUtc
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  }
};
