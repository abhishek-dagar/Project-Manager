import { Switch, useTheme } from "@mui/material";

import React from "react";

const ToggleSwitch = ({ icon, checkedIcon, onChange }) => {
  const theme = useTheme();
  
  return (
    <Switch
      onChange={onChange}
      icon={icon}
      checkedIcon={checkedIcon}
      sx={{
        width: 48,
        height: 30,
        padding: 0,
        margin: 0,
        "& span": {
          margin: 0,
          padding: 0,
          "& svg": {
            height: "25px",
            transform: "rotate(360deg)",
            animation: "spin .5s linear",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          },
        },
        "& .MuiSwitch-switchBase": {
          padding: 0,
          marginTop: "3px",
          marginLeft: "3px",
          marginBottom: "4px",
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.main
                  : theme.palette.primary.main,
              opacity: 1,
              border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5,
            },
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color:
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
          },
        },
        "& .MuiSwitch-thumb": {
          boxSizing: "border-box",
          width: 15,
          height: 15,
        },
        "& .MuiSwitch-track": {
          height: 30,
          width: 50,
          borderRadius: 26 / 2,
          backgroundColor:
            theme.palette.mode === "light" ? "#b7b7b9" : "#39393D",
          opacity: 1,
          transition: theme.transitions.create(["background-color"], {
            duration: 500,
          }),
        },
      }}
    />
  );
};

export default ToggleSwitch;
