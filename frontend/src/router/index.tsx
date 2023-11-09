import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ENDPOINTS from "../utils/endpoints";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

// Home Routes Page
const HomePage = React.lazy(() => import("../pages/home"));

// Auth Route Pages
const SignUpPage = React.lazy(() => import("../pages/signUp"));
const SignInPage = React.lazy(() => import("../pages/signIn"));
const ForgotPasswordPage = React.lazy(() => import("../pages/forgotPassword"));

// Profile Route Pages
const UpdateProfilePage = React.lazy(
  () => import("../pages/profile/updateProfile")
);

const AboutPage = React.lazy(() => import("../pages/About"));

// User Listing routes
const UserListingPage = React.lazy(() => import("../pages/userListing"));
const CreateListing = React.lazy(() => import("../pages/createListing"));
const EditListing = React.lazy(() => import("../pages/createListing"));
const UserListingDetailPage = React.lazy(() => import("../pages/userListing/listingDetail"));

// Settings Route Pages
const SettingsPage = React.lazy(() => import("../pages/settings"));
const ChangePasswordPage = React.lazy(() => import("../pages/changePassword"));
const ResetPasswordPage = React.lazy(
  () => import("../pages/forgotPassword/resetPassword")
);
const VerifyUser = React.lazy(() => import("../pages/verifydetails"));
const ListingDetailPage = React.lazy(() => import("../pages/home/listingsDetail"));

function Router() {
  const {
    HOME,
    SIGNUP,
    SIGNIN,
    ABOUT,
    CREATE_LISTING,
    LISTING_DETAIL,
    USER_LISTINGS,
    EDIT_LISTING,
    SETTINGS,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    UPDATE_PROFILE,
    VERIFY_EMAIL,
    VERIFY_PHONE_NUMBER,
    USER_LISTING_DETAIL
  } = ENDPOINTS;
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={SIGNIN} element={<SignInPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={SIGNUP} element={<SignUpPage />} />
        </Route>

        {/* Private Routes */}
        {/* <Route element={<PrivateRoute />}>
          <Route path={PROFILE} element={<ProfilePage />} />
        </Route> */}
        <Route element={<PrivateRoute />}>
          <Route path={UPDATE_PROFILE} element={<UpdateProfilePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={ABOUT} element={<AboutPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={CREATE_LISTING} element={<CreateListing />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={EDIT_LISTING} element={<EditListing />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={USER_LISTING_DETAIL} element={<UserListingDetailPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={USER_LISTINGS} element={<UserListingPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={SETTINGS} element={<SettingsPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={VERIFY_EMAIL} element={<VerifyUser />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={VERIFY_PHONE_NUMBER} element={<VerifyUser />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={CHANGE_PASSWORD} element={<ChangePasswordPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={LISTING_DETAIL} element={<ListingDetailPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
