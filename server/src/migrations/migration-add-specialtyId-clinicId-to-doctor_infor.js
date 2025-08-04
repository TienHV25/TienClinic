'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.addColumn('Doctor_infor', 'specialtyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
  });

  await queryInterface.addColumn('Doctor_infor', 'clinicId', {
      type: Sequelize.INTEGER,
      allowNull: true,
  });
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.removeColumn('Doctor_infor', 'specialtyId');
   await queryInterface.removeColumn('Doctor_infor', 'clinicId');
  }
};
