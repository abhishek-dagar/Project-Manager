import routes from "./routes/routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import MainLayout from "./components/layout/MainLayout";
import PageWrapper from "./components/common/PageWrapper";

import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import themeConfigs from "./configs/theme.config";
import AOS from "aos";
import "aos/dist/aos.css";
import AppLayout from "./components/layout/AppLayout";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App({ token }) {
  const { themeMode } = useSelector((state) => state.themeMode);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* mui reset css */}
      <CssBaseline />

      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!token ? <MainLayout /> : <AppLayout token={token} />}
          >
            {routes.map((route, index) =>
              route.index && !token ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* app routes */}
    </ThemeProvider>
  );
}

export default App;
