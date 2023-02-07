import {
  Box,
  Stack,
  useTheme,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  IconButton,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { setTeamModal } from "../../../redux/features/teamsSlice";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const SingleLevel = ({ team, sx, component, to, icon, click }) => {
  return (
    <ListItemButton component={component} to={to} sx={sx} onClick={click}>
      {icon && (
        <ListItemIcon
          sx={{
            justifyContent: "flex-start",
            minWidth: "35px",
          }}
        >
          <WidgetsOutlinedIcon />
        </ListItemIcon>
      )}
      <ListItemText primary={team.teamName} />
    </ListItemButton>
  );
};

const MultiLevel = ({ team, teams, teamId, queryString }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          margin: "5px 12px 0 12px",
        }}
      >
        <ListItemButton
          onClick={handleClick}
          disableRipple
          sx={{
            padding: "0",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "flex-start",
              minWidth: "24px",
              transform: open && "rotate(90deg)",
              transition: ".3s all ease",
            }}
          >
            <ArrowRightIcon />
          </ListItemIcon>
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              alignItems: "center",
              color: theme.palette.primary.contrastText,
              borderRadius: "4px",
              margin: 0,
              padding: "4px 4px",
              fontSize: "14px",
              backgroundColor: teamId && "#242e34",
              "&:hover": {
                backgroundColor: !teamId ? "#ffffff14" : "#242e34",
              },
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                textAlign: "center",
                padding: "2px",
                backgroundColor: "#7c828d",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                T
              </Typography>
            </Box>
            <ListItemText primary={team.teamName} />
          </Stack>
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            marginTop: "10px",
          }}
        >
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {teams &&
              teams.map((team, index) => {
                return (
                  team.teamName.toLowerCase().includes(queryString) && (
                    <SingleLevel
                      key={index}
                      team={team}
                      component={Link}
                      to={`/teams/${team.id}`}
                      sx={{
                        backgroundColor:
                          teamId === team.id && theme.palette.primary.main,

                        borderRadius: "4px",
                        padding: "2px 16px",
                        "&:hover": {
                          background:
                            teamId === team.id
                              ? theme.palette.primary.main
                              : "#242e34",
                        },
                        "& .MuiTypography-root": {
                          fontSize: "13.5px",
                        },
                      }}
                    />
                  )
                );
              })}
          </List>
        </Collapse>
      </Box>
    </React.Fragment>
  );
};

const TeamSubMenu = ({ teams, teamId }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [queryString, setQueryString] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const dispatch = useDispatch();

  const onChange = (event) => {
    setQueryString(event.target.value.toLowerCase());
  };

  return (
    <Box
      sx={{
        width: "208px",
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        position: "relative",
        borderRight: `2px solid ${theme.palette.background.default}`,
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: searchBarOpen ? "center" : "space-between",
          marginTop: "12px",
          "& .MuiTextField-root": {
            alignItems: "flex-end",
          },
          "& .MuiInputBase-sizeSmall": {
            paddingRight: "0",
            margin: "1.4%",
            fontSize: "12px",
            width: searchBarOpen ? "160px" : "0",
            borderRadius: "25px",
            animation: "changeWidth .3s linear",
            "@keyframes changeWidth": {
              "0%": { width: "0" },
              "100%": { width: "190px" },
            },
          },
        }}
      >
        {!searchBarOpen ? (
          <>
            <Typography
              variant="h6"
              sx={{
                marginLeft: "23px",
                fontSize: "14px",
              }}
            >
              Teams
            </Typography>
            <IconButton onClick={() => setSearchBarOpen(true)}>
              <SearchIcon />
            </IconButton>
          </>
        ) : (
          <ClickAwayListener
            onClickAway={() => {
              setQueryString("");
              setSearchBarOpen(false);
            }}
          >
            <TextField
              id="outlined-size-small"
              placeholder="search"
              variant="outlined"
              onChange={onChange}
              size="small"
              autoFocus
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setQueryString("");
                      setSearchBarOpen(false);
                    }}
                  >
                    <CancelOutlinedIcon
                      sx={{
                        fontSize: "1.2rem",
                        animation: "changeWidthIcon 1s linear",
                        "@keyframes changeWidthIcon": {
                          "0%": { width: "0" },
                          "100%": { width: "190px" },
                        },
                      }}
                    />
                  </IconButton>
                ),
              }}
            />
          </ClickAwayListener>
        )}
      </Stack>
      <SingleLevel
        component={Link}
        to={`/teams`}
        team={{ teamName: "Everything" }}
        icon
        sx={{
          backgroundColor: !teamId && theme.palette.primary.main,
          borderRadius: "4px",
          padding: "0 10px",
          margin: "5px 12px 0 12px",
          "&:hover": {
            background: !teamId ? theme.palette.primary.main : "#242e34",
          },
        }}
      />
      <MultiLevel
        team={{ teamName: "Teams" }}
        teams={teams}
        teamId={teamId}
        queryString={queryString}
      ></MultiLevel>
      {user && user.designation === "MANAGER" && (
        <>
          <SingleLevel
            click={() => dispatch(setTeamModal(true))}
            team={{ teamName: "+ Add new Teams" }}
            sx={{
              color: theme.palette.primary.main,
              borderRadius: "4px",
              padding: "0 10px",
              margin: "5px 12px 0 12px",
            }}
          />
        </>
      )}
    </Box>
  );
};

export default TeamSubMenu;
