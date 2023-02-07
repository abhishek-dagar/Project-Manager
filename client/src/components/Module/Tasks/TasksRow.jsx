import { TableRow, TableCell, ListItemIcon, Button } from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const TasksRow = ({ task, ta, tableColHeading, provided, snapshot }) => {
  function camelize(str) {
    return str && str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }
  const getItemStyle = (isDragging, draggableStyle) => {
    return {
      ...draggableStyle,
      userSelect: "none",
      background: "#2a2e34",
      opacity: isDragging && "0.7",
      pointerEvents: "auto",
      cursor: isDragging && "all-scroll",
    };
  };

  return (
    <TableRow
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      sx={{
        "& .MuiTableCell-root": {
          paddingBottom: "0",
          borderBottom: "none !important",
        },
      }}
    >
      <TableCell
        sx={{
          position: "relative",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 15,
            position: "absolute",
            left: "-2.5%",
            top: "12px",
          }}
          {...provided.dragHandleProps}
        >
          <DragIndicatorIcon
            tabIndex={-1}
            sx={{
              fontSize: "20px",
              cursor: "move",
              "&:focus": {
                outline: "0",
              },
            }}
          />
        </ListItemIcon>
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
