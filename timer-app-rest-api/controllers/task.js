const Task = require("../models/task");

exports.addTask = (req, res, next) => {
  const task = req.body.task;
  const startedAt = req.body.startedAt;
  const endedAt = req.body.endedAt;
  console.log(req.body);
  Task.create({
    task: task,
    startedAt: new Date(startedAt),
    endedAt: new Date(endedAt),
  })
    .then((data) => {
      res.status(200).json({
        message: "Successfully Created",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTasks = (req, res, next) => {
  Task.findAll({
    order: [["startedAt", "DESC"]],
  })
    .then((tasks) => {
      res.status(200).json({
        tasks: tasks.map((task) => {
          return {
            task: task.task,
            startedAt: task.startedAt,
            endedAt: task.endedAt,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
