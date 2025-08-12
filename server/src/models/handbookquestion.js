'use strict';
module.exports = (sequelize, DataTypes) => {
  const HandbookQuestion = sequelize.define('HandbookQuestion', {
    testId: DataTypes.INTEGER,
    questionText: DataTypes.TEXT
  }, {});

  HandbookQuestion.associate = function(models) {
    HandbookQuestion.belongsTo(models.HandbookTest, {
      foreignKey: 'testId',
      as: 'test'
    });
    HandbookQuestion.hasMany(models.HandbookOption, {
      foreignKey: 'questionId',
      as: 'options'
    });
  };

  return HandbookQuestion;
};
