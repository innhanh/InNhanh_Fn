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

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     // const model = require(__dirname + '/../db/models/' + file)(sequelize, Sequelize.DataTypes);
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });


db.Categorys = Categorys(sequelize, Sequelize);
db.Images = Images(sequelize, Sequelize);
db.Users = Users(sequelize, Sequelize);
db.Companys = Companys(sequelize, Sequelize);
db.Branchs = Branchs(sequelize, Sequelize);
db.Pages = Pages(sequelize, Sequelize);
db.Productions = Productions(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


