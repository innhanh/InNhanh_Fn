'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Categorys = require("./categorys");
const Images = require("./images");
const Users = require("./users");
const Companys = require("./companys");
const Branchs = require("./branchs");
const Pages = require("./pages");
const Productions = require("./productions");
const Partners = require("./partners");
const Maintenances = require("./maintenances");
const TimeWorks = require("./timeworks");
const Texts = require("./texts");
const RefreshTokens = require("./refreshtokens");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.Categorys = Categorys(sequelize, Sequelize);
db.Images = Images(sequelize, Sequelize);
db.Users = Users(sequelize, Sequelize);
db.Companys = Companys(sequelize, Sequelize);
db.Branchs = Branchs(sequelize, Sequelize);
db.Pages = Pages(sequelize, Sequelize);
db.Productions = Productions(sequelize, Sequelize);
db.Partners = Partners(sequelize, Sequelize);
db.Maintenances = Maintenances(sequelize, Sequelize);
db.TimeWorks = TimeWorks(sequelize, Sequelize);
db.Texts = Texts(sequelize, Sequelize);
db.RefreshTokens = RefreshTokens(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


