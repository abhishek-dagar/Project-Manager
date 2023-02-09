import { AppBar, Button, Toolbar, Stack, Typography } from "@mui/material";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import { useSelector, useDispatch } from "react-redux";
import ToggleSwitch from "./ToggleSwitch";

import { themeModes } from "../../configs/theme.config";
import { setThemeMode } from "../../redux/features/themeModeSlice";

import {
  setAuthModalOpen,
  setSignInOrSignUp,
} from "../../redux/features/authModalSlice";
import Logo from "./Logo";

const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const openAuthModel = (state) => {
    if (user) {
      return;
    }
    dispatch(setAuthModalOpen(true));
    dispatch(setSignInOrSignUp(state));
  };
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          zIndex: 1100,
          backgroundColor: "transparent",
          padding: "20px 5px",
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: { xs: "100%", md: "70%" },
            margin: { xs: "0", md: "0 auto" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Stack direction={"row"} spacing={1} alignItems="center">
            <Logo size={"3.5rem"} />
            <ToggleSwitch
              icon={<DarkModeOutlinedIcon />}
              checkedIcon={<WbSunnyOutlinedIcon />}
              onChange={onSwitchTheme}
              sx={{
                marginLeft: "15px",
              }}
            />
          </Stack>
          {!user && (
            <Stack direction={"row"} spacing={1}>
              <Button
                variant="outlined"
                sx={{
                  height: "50px",
                  width: { xs: "120px", md: "100px" },
                }}
                onClick={() => openAuthModel("signIn")}
              >
                <Typography textTransform={"uppercase"}>sign in</Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  width: { xs: "120px", md: "180px" },
                }}
                onClick={() => openAuthModel("signUp")}
              >
                <Typography
                  textTransform={"uppercase"}
                  sx={{
                    fontSize: { xs: "12px", md: "1rem" },
                    color: "#fff",
                  }}
                >
                  sign up for free
                </Typography>
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Topbar;
