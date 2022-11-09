'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeWorks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Companys, {foreignKey:"idCompany"});
    }
  }
  TimeWorks.init({
    week: DataTypes.STRING,
    morning: DataTypes.STRING,
    afternoon: DataTypes.STRING,
    idCompany: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TimeWorks',
  });
  return TimeWorks;
};