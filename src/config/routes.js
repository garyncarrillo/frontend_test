import { useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";


//components
import Login  from "../components/Login"
import Register  from "../components/Register"
import Dashboard  from "../components/Dashboard"
import NotFound from "../components/NotFound";


export const AppRoutes = () => {
    const routes = useRoutes([
      { path: "/sign_in", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/",
        element: (
          <PrivateRoute>
              <Dashboard />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> }
    ]);
  
    return routes;
  };
  