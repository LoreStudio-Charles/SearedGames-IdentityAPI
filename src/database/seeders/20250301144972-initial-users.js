'use strict';
const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2');
const dotenv = require('dotenv');

const table = { schema: 'common', tableName: 'Users' }
const nowUtc = new Date().toUTCString();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {    
  const [ adminGroup ] = await queryInterface.sequelize.query('SELECT ID from common."Groups" where name = :name', {replacements: { name: 'Administrator'}, type: queryInterface.sequelize.QueryTypes.SELECT})

  
  const initial_users = JSON.parse(process.env.INITIAL_USERS);
  console.log(initial_users);
  for(let o of initial_users){
    o.id = uuidv4()
    o.createdAt = nowUtc;
    o.updatedAt = nowUtc;
    o.groupId = adminGroup.id
    o.password_hash = await argon2.hash(o.password);
    delete o.password;
  }

  console.log(initial_users);

  return await queryInterface.bulkInsert(table, initial_users)
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table, null, {});
  }
};
