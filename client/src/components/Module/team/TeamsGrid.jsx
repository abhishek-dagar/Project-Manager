import { Stack, Box, useTheme } from "@mui/material";

import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { toast } from "react-toastify";

import ListView from "./ListView";

const TeamsGrid = ({ teams, searchQuery, tasks, updateTasks }) => {
  const theme = useTheme();

  const [tableColHeading, setTableColHeading] = useState([
    "Assignee",
    "Due Date",
    "Priority",
  ]);

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const draggableIdList = draggableId.split("-");
    if (draggableIdList[0] === "Heading") {
      const newHeadingArray = Array.from(tableColHeading);
      newHeadingArray.splice(source.index, 1);
      newHeadingArray.splice(
        destination.index,
        0,
        tableColHeading[source.index]
      );
      setTableColHeading(newHeadingArray);
    } else {
      const newTaskObject = JSON.parse(JSON.stringify(tasks));

      // Getting Source List
      var sourceList = source.droppableId.split("-").splice(2, 2);
      var sourceObject = newTaskObject[sourceList[0]][sourceList[1]];
      var sourceValue = sourceObject.tasks.splice(source.index, 1)[0];

      // If source an destination in one tab
      if (destination.droppableId === source.droppableId) {
        sourceObject.tasks.splice(destination.index, 0, sourceValue);
      }
      // If source an destination in different tab
      else {
        var destinationList = destination.droppableId.split("-").splice(2, 2);
        var destinationObject =
          newTaskObject[destinationList[0]][destinationList[1]];
        destinationObject.tasks.splice(destination.index, 0, sourceValue);
      }
      updateTasks({ ...newTaskObject });
      toast.success("Task updated");
    }
  }
  return (
    <Stack>
      <DragDropContext onDragEnd={handleDragEnd}>
        {teams.map((team, index) => (
          <Box
            key={index}
            sx={{
              display: "block",
              width: "100%",
              border: `1px solid ${theme.palette.borderColor.box}`,
              borderRadius: "7px",
              marginBottom: "3%",
            }}
          >
            <Stack
              direction={"row"}
              flexWrap="wrap"
              justifyContent={"flex-start"}
              sx={{
                padding: "0px 15px 0 25px",
                height: "100%",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ListView
                team={team}
                tasks={tasks[team.id]}
                searchQuery={searchQuery}
                tableColHeading={tableColHeading}
              />
            </Stack>
          </Box>
        ))}
      </DragDropContext>
    </Stack>
  );
};

export default TeamsGrid;
