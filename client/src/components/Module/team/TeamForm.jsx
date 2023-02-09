import {
  Alert,
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Select,
  OutlinedInput,
  Chip,
  Avatar,
  FormHelperText,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import CancelIcon from "@mui/icons-material/Cancel";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import teamApi from "../../../api/modules/team.api";
import { setTeamModal, setTeams } from "../../../redux/features/teamsSlice";

const TeamForm = () => {
  const { teams, allMembers } = useSelector((state) => state.teams);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCreateRequest, setIsCreateRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const teamForm = useFormik({
    initialValues: {
      teamName: "",
      members: [],
    },
    validationSchema: Yup.object({
      teamName: Yup.string().required("Team Name is required"),
      members: Yup.array()
        .required("Team members is required")
        .min(1, "Team members is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsCreateRequest(true);
      values = { ...values, managerId: user.id };

      const { response, err } = await teamApi.createTeam(values);

      if (response) {
        teamForm.resetForm();
        dispatch(setTeams([...teams, response]));
        dispatch(setTeamModal(false));
        navigate(`/teams/${response.id}`);
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
      dispatch(setGlobalLoading(false));
      setIsCreateRequest(false);
    },
  });
  return (
    <Box component="form" onSubmit={teamForm.handleSubmit}>
      <Stack
        spacing={3}
        sx={{
          "& .MuiTextField-root, .MuiInputBase-root": {
            marginTop: "8px",
          },
          "& .MuiFormHelperText-root": {
            marginTop: "0",
          },
        }}
      >
        <Typography>Team Name</Typography>
        <TextField
          type="text"
          placeholder="Team Name"
          name="teamName"
          fullWidth
          value={teamForm.values.teamName}
          onChange={teamForm.handleChange}
          autoComplete="off"
          color="success"
          error={
            teamForm.touched.teamName && teamForm.errors.teamName !== undefined
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "12px",
              },
            },
          }}
          helperText={teamForm.touched.teamName && teamForm.errors.teamName}
        />
        <Typography>Team Assignee</Typography>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name="members"
          value={teamForm.values.members}
          onChange={teamForm.handleChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          error={
            teamForm.touched.members && teamForm.errors.members !== undefined
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, index) => {
                value = allMembers.filter((member) => member.id === value);
                const handleDelete = () => {
                  var memberArray = teamForm.values.members;
                  if (value) {
                    var index = memberArray.indexOf(value[0].id);
                    if (index != -1) {
                      memberArray.splice(index, 1);
                      teamForm.setFieldValue("members", memberArray);
                    }
                  }
                };
                return (
                  <Chip
                    key={index}
                    label={value[0].displayName}
                    avatar={<Avatar>{value[0].displayName[0]}</Avatar>}
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={() => {
                      handleDelete();
                    }}
                  />
                );
              })}
            </Box>
          )}
        >
          {allMembers.map((member, index) => (
            <MenuItem key={index} value={member.id}>
              {member.displayName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText sx={{ color: "#f44336" }}>
          {teamForm.touched.members && teamForm.errors.members}
        </FormHelperText>
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isCreateRequest}
      >
        Create Team
      </LoadingButton>
      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default TeamForm;
