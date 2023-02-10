import privateClient from "../client/private.client";

const taskEndpoints = {
  getTasks: `tasks/getTasks`,
  updateTask: `tasks/updateTask`,
};

const taskApi = {
  getTasks: async () => {
    try {
      const response = await privateClient.get(taskEndpoints.getTasks);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateTask: async (data) => {
    try {
      const response = await privateClient.put(taskEndpoints.updateTask, data);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default taskApi;
