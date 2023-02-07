import { Box, Stack, Typography } from "@mui/material";
import bgImg from "../assets/hero_section.png.webp";
import { themeModes } from "../configs/theme.config";
import { useSelector } from "react-redux";

const Homepage = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <Box>
      {themeMode === themeModes.light ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: -1,
            background:
              "linear-gradient(156deg, rgba(208,208,208,1) 0%, rgba(255,255,255,0.8883928571428571) 33%, rgba(19,230,200,0.577468487394958) 100%)",
          }}
        />
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: -1,
            background:
              "linear-gradient(156deg, rgba(32,33,36,1) 0%, rgba(32,33,36,0.8883928571428571) 33%, rgba(19,230,200,0.577468487394958) 100%)",
          }}
        />
      )}
      <Box
        sx={{
          width: { xs: "95%", md: "70%" },
          height: "94vh",
          margin: "0 auto",
        }}
      >
        <Stack
          sx={{
            height: "100%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { xs: "space-evenly" },
            marginTop: { xs: "3rem", sm: "0" },
          }}
        >
          <Box
              data-aos="fade-right"
            sx={{
              width: { xs: "80%", sm: "50%" },
              height: { xs: "25%", sm: "50%" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Exo',sans-serif",
                fontWeight: { xs: "300", md: "700" },
                fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
              }}
            >
              A Powerful Project Management Solution Made For Growing Teams
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Exo',sans-serif",
                marginTop: "1rem",
                fontSize: { xs: "1.2rem", md: "1.3rem", lg: "1.5rem" },
              }}
            >
              Break down complex projects with comprehensive software that
              enables your teams to collaborate, plan, analyze and manage
              everyday tasks.
            </Typography>
          </Box>
          <Box
          data-aos="fade-left"
            sx={{
              width: { xs: "80%", sm: "50%" },
              height: { xs: "25%", sm: "50%" },
            }}
          >
            <Box
              sx={
                themeMode === themeModes.light
                  ? {
                      filter: "drop-shadow(0 0 100px rgba(0, 0, 0, 0.5))",
                      "& img": {
                        height: { xs: "290px", sm: "100%" },
                      },
                    }
                  : {
                      filter: "drop-shadow(0 0 100px rgba(1, 1, 1, 0.5))",
                      "& img": {
                        height: { xs: "290px", sm: "100%" },
                      },
                    }
              }
            >
              <img src={bgImg} alt="img" />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Homepage;
