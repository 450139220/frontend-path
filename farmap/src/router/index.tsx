import { lazy } from "react";
import { BrowserRouter, useRoutes, type RouteObject } from "react-router";

const Home = lazy(() => import("@/views/home"));
const Login = lazy(() => import("@/views/login"));
const NotFound = lazy(() => import("@/views/404"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
];

function MiddleRoutes() {
  return useRoutes(routes);
}

export default function WebRoutes() {
  return (
    <BrowserRouter>
      <MiddleRoutes />
    </BrowserRouter>
  );
}
