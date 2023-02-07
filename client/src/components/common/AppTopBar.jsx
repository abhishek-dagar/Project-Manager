import {
  Box,
  useTheme,
  TextField,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import menuConfigs from "../../configs/menu.config";
import { useState } from "react";

const AppTopBar = ({ changeQuery, handleTabAreaIndex }) => {
  const theme = useTheme();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTab = (index) => {
    setTabIndex(index);
    handleTabAreaIndex(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.topBar,
        height: "60px",
        borderBottom:`1px solid ${theme.palette.borderColor.topBar}`
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          width: "97%",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
        >
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
          }}
        >
          {menuConfigs.topBarMenu.map((menu, index) => {
              return (
                <Stack
                  key={index}
                  onClick={() => handleTab(index)}
                  sx={{
                    padding: "8px 12px 7px 12px",
                    marginTop: "23px",
                    fontSize: "14px",
                    flexDirection: "row",
                    backgroundColor:tabIndex === index && theme.palette.background.menu,
                    border:
                      tabIndex === index
                        ? `1px solid ${theme.palette.borderColor.topBar}`
                        : "",
                    borderBottom:
                      tabIndex === index
                        ? `none`
                        : "",
                    borderTopRightRadius: "7px",
                    borderTopLeftRadius: "7px",
                    userSelect: "none",
                  }}
                >
                  <menu.icon
                    fontSize="small"
                    sx={{
                      marginRight: "7px",
                    }}
                  />
                  {menu.name}
                </Stack>
              );
            })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AppTopBar;
