import { Box, Stack, useTheme } from "@mui/material";

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
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
import { setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";
import Sidebar from "../common/Sidebar";

const AppLayout = () => {
  const { teams, teamsMembersDetail } = useSelector((state) => state.teams);
  const { appState } = useSelector((state) => state.appState);

  const dispatch = useDispatch();

  const { teamId } = useParams();

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [sideBarOpenTemp, setSideBarOpenTemp] = useState(false);

  const changeSidebar = () => {
    setSideBarOpen(!sideBarOpen);
    if (sideBarOpenTemp) {
      setSideBarOpenTemp(false);
    }
  };
  const changeSidebarTemp = () => {
    if (!sideBarOpen) setSideBarOpenTemp(!sideBarOpenTemp);
  };

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
          <Sidebar
            sideBarOpen={sideBarOpen}
            changeSidebar={changeSidebar}
            changeSidebarTemp={changeSidebarTemp}
          />
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
                position: "relative",
              }}
            >
              {appState.includes("team") && (
                <TeamSubMenu
                  teams={teams}
                  teamsMembersDetail={teamsMembersDetail}
                  teamId={teamId}
                  sideBarOpen={sideBarOpen}
                  changeSidebar={changeSidebar}
                  sideBarOpenTemp={sideBarOpenTemp}
                />
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
