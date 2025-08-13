'use strict';
module.exports = (sequelize, DataTypes) => {
  const HandbookTest = sequelize.define('HandbookTest', {
    title: DataTypes.STRING,
    evaluationName: DataTypes.TEXT
  }, {});

  HandbookTest.associate = function(models) {
    HandbookTest.hasMany(models.HandbookQuestion, {
      foreignKey: 'testId',
      as: 'questions'
    });
  };

  return HandbookTest;
};
