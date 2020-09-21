const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: "root",
  password: "chinna",
  database: "timer_app",
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
