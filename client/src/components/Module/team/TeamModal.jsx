import { Box, Divider, Modal, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setTeamModal } from "../../../redux/features/teamsSlice";
import TeamForm from "./TeamForm";

const TeamModal = () => {
  const { teamModal } = useSelector((state) => state.teams);
  const { themeMode } = useSelector((state) => state.themeMode);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setTeamModal(false));

  return (
    <Modal open={teamModal} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-80%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
          zIndex: "999",
        }}
      >
        <Box
          boxShadow={
            themeMode === "dark"
              ? "0px 0px 4px 0px rgba(0,255,255,0.7)"
              : "0px 0px 10px 0px rgba(0,0,0,0.7)"
          }
          sx={{
            padding: 0,
            backgroundColor: "background.paper",
            height: "100%",
            borderRadius: "7px",
            overflow: "hidden",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                padding: "20px",
              }}
            >
              Add New Team
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography
              variant="h5"
              sx={{
                padding: "20px",
              }}
            >
              <TeamForm />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TeamModal;
