import privateClient from "../client/private.client";

const taskEndpoints = {
  getTasks: (groupBy) => `tasks/getTasks/${groupBy}`,
  getTasksForTeams: (groupBy, teamId) => `tasks/getTasks/${groupBy}/${teamId}`,
};

const teamApi = {
  getTasks: async (groupBy) => {
    try {
      const response = await privateClient.get(taskEndpoints.getTasks(groupBy));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default teamApi;
