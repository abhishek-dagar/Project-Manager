import {
  Box,
  Button,
  Stack,
  IconButton,
  useTheme,
  Avatar,
  AvatarGroup,
  Tooltip,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TeamsGrid from "../components/Module/team/TeamsGrid";
import AppTopBar from "../components/common/AppTopBar";
import { useEffect } from "react";
import teamApi from "../api/modules/team.api";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { setTeamModal, setTeams } from "../redux/features/teamsSlice";
import TaskBoard from "../components/common/TaskBoard";
import { useNavigate, useParams } from "react-router-dom";
import taskApi from "../api/modules/task.api";

const TeamsPages = () => {
  const theme = useTheme();

  const { teams, allMembers } = useSelector((state) => state.teams);
  const { themeMode } = useSelector((state) => state.themeMode);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { teamId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [teamsState, setTeamsState] = useState(teams);
  const [tasks, setTasks] = useState({});

  const [tabAreaIndex, setTabAreaIndex] = useState(0);
  const [groupBy, setgroupBy] = useState("status");

  const updateTasks = (tasks) => {
    setTasks(tasks);
  };

  const TabArea = [
    <TeamsGrid
      teams={teamsState}
      searchQuery={searchQuery}
      tasks={tasks}
      updateTasks={updateTasks}
    />,
    <TaskBoard searchQuery={searchQuery} />,
  ];

  const handleTabAreaIndex = (index) => {
    setTabAreaIndex(index);
  };

  const changeQuery = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const getTeams = async () => {
      const { response, err } = await teamApi.getTeams();

      if (response) {
        dispatch(setTeams(response));
        setTeamsState(response);
      }
      if (err) dispatch(setTeams([]));
    };

    const getTasks = async () => {
      const { response, err } = await taskApi.getTasks(groupBy);
      if (response) {
        setTasks(response);
      }
      if (err) {
        dispatch(setTeams([]));
      }
    };
    const getTeam = async () => {
      const { response, err } = await teamApi.getTeam(teamId);

      if (response) {
        setTeamsState([response]);
      }
      if (err) {
        navigate("/teams");
        setTeamsState(teams);
      }
    };
    if (teamId && teamId !== "") {
      getTeam();
    } else {
      getTeams();
    }
    getTasks();
  }, [teamId, groupBy]);

  return (
    <Stack width={"100%"}>
      <AppTopBar
        changeQuery={changeQuery}
        handleTabAreaIndex={handleTabAreaIndex}
      />
      <Box
        sx={{
          padding: "10px 17px 10px 30px",
        }}
      >
        <Stack direction={"row"} position={"relative"} alignItems="center">
          <Stack
            sx={{
              flexDirection: "row",
              width: "250px",
              "& .MuiInputBase-sizeSmall": {
                paddingRight: "0",
                margin: "5.5%",
                marginTop: "8%",
                fontSize: "12px",
                width: "200px",
              },
              "& .MuiTextField-root": {
                justifyContent: "flex-end",
              },
            }}
          >
            <TextField
              id="outlined-size-small"
              placeholder="search"
              variant="standard"
              onChange={changeQuery}
              size="small"
            />
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "146px",
              fontSize: "12px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #484850",
                borderRadius: "5px 5px 0 0",
                backgroundColor: "transparent",
              },
            }}
          >
            <Typography fontSize="12px">Group by:</Typography>
            <Select
              defaultValue={"Status"}
              variant="standard"
              disableUnderline
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              sx={{
                fontSize: "12px",
                "& ": {
                  padding: "10px",
                },
              }}
            >
              <MenuItem value={"Status"}>Status</MenuItem>
              <MenuItem value={"Assignee"}>Assignee</MenuItem>
              <MenuItem value={"Priority"}>Priority</MenuItem>
              <MenuItem value={"None"}>None</MenuItem>
            </Select>
          </Stack>
          <Stack direction={"row"} alignItems="center">
            <Tooltip title={`${allMembers.length} Members`}>
              <AvatarGroup
                max={2}
                sx={{
                  marginLeft: "15px",
                  "& .MuiAvatar-root": {
                    width: 15,
                    height: 15,
                    fontSize: 15,
                    padding: "8px",
                    color: theme.palette.secondary.contrastText,
                  },
                }}
              >
                {allMembers &&
                  allMembers.map((member, index) => (
                    <Avatar
                      key={index}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        padding: "4px",
                        color: theme.palette.secondary.contrastText,
                      }}
                    >
                      {member.displayName[0]}
                    </Avatar>
                  ))}
              </AvatarGroup>
            </Tooltip>
            <Tooltip title="Add member">
              <IconButton
                sx={{
                  borderRadius: 0,
                  fontSize: "11px",
                  color: theme.palette.secondary.contrastText,
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Avatar
                  sx={{
                    // backgroundColor: "transparent",
                    width: 30,
                    height: 30,
                    fontSize: 20,
                    color: theme.palette.secondary.contrastText,
                  }}
                >
                  <PersonAddAltOutlinedIcon fontSize="small" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Add team">
              <Button
                // variant="contained"
                onClick={() => dispatch(setTeamModal(true))}
                sx={{
                  border: `1px solid ${theme.palette.borderColor.light}`,
                  borderRadius: "4px",
                  padding: "0 15px",
                  margin: "7px 12px 7px 12px",
                  height: "30px",
                  color: theme.palette.secondary.contrastText,
                  "&:hover": {
                    backgroundColor:
                      themeMode === "dark" ? "#ffffff14" : "#0000000a",
                  },
                }}
              >
                <AddIcon sx={{ fontSize: "medium" }} /> Team
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            backgroundColor: theme.palette.background.default,
            width: "16px",
            height: "16px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#babac080",
            borderRadius: "16px",
            border: `5px solid ${theme.palette.borderColor.default}`,
          },
        }}
      >
        <Box
          sx={{
            padding: "10px 25px 0 35px",
            display: "inline-block",
            width: "100%",
          }}
        >
          {TabArea[tabAreaIndex]}
        </Box>
      </Box>
      {/* </Box> */}
    </Stack>
  );
};

export default TeamsPages;
