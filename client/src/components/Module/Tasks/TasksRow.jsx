import {
  TableRow,
  TableCell,
  ListItemIcon,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import taskApi from "../../../api/modules/task.api";
import { setAllTasks } from "../../../redux/features/teamsSlice";
import TaskRowCell from "./TaskRowCell";
import DropdownMenu from "../../common/DropdownMenu";

const TasksRow = ({
  task,
  ta,
  tableColHeading,
  provided,
  snapshot,
  taskKey,
  groupBy,
  allStatus,
}) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const { allMembers, teamsMembersDetail, allTasks } = useSelector(
    (state) => state.teams
  );

  const dispatch = useDispatch();

  const [assignee, setAssignee] = useState();
  const [priority, setPriority] = useState(ta.priority);
  const [status, setStatus] = useState(ta.status);
  const [anchorElAssignee, setAnchorElAssignee] = useState(null);
  const [anchorElDueDate, setAnchorElDueDate] = useState(null);
  const [anchorElPriority, setAnchorElPriority] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);

  const open = [
    Boolean(anchorElAssignee),
    Boolean(anchorElDueDate),
    Boolean(anchorElPriority),
    Boolean(anchorElStatus),
  ];
  const priorities = {
    Urgent: "red",
    High: "yellow",
    Normal: "#6fddff",
    Low: "#d8d8d8",
    Clear: "#ff8176",
  };

  const handleClickStatus = (event) => {
    setAnchorElStatus(event.currentTarget);
  };
  const handleCloseStatus = () => {
    setAnchorElStatus(null);
  };

  const setStatusState = (value) => {
    // console.log(value);
    setStatus(value)
  };

  const handleClickAssignee = (event) => {
    setAnchorElAssignee(event.currentTarget);
  };
  const handleCloseAssignee = () => {
    setAnchorElAssignee(null);
  };
  const setAssigneeState = async (value) => {
    setAssignee(value);

    const newTaObject = JSON.parse(JSON.stringify(ta));
    newTaObject.assignee = value ? value.id : null;

    if (groupBy === "Assignee") {
      const newAllTaskObject = JSON.parse(JSON.stringify(allTasks));
      const newTaskObject = JSON.parse(JSON.stringify(task));
      const index = task.tasks.indexOf(ta);

      newTaskObject.tasks.splice(index, 1);

      var flag = false;
      var ind = -1;
      var indexTask = -1;
      newAllTaskObject[taskKey].map((task, index) => {
        if (value && value.id === task.groupKey) {
          flag = true;
          ind = index;
          return;
        }
        if (!value && !task.groupKey) {
          flag = true;
          ind = index;
        }
      });

      newAllTaskObject[taskKey].map((task, index) => {
        if (newTaskObject.groupKey === task.groupKey) {
          indexTask = index;
          return;
        }
      });

      if (flag) {
        newAllTaskObject[taskKey][ind].tasks.push(newTaObject);
        if (newTaskObject.tasks.length === 0) {
          newAllTaskObject[taskKey].splice(indexTask, 1);
        } else {
          newAllTaskObject[taskKey].splice(indexTask, 1, newTaskObject);
        }
      } else {
        newAllTaskObject[taskKey].splice(indexTask, 1, newTaskObject);
        newAllTaskObject[taskKey].push({
          groupHeading: value.displayName,
          groupKey: value.id || null,
          tasks: [newTaObject],
        });
      }

      dispatch(setAllTasks(newAllTaskObject));
    }
    const { err } = await taskApi.updateTask(newTaObject);
    if (err) {
      dispatch(setAllTasks({}));
    }
  };
  const handleClickPriority = (event) => {
    setAnchorElPriority(event.currentTarget);
  };
  const handleClosePriority = () => {
    setAnchorElPriority(null);
  };
  const setPriorityState = async (value) => {
    value = value === "Clear" ? null : value;
    setPriority(value);

    const newTaObject = JSON.parse(JSON.stringify(ta));
    newTaObject.priority = value !== "Clear" ? value : null;

    if (groupBy.toLowerCase() === "priority") {
      const newAllTaskObject = JSON.parse(JSON.stringify(allTasks));
      const newTaskObject = JSON.parse(JSON.stringify(task));
      const index = task.tasks.indexOf(ta);

      newTaskObject.tasks.splice(index, 1);

      var flag = false;
      var ind = -1;
      var indexTask = -1;
      newAllTaskObject[taskKey].map((task, index) => {
        if (value === task.groupHeading) {
          flag = true;
          ind = index;
          return;
        }
        if (value === null && task.groupHeading === "Unassigned") {
          flag = true;
          ind = index;
          return;
        }
      });

      newAllTaskObject[taskKey].map((task, index) => {
        if (newTaskObject.groupHeading === task.groupHeading) {
          indexTask = index;
          return;
        }
      });

      if (flag) {
        newAllTaskObject[taskKey][ind].tasks.push(newTaObject);
        console.log(newTaskObject);
        if (newTaskObject.tasks.length === 0) {
          newAllTaskObject[taskKey].splice(indexTask, 1);
        } else {
          newAllTaskObject[taskKey].splice(indexTask, 1, newTaskObject);
        }
      } else {
        if (newTaskObject.tasks.length === 0) {
          newAllTaskObject[taskKey].splice(indexTask, 1);
        } else {
          newAllTaskObject[taskKey].splice(indexTask, 1, newTaskObject);
        }
        newAllTaskObject[taskKey].push({
          groupHeading: value,
          headingColor: priorities[value] || null,
          tasks: [newTaObject],
        });
      }

      dispatch(setAllTasks(newAllTaskObject));
    }
    const { err } = await taskApi.updateTask(newTaObject);
    if (err) {
      dispatch(setAllTasks({}));
    }
  };

  const styleCell = {
    maxWidth: "80px",
    width: "80px",
    overflow: "hidden !important",
    textOverflow: "ellipsis",
  };
  function camelize(str) {
    return (
      str &&
      str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "")
    );
  }
  const getItemStyle = (snapshot, draggableStyle) => {
    const transform = draggableStyle.transform;
    return {
      ...draggableStyle,
      userSelect: "none",
      background: themeMode === "dark" && "#2a2e34",
      opacity: snapshot.isDragging && "0.7",
      pointerEvents: "auto",
      cursor: snapshot.isDragging ? "all-scroll" : "auto",
      borderBottom: themeMode === "dark" && `1px solid #384047`,
      overflow: "hidden",
      transform:
        transform &&
        `translate(0, ${transform.substring(
          transform.indexOf(",") + 1,
          transform.indexOf(")")
        )})`,
    };
  };

  useEffect(() => {
    const getMember = async () => {
      allMembers.map((member) => {
        if (member.id === ta[camelize(tableColHeading[0])]) {
          setAssignee(member);
        }
      });
    };
    if (ta[camelize(tableColHeading[0])]) {
      getMember();
    }
  }, [task]);

  return (
    <TableRow
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={getItemStyle(snapshot, provided.draggableProps.style)}
      {...provided.dragHandleProps}
      sx={{
        "& .MuiTableCell-root": {
          padding: "8px 0 8px 0",
          height: "41px",
          borderBottom: "none",
        },
        "&:hover .MuiSvgIcon-root": {
          display: "inline-block",
        },
      }}
    >
      <TableCell
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            minWidth: 15,
            width: 45,
            height: 36,
            position: "absolute",
            left: "-45px",
            top: "0",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            "& .MuiSvgIcon-root": {
              display: "none",
            },
            "&:hover .MuiSvgIcon-root": {
              display: "inline-block",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 15,
              height: 36,
              alignItems: "center",
            }}
            {...provided.dragHandleProps}
          >
            {groupBy.toLowerCase() !== "none" && (
              <DragIndicatorIcon
                tabIndex={-1}
                sx={{
                  height: "100%",
                  fontSize: "20px",
                  cursor: "move",
                  "&:focus": {
                    outline: "0",
                  },
                }}
              />
            )}
          </ListItemIcon>
        </Stack>
        <Button
          id={"Status"}
          onClick={handleClickStatus}
          title={"Status"}
          aria-controls={open[3] ? "Status" : undefined}
          aria-haspopup="true"
          aria-expanded={open[3] ? "true" : undefined}
          sx={{
            backgroundColor: allStatus[status],
            height: 12,
            minWidth: 12,
            margin: "0 11px",
            padding: 0,
            "&:hover": {
              backgroundColor: allStatus[status],
            },
          }}
        />
        <DropdownMenu
          id={"Status-Menu"}
          btnId={"Status"}
          handleClose={handleCloseStatus}
          handelClick={setStatusState}
          anchorEl={anchorElStatus}
          open={open[3]}
          items={Object.keys(allStatus)}
          icon_color={Object.keys(allStatus).map((key) => allStatus[key])}
          avatarIcon={SquareRoundedIcon}
          divider
          sxMenuList={{
            padding: 0,
          }}
          sxMenu={{
            width: "100%",
            margin: "0",
            "&:hover": {
              backgroundColor: "#2b343b",
              borderRadius: "0",
            },
          }}
          sxIcon={{
            minWidth: "12px",
            height: "12px",
          }}
          sxMenuItem={{
            fontSize: "12px",
          }}
        />
        <Typography
          onClick={() => !snapshot.isDragging && console.log("Hello")}
          sx={{
            width: "100%",
            fontWeight: 400,
            fontSize: "13.5px",
          }}
        >
          {ta.taskName}
        </Typography>
      </TableCell>
      <TableCell sx={styleCell}>
        {TaskRowCell[camelize(tableColHeading[0])]({
          handleClickAssignee,
          setAssigneeState,
          assignee,
          handleCloseAssignee,
          anchorElAssignee,
          open,
          teamsMembersDetail,
          taskKey,
          handleClickPriority,
          priority,
          priorities,
          handleClosePriority,
          setPriorityState,
          anchorElPriority,
          ta,
        })}
      </TableCell>
      <TableCell sx={styleCell}>
        {TaskRowCell[camelize(tableColHeading[1])]({
          handleClickAssignee,
          setAssigneeState,
          assignee,
          handleCloseAssignee,
          anchorElAssignee,
          open,
          teamsMembersDetail,
          taskKey,
          handleClickPriority,
          priority,
          priorities,
          handleClosePriority,
          setPriorityState,
          anchorElPriority,
          ta,
        })}
      </TableCell>
      <TableCell sx={styleCell}>
        {TaskRowCell[camelize(tableColHeading[2])]({
          handleClickAssignee,
          setAssigneeState,
          assignee,
          handleCloseAssignee,
          anchorElAssignee,
          open,
          teamsMembersDetail,
          taskKey,
          handleClickPriority,
          priority,
          priorities,
          handleClosePriority,
          setPriorityState,
          anchorElPriority,
          ta,
        })}
      </TableCell>
    </TableRow>
  );
};

export default TasksRow;
