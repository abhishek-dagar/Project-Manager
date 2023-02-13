const groupByHelper = {
  team: async (tasks) => {
    var groupTasks = {};
    if (tasks) {
      tasks.map((task) => {
        if (groupTasks[task.team]) {
          groupTasks[task.team].push(task);
        } else {
          groupTasks[task.team] = [task];
        }
      });
    }
    return groupTasks;
  },
  status: async ({ tasks, teams }) => {
    var groupByStatus = {};
    Object.keys(tasks).forEach((key) => {
      groupByStatus[key] = {};
      tasks[key].map((task) => {
        if (groupByStatus[key][[`${task.status}`]]) {
          groupByStatus[key][[`${task.status}`]].push(task);
        } else {
          groupByStatus[key][`${task.status}`] = [task];
        }
      });
    });
    var finalGroup = {};
    Object.keys(groupByStatus).forEach((key) => {
      finalGroup[key] = [];
      Object.keys(groupByStatus[key]).forEach((smallKey,index) => {
        finalGroup[key].push({
          groupHeading: smallKey,
          headingColor: teams.length>0 ? teams[index].allStatus[[`${groupByStatus[key][smallKey][0].status}`]]:"",
          tasks: groupByStatus[key][smallKey],
        });
      });
    });

    return finalGroup;
  },
  assignee: async ({ tasks, allMembers }) => {
    const memberObj = {};
    allMembers.map((member) => {
      memberObj[`${member.id}`] = member;
    });
    var groupByAssignee = {};
    Object.keys(tasks).forEach((key) => {
      groupByAssignee[key] = {};
      tasks[key].map((task) => {
        if (task.assignee === null) {
          if (groupByAssignee[key][undefined]) {
            groupByAssignee[key][undefined].push(task);
          } else {
            groupByAssignee[key][undefined] = [task];
          }
        } else if (groupByAssignee[key][[`${task.assignee}`]]) {
          groupByAssignee[key][[`${task.assignee}`]].push(task);
        } else {
          groupByAssignee[key][`${task.assignee}`] = [task];
        }
      });
    });

    var finalGroup = {};
    Object.keys(groupByAssignee).forEach((key) => {
      finalGroup[key] = [];
      Object.keys(groupByAssignee[key]).forEach((smallKey) => {
        finalGroup[key].push({
          groupHeading:
            memberObj[groupByAssignee[key][smallKey][0].assignee]
              ?.displayName || "Unassigned",
          groupKey: groupByAssignee[key][smallKey][0].assignee || null,
          tasks: groupByAssignee[key][smallKey],
        });
      });
    });
    return finalGroup;
  },
  none: ({ tasks }) => {
    const groupAll = [];
    Object.keys(tasks).forEach((key) => {
      if (groupAll[key]) {
        groupAll[key].push({
          groupHeading: "All Tasks",
          tasks: tasks[key],
        });
      } else {
        groupAll[key] = [{ groupHeading: "All Tasks", tasks: tasks[key] }];
      }
    });

    return groupAll;
  },
  priority: ({ tasks }) => {
    var groupByPriority = {};
    Object.keys(tasks).forEach((key) => {
      groupByPriority[key] = {};
      tasks[key].map((task) => {
        if (task.priority === null) {
          if (groupByPriority[key][undefined]) {
            groupByPriority[key][undefined].push(task);
          } else {
            groupByPriority[key][undefined] = [task];
          }
        } else if (groupByPriority[key][[`${task.priority}`]]) {
          groupByPriority[key][[`${task.priority}`]].push(task);
        } else {
          groupByPriority[key][`${task.priority}`] = [task];
        }
      });
    });

    var finalGroup = {};
    Object.keys(groupByPriority).forEach((key) => {
      finalGroup[key] = [];
      Object.keys(groupByPriority[key]).forEach((smallKey) => {
        finalGroup[key].push({
          groupHeading:
            groupByPriority[key][smallKey][0].priority || "Unassigned",
          headingColor: priorities[groupByPriority[key][smallKey][0].priority],
          tasks: groupByPriority[key][smallKey],
        });
      });
    });
    return finalGroup;
  },
};

const priorities = {
  Urgent: "#f50000",
  High: "#ffcc00",
  Normal: "#6fddff",
  Low: "#d8d8d8",
  Clear: "#ff8176",
};

export default groupByHelper;
