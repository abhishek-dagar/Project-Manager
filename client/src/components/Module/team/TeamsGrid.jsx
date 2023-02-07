import { Stack, Box, useTheme } from "@mui/material";
import ListView from "./ListView";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { toast } from "react-toastify";

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
      var sourceList = source.droppableId.split("-").splice(2, 2);
      var destinationList = destination.droppableId.split("-").splice(2, 2);
      const newTaskObject = tasks;
      var sourceObject = newTaskObject[sourceList[0]][sourceList[1]];
      var destinationObject =
        newTaskObject[destinationList[0]][destinationList[1]];
      destinationObject.tasks.splice(
        destination.index,
        0,
        sourceObject.tasks[source.index]
      );
      sourceObject.tasks.splice(source.index, 1);
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
                handleDragEnd={handleDragEnd}
              />
            </Stack>
          </Box>
        ))}
      </DragDropContext>
    </Stack>
  );
};

export default TeamsGrid;
