import { Stack, Box, useTheme } from "@mui/material";

import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import groupChange from "../../../Helper/groupChange.helper";
import { setAllTasks } from "../../../redux/features/teamsSlice";
import taskApi from "../../../api/modules/task.api";

import ListView from "./ListView";

const TeamsGrid = ({ teams, searchQuery, tasks, groupBy }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [tableColHeading, setTableColHeading] = useState([
    "Assignee",
    "Due Date",
    "Priority",
  ]);

  async function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    // if (groupBy.toLowerCase() === "none") {
    //   toast.error("Cannot move task to another team");
    //   return;
    // }
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
      // const {newTaskObject, sourceValue} = groupChange[groupBy.toLowerCase()]({tasks,destination,source})
      const newTaskObject = JSON.parse(JSON.stringify(tasks));

      // Getting Source List
      var sourceList = source.droppableId.split("-").splice(2, 2);
      var sourceObject = newTaskObject[sourceList[0]][sourceList[1]];
      var sourceValue = sourceObject.tasks.splice(source.index, 1)[0];

      var destinationList = destination.droppableId.split("-").splice(2, 2);
      var destinationObject =
        newTaskObject[destinationList[0]][destinationList[1]];

      if (sourceValue.team !== destinationObject.tasks[0].team) {
        toast.error("Cannot move task to another team");
        return;
      }

      const task = groupChange[groupBy.toLowerCase()]({
        sourceValue,
        destinationObject,
      });

      // If source an destination in one tab
      if (destination.droppableId === source.droppableId) {
        sourceObject.tasks.splice(destination.index, 0, task);
      }
      // If source an destination in different tab
      else {
        destinationObject.tasks.splice(destination.index, 0, task);
      }
      if (sourceObject.tasks.length === 0) {
        delete newTaskObject[sourceList[0]][sourceList[1]];
      }

      dispatch(setAllTasks({ ...newTaskObject }));
      toast.success("Task updated");
      const { err } = await taskApi.updateTask(task);
      if (err) {
        dispatch(setAllTasks({}));
      }
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
                groupBy={groupBy}
              />
            </Stack>
          </Box>
        ))}
      </DragDropContext>
    </Stack>
  );
};

export default TeamsGrid;
