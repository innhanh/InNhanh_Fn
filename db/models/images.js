'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Productions, { foreignKey: "idImage" });
      this.hasOne(models.Partners, { foreignKey: "idImage" });
      this.hasOne(models.Companys, { foreignKey: "logo" });
      this.hasOne(models.Users, {foreignKey:"avatar"});
    }
  }
  Images.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    type: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};