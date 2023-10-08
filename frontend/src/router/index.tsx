import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ENDPOINTS from "../utils/endpoints";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
const HomePage = React.lazy(() => import("../pages/Home"));
const SignUpPage = React.lazy(() => import("../pages/signUp"));
const SignInPage = React.lazy(() => import("../pages/signIn"));
const ProfilePage = React.lazy(() => import("../pages/profile"));
const AboutPage = React.lazy(() => import("../pages/About"));

function Router() {
  const { HOME, PROFILE, SIGNUP, SIGNIN, ABOUT } = ENDPOINTS;
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={SIGNIN} element={<SignInPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path={SIGNUP} element={<SignUpPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={PROFILE} element={<ProfilePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route  path={ABOUT} element={<AboutPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={HOME} element={<HomePage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
