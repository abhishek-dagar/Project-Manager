import { TableCell, Typography, Stack, ListItemIcon } from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import React from "react";

const TableCells = (props) => {
  const getItemStyle = (isDragging, draggableStyle) => {
    const transform = draggableStyle.transform;
    return {
      ...draggableStyle,
      maxWidth: "80px",
      width: "80px",
      transform:
        transform &&
        `translate(${transform.substring(
          transform.indexOf("(") + 1,
          transform.indexOf(",")
        )},0)`,
    };
  };
  return (
    <TableCell
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      // {...props.provided.dragHandleProps}
      style={getItemStyle(
        props.snapshot.isDragging,
        props.provided.draggableProps.style
      )}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          transition: "background .2s cubic-bezier(.785,.135,.15,.86) 0s",
          cursor: "pointer",
          height: "20px",
          borderRadius: "3px",
          "&:hover": {
            borderWidth: "0 1px",
            borderColor: "white",
            backgroundColor: "#4f5762",
            paddingLeft: 0,
            "& .MuiSvgIcon-root": {
              display: "flex",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 15,
          }}
          {...props.provided.dragHandleProps}
        >
          <DragIndicatorIcon
            tabIndex={-1}
            sx={{
              fontSize: "14px",
              cursor: "move",
              display: "none",
              "&:focus": {
                outline: "0",
              },
            }}
          />
        </ListItemIcon>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "light",
            userSelect: "none",
            paddingLeft: "1px",
            overflow: "hidden !important",
            textOverflow: "ellipsis",
          }}
        >
          {props.id}
        </Typography>
      </Stack>
    </TableCell>
  );
};

export default TableCells;
