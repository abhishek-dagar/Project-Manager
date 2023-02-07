import { Box, Stack, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";
import Sidebar from "../common/Sidebar";

import { useEffect } from "react";
import teamApi from "../../api/modules/team.api";
import {
  setTeams,
  setTeamsMembersDetail,
  setAllMember,
} from "../../redux/features/teamsSlice";
import { setGlobalLoading } from "../../redux/features/globalLoadSlice";
import GlobalLoading from "../common/GlobalLoading";
import TeamSubMenu from "../Module/team/TeamSubMenu";
import TeamModal from "../Module/team/TeamModal";
import { useParams } from "react-router-dom";

const AppLayout = () => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { teams, teamsMembersDetail } = useSelector((state) => state.teams);
  const { appState } = useSelector((state) => state.appState);

  const theme = useTheme();

  useEffect(() => {
    const getTeamMembers = async (data) => {
      const { response, err } = await teamApi.getTeamsMemberDetails(data);

      if (response) dispatch(setTeamsMembersDetail(response));
      if (err) dispatch(setTeams([]));
    };

    const getAllMembers = async () => {
      const { response, err } = await teamApi.getAllMembers();
      
      if (response) {
        dispatch(setAllMember(response));
      }
      if (err) dispatch(setTeams([]));
    };

    const getTeams = async () => {
      const { response, err } = await teamApi.getTeams();

      if (response) {
        dispatch(setTeams(response));
        getTeamMembers(response);
      }
      if (err) dispatch(setTeams([]));
    };

    const authUser = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await userApi.getInfo();

      if (response) {
        dispatch(setUser(response));
        getAllMembers();
        getTeams();
      }
      if (err) {
        dispatch(setUser(null));
      }
      dispatch(setGlobalLoading(false));
    };
    authUser();
  }, [dispatch]);

  return (
    <>
    {/* Add team modal */}
    <TeamModal />
    {/* Add team modal */}
      {/* main content */}
      <Box
        sx={{
          height: "100%", 
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            height: "100vh",
          }}
        >
          <Sidebar />
          <Stack
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            {/* Global Loading */}
            <GlobalLoading />
            {/* Global Loading */}

            <Stack
              direction={"row"}
              sx={{
                backgroundColor: theme.palette.background.default,
                width: "100%",
                height: "100%",
              }}
            >
              {appState.includes("team") && (
                <TeamSubMenu teams={teams} teamsMembersDetail={teamsMembersDetail} teamId={teamId}/>
              )}
              <Outlet />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {/* main content */}
    </>
  );
};

export default AppLayout;
