import responseHandler from "../handlers/response.handler.js";
import taskModel from "../models/task.model.js";
import groupByHelper from "../helper/groupBy.helper.js";

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
    const { groupBy, teamId } = req.params;

    var tasks;
    if (designation === "MANAGER") {
      tasks = await taskModel.find({ manager: id });
    } else if (designation === "MEMBER") {
      tasks = await taskModel.find({ manager: manager });
    }
    if (!tasks) return responseHandler.notfound(res);

    const groupByTeam = await groupByHelper.team(tasks);
    // if (teamId) {
    //   const groupTask = await groupByHelper[groupBy]({
    //     teamId: groupByTeam[teamId],
    //   });
    //   return responseHandler.ok(res, groupTask);
    // }
    const groupTask = await groupByHelper[groupBy](groupByTeam);

    // return responseHandler.ok(res, groupByTeam);
    return responseHandler.ok(res, groupTask);
  } catch (err) {
    console.log(err.message);
    responseHandler.error(res);
  }
};

export default { createTask, getTasks };
