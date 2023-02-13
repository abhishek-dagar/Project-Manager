import {
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";

import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TableView from "../Tasks/TableView";
import teamApi from "../../../api/modules/team.api";

const ListView = ({
  team,
  tasks,
  searchQuery,
  tableColHeading,
  handleDragEnd,
  groupBy,
}) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const [open, setOpen] = useState(team.teamName ? team.view : false);

  const updateOpen = async () => {
    setOpen(!open);
    team = { ...team, view: !open };
    await teamApi.updateView(team);
  };

  useEffect(() => {
    setOpen(team.view);
    if (searchQuery !== "") {
      let flag = true;
      if (tasks) {
        let count = 0;
        tasks.map((task) => {
          if (task.tasks.length > 0) {
            task.tasks.map((ta) => {
              if (ta.taskName.toLowerCase().includes(searchQuery)) {
                count++;
              }
            });
          }
        });
        if (count === 0) {
          flag = false;
        }
      }
      if (flag) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [team, searchQuery]);

  return team ? (
    <Stack
      direction={"column"}
      width={"100%"}
      sx={{
        margin: "1% 0",
      }}
    >
      <Stack
        sx={{
          position: "sticky",
          left: "20px",
          marginLeft: "-16px",
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
            height: "30px",
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
                  color: "#87909e",
                  transform: `rotate(${open ? "0deg" : "-90deg"})`,
                  fontSize: "calc(16 / 16 * 1rem);",
                }}
              />
            ) : (
              <ExpandCircleDownRoundedIcon
                fontSize="small"
                sx={{
                  color: "#87909e",
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
                  groupBy={groupBy}
                  searchQuery={searchQuery}
                  allStatus={team.allStatus}
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
