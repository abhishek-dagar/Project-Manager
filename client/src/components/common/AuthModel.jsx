import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Logo from "./Logo";

const actionState = {
  signIn: "signIn",
  signUp: "signUp",
};

const AuthModal = () => {
  const { authModalOpen, signInOrSignUp } = useSelector(
    (state) => state.authModal
  );
  const { themeMode } = useSelector((state) => state.themeMode);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
          zIndex:"999",
        }}
      >
        <Box
          boxShadow={
            themeMode === "dark"
              ? "0px 0px 4px 0px rgba(0,255,255,0.7)"
              : "0px 0px 10px 0px rgba(0,0,0,0.7)"
          }
          sx={{
            padding: 4,
            backgroundColor: "background.paper",
            borderRadius: "25px",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>
          {signInOrSignUp === actionState.signIn && <SignInForm />}
          {signInOrSignUp === actionState.signUp && <SignUpForm />}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
