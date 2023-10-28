const ENDPOINTS = {
  LOGIN: "/signin",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD:"/reset-password/:resetToken",
  CHANGE_PASSWORD:"/change-password",
  GOOGLE: "/google",
  UPDATE_USER: "/update-user/:id",
  DELETE_USER: "/delete-user/:id",
  CREATE_LISTING: "/create-listing",
  GET_USER_LISTING:"/listings/:userId",
  GET_LISTING: "/:listingId",
  DELETE_LISTING: "/delete/:listingId",
  UPDATE_LISTING: "/update-listing/:listingId",
};
const APITYPE = {
  USER: "/api/user",
  AUTH: "/api/auth",
  LISTING: "/api/listing",
};
export { ENDPOINTS, APITYPE };
