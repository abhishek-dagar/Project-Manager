import IconBtn from "../../common/IconBtn";
import React from "react";
import DropdownMenu from "../../common/DropdownMenu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import CancelIcon from "@mui/icons-material/Cancel";

const TaskRowCell = {
  assignee: ({
    handleClickAssignee,
    setAssigneeState,
    assignee,
    handleCloseAssignee,
    anchorElAssignee,
    open,
    teamsMembersDetail,
    taskKey,
  }) => {
    return (
      <>
        <IconBtn
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
      </>
    );
  },
  priority: ({
    handleClickPriority,
    priority,
    priorities,
    assignee,
    open,
    handleClosePriority,
    setPriorityState,
    anchorElPriority,
    ta,
  }) => {
    return (
      <>
        <IconBtn
          id={"Priority"}
          click={handleClickPriority}
          avatarIcon={priority ? FlagIcon : FlagOutlinedIcon}
          icon_color={priorities[priority]}
          transparent
          title={
            !assignee || (assignee && !assignee[ta["priority"]])
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
      </>
    );
  },
  dueDate: ({ assignee, ta }) => {
    return (
      <>
        {ta && (
          <IconBtn
            click={() => console.log("dueDate")}
            avatarIcon={CalendarTodayOutlinedIcon}
            transparent
            title={
              !assignee || (assignee && !assignee[ta["dueDate"]])
                ? "Due Date"
                : ""
            }
          />
        )}
      </>
    );
  },
};

export default TaskRowCell;
