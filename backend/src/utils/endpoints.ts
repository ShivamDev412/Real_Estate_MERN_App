const ENDPOINTS = {
  // Auth
  LOGIN: "/signin",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD:"/reset-password/:resetToken",
  GOOGLE: "/google",

  // User
  CHANGE_PASSWORD:"/change-password",
  UPDATE_USER: "/update-user/:id",
  DELETE_USER: "/delete-user/:id",
  SEND_OTP_TO_EMAIL: "/send-otp_to_email",
  RESEND_SEND_OTP_TO_EMAIL: "/resend-otp_to_email",
  VERIFY_EMAIL: "/verify-email",
  SEND_OTP_TO_PHONE: "/send-otp_to_phone_number",
  VERIFY_PHONE_NUMBER: "/verify-phone_number",
  RESEND_SEND_OTP_TO_PHONE: "/resend-otp_to_phone_number",
  // Listing
  CREATE_LISTING: "/create-listing",
  GET_USER_LISTING:"/listings",
  GET_LISTING: "/:listingId",
  DELETE_LISTING: "/delete/:listingId",
  UPDATE_LISTING: "/update-listing/:listingId",

  // All Listings
  ALL_LISTINGS: "/",
  LISTING_DETAIL: "/listing-detail/:listingId",
  ADD_LISTING_REVIEWS: "/add-listing-review/:listingId"
};
const APITYPE = {
  USER: "/api/user",
  AUTH: "/api/auth",
  USER_LISTING: "/api/user-listings",
  LISTINGS: "/api/listings"
};
export { ENDPOINTS, APITYPE };
