import Homepage from "../pages/Homepage";
import AppPage from "../pages/AppPage";
import ProtectedPage from "../components/common/ProtectedPage";
import TeamsPages from "../pages/TeamsPage";

export const routesGen = {
  home: "/",
};

const routes = [
  {
    index: true,
    element: <Homepage />,
    state: "home",
  },
  {
    path: "/",
    element: (
      <ProtectedPage>
        <AppPage />
      </ProtectedPage>
    ),
    state: "appPage",
  },
  {
    path: "/teams",
    element: (
      <ProtectedPage>
        <TeamsPages />
      </ProtectedPage>
    ),
    state: "teams",
  },
  {
    path: "/teams/:teamId",
    element: (
      <ProtectedPage>
        <TeamsPages />
      </ProtectedPage>
    ),
    state: "teams",
  },
];

export default routes;
