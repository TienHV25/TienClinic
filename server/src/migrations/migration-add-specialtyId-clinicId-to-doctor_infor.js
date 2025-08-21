'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.addColumn('doctor_infor', 'specialtyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
  });

  await queryInterface.addColumn('doctor_infor', 'clinicId', {
      type: Sequelize.INTEGER,
      allowNull: true,
  });
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.removeColumn('doctor_infor', 'specialtyId');
   await queryInterface.removeColumn('doctor_infor', 'clinicId');
  }
};
