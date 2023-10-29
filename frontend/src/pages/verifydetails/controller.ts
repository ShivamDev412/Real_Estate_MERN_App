import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateVerifyUserError } from "../../utils/validations";
import { RootState } from "../../redux/reducers";
import { useSelector } from "react-redux";
import Toast from "../../utils/toastMessage";
import { postApiCall } from "../../utils/apiCalls";
import ENDPOINTS from "../../utils/endpoints";
import { signInSuccess } from "../../redux/slice/user/userSlice";
export const useVerifyUser = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [pageTitle, setPageTitle] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [verifyUser, setVerifyUser] = useState("");
  const [error, setError] = useState("");
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [countryCode, setCountryCode] = useState(
    currentUser.data.user.phoneNo?.split(" ")[0] !== ""
      ? currentUser.data.user.phoneNo?.split(" ")[0]
      : "+1"
  );
  const countryCodeValue = (countryCode: string) => {
    setCountryCode(countryCode);
  };
  useEffect(() => {
    const pageName = pathname.split("/")[1];
    if (pageName === "verify-email") {
      setPageTitle("Email");
      setVerifyUser(currentUser.data.user.email);
    } else if (pageName === "verify-phone-number") {
      setPageTitle("Phone Number");
      setVerifyUser(currentUser.data.user.phoneNo?.split(" ")[1]);
    }
  }, [pathname]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerifyUser(e.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verifyUserError = validateVerifyUserError(verifyUser, pageTitle);
    setError(verifyUserError);
    if (verifyUserError === "") {
      try {
        setSendOtpLoading(true);
        const res = await postApiCall(
          `/api/user/send-otp_to_${
            pageTitle === "Email" ? "email" : "phone_number"
          }`,
          {
            [pageTitle === "Email" ? "email" : "phoneNo"]:
              pageTitle === "Email"
                ? verifyUser
                : `${countryCode} ${verifyUser}`,
          }
        );
        if (res.success) {
          Toast(res.message, "success");
          setSendOtpLoading(false);
          setShowOtpInput(true);
        } else {
          setSendOtpLoading(false);
          Toast(res.message, "error");
        }
      } catch (e: any) {
        setSendOtpLoading(false);
        Toast(e.message, "error");
      }
    }
  };
  const getOtpToVerify = async (otp: string) => {
    if (otp.length > 0) {
      try {
        const res = await postApiCall(
          `/api/user/verify-${
            pageTitle === "Email" ? "email" : "phone_number"
          }`,
          {
            [pageTitle === "Email" ? "email" : "phoneNo"]:
              pageTitle === "Email"
                ? verifyUser
                : `${countryCode} ${verifyUser}`,
            verificationOTP: otp,
          }
        );
        if (res.success) {
          Toast(res.message, "success");
          setShowOtpInput(false);
          dispatch(
            signInSuccess({
              ...currentUser,
              data: {
                ...currentUser.data,
                user: {
                  ...currentUser.data.user,
                  [pageTitle === "Email" ? "emailVerified" : "phoneNoVerified"]:
                    true,
                },
              },
            })
          );
          navigation(ENDPOINTS.SETTINGS);
        } else {
          Toast(res.message, "error");
        }
      } catch (error: any) {
        Toast(error.message, "error");
      }
    }
  };
  const resendOtp = async () => {
    try {
      const res = await postApiCall(
        `/api/user/send-otp_to_${
          pageTitle === "Email" ? "email" : "phone_number"
        }`,
        {
          [pageTitle === "Email" ? "email" : "phoneNo"]:
            pageTitle === "Email" ? verifyUser : `${countryCode} ${verifyUser}`,
        }
      );
      if (res.success) {
        Toast(res.message, "success");
      } else {
        Toast(res.message, "error");
      }
    } catch (error: any) {
      Toast(error.message, "error");
    }
  };
  return {
    pageTitle,
    handleSubmit,
    error,
    verifyUser,
    handleInputChange,
    sendOtpLoading,
    countryCode,
    countryCodeValue,
    showOtpInput,
    getOtpToVerify,
    resendOtp,
  };
};
