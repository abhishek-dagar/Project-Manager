import { createTheme } from "@mui/material";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#7b68ee",
              // main: "#00CC90",
              contrastText: colors.grey["300"],
            },
            secondary: {
              main: "#34a853",
              contrastText: "#d8dce2",
            },
            background: {
              // default: "#202124",
              default: "#1e272e",
              paper: "#2b343b",
              topBar:"#2a2e34",
              menu:"#1e272e"
            },
            borderColor: {
              default: "#1e272e",
              light: "#384047",
              box:"#384047",
              topBar:"#3c414a",
            },
          }
        : {
            primary: {
              main: "#7b68ee",
              contrastText: "#000000",
            },
            secondary: {
              main: "#34a853",
              contrastText: "#0000008a",
            },
            background: {
              default: "#eeedef",
              paper: "#ffffff",
              topBar:"#fff",
              menu:"#eeedef",
            },
            borderColor: {
              default: colors.grey["500"],
              light: "#b9bec7",
              box:"transparent",
              topBar:"#eeedef",
            },
          };
    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
