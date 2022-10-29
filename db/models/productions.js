'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productions.belongsTo(models.Images, { foreignKey: "idImage" })
    }
  }
  Productions.init({
    name: DataTypes.STRING,
    idImage: DataTypes.INTEGER,
    size: DataTypes.STRING,
    quantitative: DataTypes.STRING,
    typePaper: DataTypes.STRING,
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Productions',
  });
  return Productions;
};