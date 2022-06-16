require("dotenv").config();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sequelize = new Sequelize("todo-list", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.work_list = require("./work-data.model.js")(sequelize, Sequelize);

module.exports = {
  db,
  Op,
  sequelize,
};
