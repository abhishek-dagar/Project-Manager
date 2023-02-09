import { Alert, Box, MenuItem, Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setGlobalLoading } from "../../redux/features/globalLoadSlice";
import { setUser } from "../../redux/features/userSlice";

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      email: "",
      designation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(8, "email minimum 8 characters")
        .required("email is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      designation: Yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        window.location.reload();
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
      dispatch(setGlobalLoading(false));
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          // placeholder="username"
          label="email"
          name="email"
          fullWidth
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.email && signinForm.errors.email !== undefined
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "12px",
              },
            },
          }}
          helperText={signinForm.touched.email && signinForm.errors.email}
        />
        <TextField
          type="password"
          label="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "12px",
              },
            },
          }}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          id="select"
          type="designation"
          label="designation"
          name="designation"
          fullWidth
          value={signinForm.values.designation}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.designation &&
            signinForm.errors.designation !== undefined
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "12px",
              },
            },
          }}
          helperText={
            signinForm.touched.designation && signinForm.errors.designation
          }
          select
        >
          <MenuItem value="MANAGER">MANAGER</MenuItem>
          <MenuItem value="MEMBER">TEAM MEMBER</MenuItem>
        </TextField>
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>

      {/* <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button> */}

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

export default SigninForm;
