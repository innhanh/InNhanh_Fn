'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Categorys, { foreignKey: "idCategory" });
      this.hasMany(models.Texts, { foreignKey: "idPage" });
    }
  }
  Pages.init({
    name: DataTypes.STRING,
    href: DataTypes.STRING,
    idCategory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pages',
  });
  return Pages;
};