import { TableCell, Typography, Stack, IconButton } from "@mui/material";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const TableCells = (props) => {
  return (
    <TableCell
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          width: "98px",
          transition: "background .2s cubic-bezier(.785,.135,.15,.86) 0s",
          cursor: "pointer",
          height: "20px",
          borderRadius: "3px",
          "&:hover": {
            borderWidth: "0 1px",
            borderColor: "white",
            backgroundColor: "#4f5762",
          },
        }}
      >
        <DragIndicatorIcon
          tabIndex={-1}
          sx={{
            fontSize: "14px",
            cursor: "move",
            "&:focus": {
              outline: "0",
            },
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "light",
            userSelect: "none",
          }}
        >
          {props.id}
        </Typography>
      </Stack>
    </TableCell>
  );
};

export default TableCells;
