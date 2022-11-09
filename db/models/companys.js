'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Branchs, { foreignKey: "idCompany" });
      this.belongsTo(models.Images, { foreignKey: "logo" });
      this.hasOne(models.TimeWorks, {foreignKey:"idCompany"});
    }
  }
  Companys.init({
    name: DataTypes.STRING,
    website: DataTypes.STRING,   
    logo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Companys',
  });
  return Companys;
};