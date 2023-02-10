import responseHandler from "../handlers/response.handler.js";
import taskModel from "../models/task.model.js";

const createTask = async (req, res) => {
  try {
    const {
      teamId,
      taskName,
      status,
      statusColor,
      startDate,
      dueDate,
      description,
      assigneeId,
      priority,
      tags,
    } = req.body;

    const { id } = req.user;

    const task = new taskModel({
      manager: id,
      team: teamId,
      taskName,
      status,
      statusColor,
      startDate,
      dueDate,
      description,
      assignee: assigneeId,
      priority,
      tags,
    });

    await task.save();

    responseHandler.created(res, {
      ...task._doc,
      id: task.id,
    });
  } catch (err) {
    console.log(err.message);
    responseHandler.error(res);
  }
};

const getTasks = async (req, res) => {
  try {
    const { id, designation, manager } = req.user;

    var tasks;
    if (designation === "MANAGER") {
      tasks = await taskModel.find({ manager: id });
    } else if (designation === "MEMBER") {
      tasks = await taskModel.find({ manager: manager });
    }
    if (!tasks) return responseHandler.notfound(res);

    return responseHandler.ok(res, tasks);
  } catch (err) {
    console.log(err.message);
    responseHandler.error(res);
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.body;
    const updateTask = req.body;
    updateTask.id = undefined;
    taskModel.findByIdAndUpdate(
      id,
      {...req.body},
      { new: true },
      function (err, task) {
        if (err) {
          responseHandler.error(res);
        }
        if (task) {
          // console.log(task);
          responseHandler.ok(res, task);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    responseHandler.error(res);
  }
};

export default { createTask, getTasks, updateTask };
