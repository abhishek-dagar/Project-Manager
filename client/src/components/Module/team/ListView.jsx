import {
  useTheme,
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import teamApi from "../../../api/modules/team.api";
import { useEffect, useState } from "react";
import TableView from "../Tasks/TableView";

const ListView = ({
  team,
  tasks,
  isTeam,
  searchQuery,
  tableColHeading,
  handleDragEnd,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(team.teamName ? team.view : false);

  const updateOpen = async () => {
    setOpen(!open);
    if (!isTeam) {
      team = { ...team, view: !open };
      await teamApi.updateView(team);
    }
  };

  useEffect(() => {
    setOpen(team.view);
  }, [team]);

  return team ? (
    <Stack
      direction={"column"}
      width={"100%"}
      sx={{
        margin: !isTeam ? "1% 0" : "2% 0 0 0",
      }}
    >
      <Stack
        sx={{
          position: "sticky",
          left: "20px",
          marginLeft: isTeam ? `${-16 + isTeam * 16}px` : "-16px",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <ListItemButton
          onClick={() => updateOpen()}
          disableRipple
          sx={{
            justifyContent: "flex-end",
            borderRadius: "4px",
            padding: "4px 5px 4px 2px",
            height: isTeam ? "22px" : "30px",
            "&:hover ": {
              backgroundColor:
                isTeam && (theme.mode === "dark" ? "#4f5762" : "transparent"),
            },
          }}
        >
          <ListItemIcon
            sx={{
              marginRight: "6px",
              minWidth: "6px",
            }}
          >
            {open ? (
              <ExpandCircleDownOutlinedIcon
                fontSize="small"
                sx={{
                  color: isTeam ? team.headingColor : "#87909e",
                  transform: `rotate(${open ? "0deg" : "-90deg"})`,
                  fontSize: "calc(16 / 16 * 1rem);",
                }}
              />
            ) : (
              <ExpandCircleDownRoundedIcon
                fontSize="small"
                sx={{
                  color: isTeam ? team.headingColor : "#87909e",
                  transform: `rotate(${open ? "0deg" : "-90deg"})`,
                  fontSize: "calc(16 / 16 * 1rem);",
                }}
              />
            )}
          </ListItemIcon>
          <ListItemText
            primary={team.teamName ? team.teamName : team.groupHeading}
            sx={{
              borderRadius: "4px",
              padding: "0",
              fontSize: "15px",
              textTransform: isTeam && "uppercase",
              backgroundColor: isTeam && team.headingColor,
              "&:hover ": {
                backgroundColor: !isTeam && "#00cc900a",
              },
              "& .MuiTypography-root": team.groupHeading
                ? {
                    fontSize: "13px",
                    padding: "0 7px",
                  }
                : {
                    fontWeight: "bold",
                  },
            }}
          />
        </ListItemButton>
      </Stack>
      <Box width={"100%"}>
        <Collapse in={open}>
          {tasks &&
            tasks.map((task, index) => {
              return (
                <TableView
                  task={task}
                  key={index}
                  ind={index}
                  taskKey={team.id}
                  tableColHeading={tableColHeading}
                  handleDragEnd={handleDragEnd}
                />
              );
            })}
        </Collapse>
      </Box>
    </Stack>
  ) : (
    <></>
  );
};

export default ListView;
