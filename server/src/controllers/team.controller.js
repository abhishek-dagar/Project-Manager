import responseHandler from "../handlers/response.handler.js";
import memberModel from "../models/member.model.js";
import teamModel from "../models/team.model.js";

const createTeam = async (req, res) => {
  try {
    const { managerId, members, teamName } = req.body;

    const checkTeam = await teamModel.findOne({ teamName });

    if (checkTeam)
      return responseHandler.badRequest(res, "Team already exists");

    const team = new teamModel();

    team.manager = managerId;
    team.members = members;
    team.teamName = teamName;

    await team.save();

    responseHandler.created(res, {
      ...team._doc,
      id: team.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const { id } = req.user;

    const members = await memberModel.find({ manager: id });

    if (members.length === 0) return responseHandler.notfound(res);

    responseHandler.ok(res, members);
  } catch {
    responseHandler.error(res);
  }
};
const getTeamMemberDetails = async (req, res) => {
  try {
    const teamsList = req.body;

    const teamMembersDetails = {};
    for (let i = 0; i < teamsList.length; i++) {
      const { members } = teamsList[i];
      const perTeamDetail = [];
      for (let j = 0; j < members.length; j++) {
        const memberId = members[j];
        const teamMemberDetails = await memberModel.findById(memberId);
        perTeamDetail.push(teamMemberDetails);
      }
      teamMembersDetails[teamsList[i].id]=perTeamDetail;
    }

    if (teamMembersDetails.length === 0) return responseHandler.notfound(res);

    responseHandler.ok(res, teamMembersDetails);
  } catch (err) {
    responseHandler.error(res);
  }
};

const getTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await teamModel.findById(teamId);
    if (!team) return responseHandler.notfound(res);
    responseHandler.ok(res, team);
  } catch {
    responseHandler.error(res);
  }
};

const getTeams = async (req, res) => {
  try {
    var teams;
    if (req.user.designation === "MANAGER") {
      teams = await teamModel.find({ manager: req.user.id });
    }
    if (req.user.designation === "MEMBER") {
      teams = await teamModel.find({ members: { $all: [req.user.id] } });
    }

    if (!teams) return responseHandler.notfound(res);

    responseHandler.ok(res, teams);
  } catch {
    responseHandler.error(res);
  }
};

const updateView = async (req, res) => {
  try {
    const { id, view } = req.body;

    const team = await teamModel.findByIdAndUpdate(id, { view: view });
    responseHandler.ok(res, team);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  createTeam,
  getTeams,
  getTeamMemberDetails,
  getAllMembers,
  updateView,
  getTeam,
};
