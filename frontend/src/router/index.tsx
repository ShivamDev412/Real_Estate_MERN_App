import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ENDPOINTS from "../utils/endpoints";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
const HomePage = React.lazy(() => import("../pages/Home"));
const SignUpPage = React.lazy(() => import("../pages/SignUp"));
const SignInPage = React.lazy(() => import("../pages/SignIn"));
const ProfilePage = React.lazy(() => import("../pages/Profile"));
const AboutPage = React.lazy(() => import("../pages/About"));

function Router() {
  const { HOME, PROFILE, SIGNUP, SIGNIN, ABOUT } = ENDPOINTS;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SIGNIN} element={<PublicRoute />}>
          <Route element={<SignInPage />} />
        </Route>
        <Route path={SIGNUP} element={<PublicRoute />}>
          <Route element={<SignUpPage />} />
        </Route>
        <Route path={PROFILE} element={<PrivateRoute />}>
          <Route element={<ProfilePage />} />
        </Route>
        <Route path={ABOUT} element={<PrivateRoute />}>
          <Route element={<AboutPage />} />
        </Route>
        <Route path={HOME} element={<PrivateRoute />}>
          <Route element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
