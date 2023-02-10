import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "Teams",
  initialState: {
    teams: [],
    teamsMembersDetail: {},
    allMembers: [],
    allTasks:{},
    teamModal: false,
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setTeamsMembersDetail: (state, action) => {
      state.teamsMembersDetail = action.payload;
    },
    setAllMember: (state, action) => {
      state.allMembers = action.payload;
    },
    setAllTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    setTeamModal: (state, action) => {
      state.teamModal = action.payload;
    },
  },
});

export const {
  setTeams,
  setTeamsMembersDetail,
  setAllMember,
  setTeamModal,
  setAllTasks,
} = teamSlice.actions;

export default teamSlice.reducer;
