import { Stack, Box, useTheme } from "@mui/material";
import ListView from "./ListView";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const TeamsGrid = ({ teams, searchQuery, tasks }) => {
  const theme = useTheme();

  const [tableColHeading, setTableColHeading] = useState([
    "Assignee",
    "Due Date",
    "Priority",
  ]);

  function handleDragEnd(result) {
    const{destination, source, draggableId}=result;
    if(!destination) return;
    if(destination.draggableId===source.draggableId && destination.index===source.index) return;
    const draggableIdList= draggableId.split("-");
    if(draggableIdList[0]==="Heading"){
      console.log(result);
      const newHeadingArray = Array.from(tableColHeading);
      newHeadingArray.splice(source.index,1);
      newHeadingArray.splice(destination.index,0,tableColHeading[source.index]);
      setTableColHeading(newHeadingArray);
    }
  }
  return (
    <Stack>
      <DragDropContext
      onDragEnd={handleDragEnd}>
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
