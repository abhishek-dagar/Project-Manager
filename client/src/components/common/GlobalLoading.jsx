import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, useTheme } from "@mui/material";
import Logo from "./Logo";

const GlobalLoading = () => {
  const theme = useTheme();
  const { globalLoad } = useSelector((state) => state.globalLoad);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (globalLoad) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoad]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100%",
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <Box
              sx={{
                width: "100%",
                height: "3%",
                borderBottom: `1px solid ${theme.palette.borderColor.light}`,
                backgroundColor: theme.palette.background.default,
              }}
            ></Box>
        <LinearProgress sx={{
          // marginTop:"45px"
        }}/>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Logo size={"3rem"}/>
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
