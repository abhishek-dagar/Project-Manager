import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadSlice from "./features/globalLoadSlice";
import teamSlice from "./features/teamsSlice";
import themeModeSlice from "./features/themeModeSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    user: userSlice,
    teams: teamSlice,
    globalLoad:globalLoadSlice,
  },
});

export default store;
