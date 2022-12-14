'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Images, { foreignKey: "avatar" });
      this.hasOne(models.RefreshTokens, { foreignKey: "idUser" });
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    pass: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};