const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const Sequelize = require("./util/database");
//importing routes
const TaskRoutes = require("./routes/task");

//importing models

const app = express();

app.use(cors());
app.use(bodyParser.json());

//routes
app.use(TaskRoutes);

app.use((error, req, res, next) => {
  if (!error.field) {
    return res.status(400).json({
      error: error.message,
    });
  } else {
    return res.status(error.status).json({
      message: error.message,
      field: error.field,
    });
  }
});

Sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("listening at http://localhost:3000");
    });
  })
  .catch((err) => console.log(err));
