import {
  Box,
  Stack,
  IconButton,
  Divider,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import menuConfig from "../../configs/menu.config";
import { Link } from "react-router-dom";
import { themeModes } from "../../configs/theme.config";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import { setUser } from "../../redux/features/userSlice";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { setTeams } from "../../redux/features/teamsSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();
  const nav = useNavigate();
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const dispatch = useDispatch();

  const getIconColor = (menu) => {
    const dark = appState.includes(menu.state)
      ? theme.palette.background.paper
      : theme.palette.primary.main;
    const light = appState.includes(menu.state)
      ? "#fff"
      : theme.palette.primary.contrastText;
    return themeMode == themeModes.dark ? dark : light;
  };

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };
  const logout = () => {
    dispatch(setUser(null));
    dispatch(setTeams([]));
    nav("/");
    window.location.reload();
  };
  return (
    <Box
      width={"55px"}
      sx={{
        height: "100vh",
        borderRight: `1px solid ${theme.palette.borderColor.default}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.contrastText,
      }}
    >
      <Box
        textAlign="center"
        sx={{
          padding: "7px",
          paddingBottom: "0",
          justifyContent: "center",
        }}
      >
        <Logo size={"1.5rem"} alpha />
      </Box>
      <Stack height={"95%"} justifyContent="space-between">
        <Stack alignItems={"center"}>
          {menuConfig.main.map((menu, index) => (
            <Button
              component={Link}
              to={menu.path}
              key={index}
              variant={appState.includes(menu.state) ? "contained" : "text"}
              sx={{
                padding: "0px",
                minWidth: "35px",
                width: "35px",
                height: "35px",
                color: appState.includes(menu.state)
                  ? "#fff"
                  : theme.palette.secondary.contrastText,
                marginTop: "20%",
                "&:hover": {
                  backgroundColor: appState.includes(menu.state)
                    ? ""
                    : "#505050",
                },
              }}
            >
              <menu.icon sx={{ fontSize: "1.5rem" }} />
            </Button>
          ))}
        </Stack>
        <Stack>
          <IconButton onClick={logout}>
            <LogoutOutlinedIcon sx={{ color: "inherit", fontSize:"25px" }} />
          </IconButton>
          <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
            {themeMode === themeModes.dark && <WbSunnyOutlinedIcon sx={{ fontSize:"25px"}}/>}
            {themeMode === themeModes.light && <DarkModeOutlinedIcon sx={{ fontSize:"25px"}}/>}
          </IconButton>
          <IconButton >
            <AccountCircleRoundedIcon sx={{ color: "inherit" , fontSize:"30px"}} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
