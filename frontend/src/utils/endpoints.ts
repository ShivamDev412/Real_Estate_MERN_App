const ENDPOINTS = {
  HOME: "/",
  LISTING_DETAIL: "/listing-detail/:id",
  LISTINGS: "/listings",

  PROFILE: "/profile",
  UPDATE_PROFILE: "/update-profile",

  SIGNUP: "/signup",
  SIGNIN: "/signin",
  FORGOT_PASSWORD: "/forgot-password",

  ABOUT: "/about",

  SETTINGS: "/settings",
  CHANGE_PASSWORD: "/change-password",
  RESET_PASSWORD: "/reset-password/:token",
  VERIFY_EMAIL: "/verify-email",
  VERIFY_PHONE_NUMBER: "/verify-phone-number",
  
  USER_LISTING_DETAIL: "user-listing/:id",
  USER_LISTINGS: "/user-listings",
  CREATE_LISTING: "/create-listing",
  EDIT_LISTING: "/edit-listing/:id",


};
export default ENDPOINTS;
export const API_TYPE = {
  USER: "/api/user",
  AUTH: "/api/auth",
  USER_LISTING: "/api/user-listings",
  LISTINGS: "/api/listings"
}
