'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Events', 
    [{
      title: 'Luncheon',
      start: new Date(2022,1,20),
      end: new Date(2022,1,22),
      allDay: true,
      color: 'red',
      backgroundColor: 'blue',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    title: 'Football Match',
    start: new Date(2022,1,25,3,24,0),
    end: new Date(2022,1,25,12,29,59),
    allDay: false,
    color: '#77248c',
    backgroundColor: '#32a852',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Events', null, {});
  }
};