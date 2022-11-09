'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Texts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Pages, {foreignKey:"idPage"});
    }
  }
  Texts.init({
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    idPage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Texts',
  });
  return Texts;
};