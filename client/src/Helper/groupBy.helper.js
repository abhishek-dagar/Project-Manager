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
  status: async ({ tasks }) => {
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
      Object.keys(groupByStatus[key]).forEach((smallKey) => {
        finalGroup[key].push({
          groupHeading: smallKey,
          headingColor: groupByStatus[key][smallKey][0].statusColor,
          tasks: groupByStatus[key][smallKey],
        });
      });
    });
    // console.log(finalGroup);
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
    console.log(finalGroup);
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
};

export default groupByHelper;
