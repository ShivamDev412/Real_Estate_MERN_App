import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import ENDPOINTS from "../../utils/endpoints";
import { postApiCall } from "../../utils/apiCalls";
import Toast from "../../utils/toastMessage";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/slice/userSlice";
import { RootState } from "../../redux/reducers";
import { app } from "../../utils/firebaseAuth";
import { loginInitialState } from "../../utils/constant";

export const useSignInController = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState(loginInitialState);
  const [formError, setFormError] = useState(loginInitialState);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  function validateForm(email: string, password: string) {
    const errors: any = {};
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }
    // Validate password
    if (!password || password.trim() === "") {
      errors.password = "Password is required.";
    }
    return errors;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(user.email, user.password);
    setFormError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(signInStart());
        // setLoading(true);
        const res = await postApiCall("/api/auth/signin", user);
        if (res.success) {
          dispatch(signInSuccess(res));
          Cookies.set("access-token", res.data.token, { expires: 7 });
          Toast("Sign-in successful", "success");
          navigate(ENDPOINTS.HOME);
        } else {
          dispatch(signInFailure(res.message));
          Toast(res.message, "error");
        }
        // setLoading(false);
      } catch (e: any) {
        dispatch(signInFailure(e.message));
        // setLoading(false);
        Toast(e.message, "error");
      }
    }
  };
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await postApiCall("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      });
      if (res) {
        dispatch(signInSuccess(res));
        Cookies.set("access-token", res.data.token, { expires: 7 });
        Toast("Sign-in successful", "success");
        navigate(ENDPOINTS.HOME);
      } else {
        dispatch(signInFailure(res.message));
        Toast(res.message, "error");
      }
    } catch (e: any) {
      dispatch(signInFailure(e.message));
      Toast(e.message, "error");
    }
  };
  return {
    formError,
    user,
    loading,
    handleInputChange,
    handleSubmit,
    handleGoogleAuth,
  };
};
