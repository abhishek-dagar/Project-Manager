import {
  TableRow,
  TableCell,
  ListItemIcon,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import CancelIcon from "@mui/icons-material/Cancel";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import IconButton from "../../common/IconBtn";
import userApi from "../../../api/modules/user.api";
import DropdownMenu from "../../common/DropdownMenu";

const TasksRow = ({
  task,
  ta,
  tableColHeading,
  provided,
  snapshot,
  taskKey,
}) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const { teamsMembersDetail } = useSelector((state) => state.teams);

  const [assignee, setAssignee] = useState();
  const [priority, setPriority] = useState();
  const [anchorElAssignee, setAnchorElAssignee] = useState(null);
  const [anchorElDueDate, setAnchorElDueDate] = useState(null);
  const [anchorElPriority, setAnchorElPriority] = useState(null);

  const open = [
    Boolean(anchorElAssignee),
    Boolean(anchorElDueDate),
    Boolean(anchorElPriority),
  ];
  const priorities = {
    Urgent: "red",
    High: "yellow",
    Normal: "#6fddff",
    Low: "#d8d8d8",
    Clear: "#ff8176",
  };
  // console.log(priorities[priorities]);

  const handleClickAssignee = (event) => {
    setAnchorElAssignee(event.currentTarget);
  };
  const handleCloseAssignee = () => {
    setAnchorElAssignee(null);
  };
  const setAssigneeState = (value) => {
    setAssignee(value);
  };
  const handleClickPriority = (event) => {
    setAnchorElPriority(event.currentTarget);
  };
  const handleClosePriority = () => {
    setAnchorElPriority(null);
  };
  const setPriorityState = (value) => {
    if (value == "Clear") {
      setPriorityState();
    } else {
      setPriority(value);
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
      const { response, err } = await userApi.getMemberDetail(
        ta[camelize(tableColHeading[0])]
      );
      if (response) {
        setAssignee(response);
      }
      if (err) {
        setAssignee();
      }
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
          </ListItemIcon>
        </Stack>
        <Button
          onClick={() => console.log("Status")}
          sx={{
            backgroundColor: task.headingColor,
            height: 12,
            minWidth: 12,
            margin: "0 11px",
            padding: 0,
            "&:hover": {
              backgroundColor: task.headingColor,
            },
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
        <IconButton
          id="Assignee"
          click={handleClickAssignee}
          handelClick={setAssigneeState}
          badgeIcon={assignee ? CancelIcon : AddCircleOutlinedIcon}
          avatarIcon={PersonOutlineOutlinedIcon}
          outline
          transparent
          user={assignee && true}
          letter={assignee ? assignee.displayName[0] : ""}
          avatar_color={assignee ? assignee.avatarColor : ""}
          title={!assignee ? "Assign" : ""}
          aria-controls={open[0] ? "Assignee" : undefined}
          aria-haspopup="true"
          aria-expanded={open[0] ? "true" : undefined}
        />
        <DropdownMenu
          id={"Assignee-Menu"}
          btnId={"Assignee"}
          handleClose={handleCloseAssignee}
          anchorEl={anchorElAssignee}
          open={open[0]}
          handelClick={setAssigneeState}
          search
          items={
            teamsMembersDetail[taskKey]
              ? teamsMembersDetail[taskKey].map((member) => member)
              : []
          }
          colors={
            teamsMembersDetail[taskKey]
              ? teamsMembersDetail[taskKey].map((member) => member.avatarColor)
              : []
          }
        />
      </TableCell>
      <TableCell sx={styleCell}>
        {ta[camelize(tableColHeading[1])] || (
          <IconButton
            click={() => console.log(tableColHeading[1])}
            avatarIcon={CalendarTodayOutlinedIcon}
            transparent
            title={
              !assignee ||
              (assignee && !assignee[ta[camelize(tableColHeading[1])]])
                ? "Due Date"
                : ""
            }
          />
        )}
      </TableCell>
      <TableCell sx={styleCell}>
        <IconButton
          id={"Priority"}
          click={handleClickPriority}
          avatarIcon={priority ? FlagIcon : FlagOutlinedIcon}
          icon_color={priorities[priority]}
          transparent
          title={
            !assignee ||
            (assignee && !assignee[ta[camelize(tableColHeading[2])]])
              ? "Priority"
              : ""
          }
          aria-controls={open[0] ? "Priority" : undefined}
          aria-haspopup="true"
          aria-expanded={open[0] ? "true" : undefined}
        />
        <DropdownMenu
          id={"Priority-Menu"}
          btnId={"Priority"}
          handleClose={handleClosePriority}
          handelClick={setPriorityState}
          anchorEl={anchorElPriority}
          open={open[2]}
          items={Object.keys(priorities)}
          icon_color={Object.keys(priorities).map((key) => priorities[key])}
          avatarIcon={FlagIcon}
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
        />
      </TableCell>
    </TableRow>
  );
};

export default TasksRow;
