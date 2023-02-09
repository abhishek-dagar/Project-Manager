const groupByHelper = {
  team: async (tasks) => {
    var groupTasks = {}
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
  status: async (tasks) => {
    var groupByStatus = {};
    Object.keys(tasks).forEach((key) => {
      groupByStatus[key] = {};
      tasks[key].map((task) => {
        if (groupByStatus[key][[`${task.status}`]]) {
          groupByStatus[key][[`${task.status}`]].push(task);
        } else {
          groupByStatus[key][`${task.status}`]=[task];
        }
      });
    });
    var finalGroup = {};
    Object.keys(groupByStatus).forEach((key)=>{
      finalGroup[key]=[]
      Object.keys(groupByStatus[key]).forEach((smallKey)=>{
        finalGroup[key].push({
          groupHeading:smallKey,
          headingColor:groupByStatus[key][smallKey][0].statusColor,
          tasks:groupByStatus[key][smallKey]
        })
      })
    })
    // console.log(finalGroup);
    return finalGroup
  },
};

export default groupByHelper;
