const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Task = sequelize.define("Task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  task: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startedAt: {
    type: "DATETIME",
    allowNull: false,
  },
  endedAt: {
    type: "DATETIME",
    allowNull: false,
  },
});

module.exports = Task;
