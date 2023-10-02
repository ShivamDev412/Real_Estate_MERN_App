import React from "react";
import ENDPOINTS from "./utils/endpoints";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const HomePage = React.lazy(() => import("./pages/Home"));
const SignupPage = React.lazy(() => import("./pages/SignUp"));
const SigninPage = React.lazy(() => import("./pages/SignIn"));
const ProfilePage = React.lazy(() => import("./pages/Profile"));
const AboutPage = React.lazy(() => import("./pages/About"));

function Router() {
  const { HOME, PROFILE, SIGNUP, SIGNIN, ABOUT } = ENDPOINTS;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={SIGNIN} element={<SigninPage />} />
        <Route path={SIGNUP} element={<SignupPage />} />
        <Route path={PROFILE} element={<ProfilePage />} />
        <Route path={ABOUT} element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
