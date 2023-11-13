import express from "express";
import { ENDPOINTS } from "../utils/endpoints";
import {
  updateUserProfile,
  deleteUser,
  showUserListings,
  changePassword,
  sendVerificationEmail,
  verifyEmailWithOTP,
  resendVerificationEmail,
  sendVerificationToPhoneNumber,
  verifyPhoneNumberWithOTP,
  resendVerificationToPhoneNumber,
} from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";
import { getNotifications } from "../controllers/user.notifications";
const route = express.Router();

route.post(ENDPOINTS.UPDATE_USER, verifyToken, updateUserProfile);
route.delete(ENDPOINTS.DELETE_USER, verifyToken, deleteUser);
route.get(ENDPOINTS.GET_USER_LISTING, verifyToken, showUserListings);
route.put(ENDPOINTS.CHANGE_PASSWORD, verifyToken, changePassword);
route.post(ENDPOINTS.SEND_OTP_TO_EMAIL, verifyToken, sendVerificationEmail);
route.post(ENDPOINTS.VERIFY_EMAIL, verifyToken, verifyEmailWithOTP);
route.post(
  ENDPOINTS.RESEND_SEND_OTP_TO_EMAIL,
  verifyToken,
  resendVerificationEmail
);
route.post(
  ENDPOINTS.SEND_OTP_TO_PHONE,
  verifyToken,
  sendVerificationToPhoneNumber
);
route.post(
  ENDPOINTS.VERIFY_PHONE_NUMBER,
  verifyToken,
  verifyPhoneNumberWithOTP
);
route.post(
  ENDPOINTS.RESEND_SEND_OTP_TO_PHONE,
  verifyToken,
  resendVerificationToPhoneNumber
);
route.get(ENDPOINTS.GET_NOTIFICATIONS, verifyToken, getNotifications);
export default route;
