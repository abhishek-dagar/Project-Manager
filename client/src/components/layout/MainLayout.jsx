import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AuthModal from "../common/AuthModel";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import userApi from "../../api/modules/user.api";

import { useEffect } from "react";
import Topbar from "../common/Topbar";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) {
        dispatch(setUser(null));
        navigate("/")
      }
    };
    authUser();
  }, [dispatch]);
  return (
    <>
      {/* auth modal */}
      <AuthModal />
      {/* auth modal */}
      {/* Top bar */}
      <Topbar />
      {/* Top bar */}
      {/* main content */}
      <Box
        component={"main"}
        flexGrow={1}
        overflow="hidden"
        minHeight={"100vh"}
      >
        <Outlet />
      </Box>
      {/* main content */}
    </>
  );
};

export default MainLayout;
