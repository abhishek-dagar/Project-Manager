import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
  Collapse,
  Box,
} from "@mui/material";

import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";

import { useState } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

import TableHeading from "./TableHeading";
import TasksRow from "./TasksRow";

const TableView = ({ task, tableColHeading, ind, taskKey }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const updateOpen = async () => {
    setOpen(!open);
  };

  const checkBgColor = () => {
    if (task.groupHeading) {
      var rgbValue = task.headingColor.substr(1);
      var r = parseInt(rgbValue.substring(0, 2), 16);
      var g = parseInt(rgbValue.substring(2, 4), 16);
      var b = parseInt(rgbValue.substring(4, 6), 16);
      var brightness = r * 0.299 + g * 0.587 + b * 0.114;

      return brightness > 186 ? "#343434" : theme.palette.primary.contrastText;
    }
    return theme.palette.primary.contrastText;
  };

  return (
    <Box marginLeft={"23px"}>
      <Table
        sx={{
          marginTop: "3%",
        }}
      >
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              padding: "0 0 0 0",
              borderBottom: "none !important",
            },
          }}
        >
          <Droppable
            type={"HEADING" + taskKey + ind}
            droppableId={`Task-Heading-${taskKey}-${ind}`}
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <TableRow ref={provided.innerRef} {...provided.droppableProps}>
                <TableCell
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    sx={{
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
                        height: "22px",
                        "&:hover ": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          marginRight: "6px",
                          minWidth: "6px",
                          position: "absolute",
                          top: 0,
                          left: "-20px",
                        }}
                      >
                        {open ? (
                          <ExpandCircleDownOutlinedIcon
                            fontSize="small"
                            sx={{
                              color: task.headingColor,
                              transform: `rotate(${open ? "0deg" : "-90deg"})`,
                              fontSize: "calc(16 / 16 * 1rem);",
                            }}
                          />
                        ) : (
                          <ExpandCircleDownRoundedIcon
                            fontSize="small"
                            sx={{
                              color: task.headingColor,
                              transform: `rotate(${open ? "0deg" : "-90deg"})`,
                              fontSize: "calc(16 / 16 * 1rem);",
                            }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={task.groupHeading}
                        sx={{
                          color: checkBgColor(),
                          borderRadius: "4px",
                          padding: "0",
                          fontSize: "15px",
                          textTransform: "uppercase",
                          backgroundColor: task.headingColor,
                          minHeight: 24,
                          display: "flex",
                          alignItems: "center",
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            padding: "0 7px",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Stack>
                </TableCell>
                {task.tasks.length > 0 &&
                  open &&
                  tableColHeading.map((col, index) => {
                    return (
                      <Draggable
                        key={`Heading-${taskKey}-${task.groupHeading}-${col}-${index}`}
                        draggableId={`Heading-${taskKey}-${task.groupHeading}-${col}-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableHeading
                            provided={provided}
                            snapshot={snapshot}
                            key={col}
                            id={col}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </TableRow>
            )}
          </Droppable>
        </TableHead>
      </Table>

      <Collapse in={open}>
        <Droppable droppableId={`Task-List-${taskKey}-${ind}`} type="DATA">
          {(provided, _) => {
            return (
              <>
                <Table ref={provided.innerRef} {...provided.droppableProps}>
                  <TableBody>
                    {task.tasks.length > 0 ? (
                      task.tasks.map((ta, index) => {
                        return (
                          <Draggable
                            key={ta.id}
                            draggableId={`List-${ta.id}-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <>
                                  <TasksRow
                                    snapshot={snapshot}
                                    provided={provided}
                                    task={task}
                                    ta={ta}
                                    tableColHeading={tableColHeading}
                                    taskKey={taskKey}
                                  />
                                </>
                              );
                            }}
                          </Draggable>
                        );
                      })
                    ) : (
                      <Draggable
                        draggableId={`List-undefined-${ind}`}
                        index={0}
                        isDragDisabled
                      >
                        {(provided, _) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{
                              height: "20px",
                            }}
                          />
                        )}
                      </Draggable>
                    )}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              </>
            );
          }}
        </Droppable>
      </Collapse>
    </Box>
  );
};

export default TableView;
