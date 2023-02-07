import privateClient from "../client/private.client";

const teamEndpoints = {
  getTeam: (teamId)=>`team/getTeam/${teamId}`,
  getTeams: "team/getTeams",
  getAllMembers: "team/getMembers",
  getTeamsMemberDetails: "team/teamMembersDetail",
  createTeam: "team/createTeam",
  updateView: "team/updateView",
};

const teamApi = {
  getTeam: async (teamId) => {
    try {
      const response = await privateClient.get(teamEndpoints.getTeam(teamId));

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getTeams: async () => {
    try {
      const response = await privateClient.get(teamEndpoints.getTeams);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getAllMembers: async () => {
    try {
      const response = await privateClient.get(teamEndpoints.getAllMembers);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getTeamsMemberDetails: async (data) => {
    try {
      const response = await privateClient.post(
        teamEndpoints.getTeamsMemberDetails,
        data
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createTeam: async (data) => {
    console.log(data);
    try {
      const response = await privateClient.post(teamEndpoints.createTeam, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateView: async (data) => {
    try {
      const response = await privateClient.put(teamEndpoints.updateView, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default teamApi;
