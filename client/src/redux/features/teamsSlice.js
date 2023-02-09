import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "Teams",
  initialState: {
    teams: [],
    teamsMembersDetail: {},
    allMembers: [],
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
} = teamSlice.actions;

export default teamSlice.reducer;
