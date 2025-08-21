'use strict';

module.exports = function (sequelize, DataTypes) {
  var HandbookTest = sequelize.define('HandbookTest', {
    title: DataTypes.STRING,
    evaluationName: DataTypes.TEXT
  }, {});
  HandbookTest.associate = function (models) {
    HandbookTest.hasMany(models.HandbookQuestion, {
      foreignKey: 'testId',
      as: 'questions'
    });
  };
  return HandbookTest;
};