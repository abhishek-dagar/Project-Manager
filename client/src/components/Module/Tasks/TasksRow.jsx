import {
  TableRow,
  TableCell,
  ListItemIcon,
  Button,
  Stack,
} from "@mui/material";

import { useSelector } from "react-redux";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const TasksRow = ({ task, ta, tableColHeading, provided, snapshot }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
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
      cursor: snapshot.isDragging && "all-scroll",
      transform:
        transform &&
        `translate(0, ${transform.substring(
          transform.indexOf(",") + 1,
          transform.indexOf(")")
        )})`,
    };
  };

  return (
    <TableRow
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={getItemStyle(snapshot, provided.draggableProps.style)}
      sx={{
        "& .MuiTableCell-root": {
          padding: "8px 0 8px 0",
          borderBottom: "none !important",
        },
        "&:hover .MuiSvgIcon-root": {
          display: "inline-block",
        },
      }}
    >
      <TableCell
        sx={{
          width: "69.2%",
          position: "relative",
        }}
      >
        <Stack
          sx={{
            minWidth: 15,
            width: 45,
            height: 36,
            position: "absolute",
            // left: "-7%",
            left: "-45px",
            top: "0",
            // backgroundColor:"red",
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
        ></Button>
        {ta.taskName}
      </TableCell>
      <TableCell>{ta[camelize(tableColHeading[0])]}</TableCell>
      <TableCell>{ta[camelize(tableColHeading[1])]}</TableCell>
      <TableCell>{ta[camelize(tableColHeading[2])]}</TableCell>
    </TableRow>
  );
};

export default TasksRow;
