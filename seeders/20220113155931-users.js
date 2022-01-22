'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users',
      [{
          userName: 'SimplyZacc',
          password: getHashedPass("Test@123"),
          email: 'zacariewalkes@hotmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userName: 'SimplyZac',
          password: getHashedPass("Test@123"),
          email: 'zacx12@hotmail.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

function getHashedPass(pass){
  const salt = bcrypt.genSaltSync(10);
  return(bcrypt.hashSync(pass, salt));
}