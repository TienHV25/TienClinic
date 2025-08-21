'use strict';

module.exports = function (sequelize, DataTypes) {
  var HandbookOption = sequelize.define('HandbookOption', {
    questionId: DataTypes.INTEGER,
    optionText: DataTypes.TEXT,
    score: DataTypes.INTEGER
  }, {});
  HandbookOption.associate = function (models) {
    HandbookOption.belongsTo(models.HandbookQuestion, {
      foreignKey: 'questionId',
      as: 'question'
    });
  };
  return HandbookOption;
};