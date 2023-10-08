import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/endpoints";
import Toast from "../../utils/toastMessage";
import { signUpInitialState } from "../../utils/constant";
import { postApiCall } from "../../utils/apiCalls";

export const useSignupController = () => {
  const [newUser, setNewUser] = useState(signUpInitialState);
  const [formError, setFormError] = useState(signUpInitialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  function validateForm(username: string, email: string, password: string) {
    const errors: any = {};
    // Validate username
    if (!username || username.trim() === "") {
      errors.username = "Username is required.";
    } else if (username.length > 25) {
      errors.username = "Username should be at most 25 characters long.";
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }
    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!password || password.trim() === "") {
      errors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 8-20 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    return errors;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(
      newUser.username,
      newUser.email,
      newUser.password
    );
    setFormError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const data = await postApiCall("/api/auth/signup", newUser);
        if (data.success) {
          Toast("Sign-up successful", "success");
          navigate(ENDPOINTS.SIGNIN);
          setNewUser(signUpInitialState);
        } else {
          Toast(data.message, "error");
        }
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        Toast(err.message, "error");
      }
    }
  };
  return {
    handleInputChange,
    handleSubmit,
    newUser,
    formError,
    loading,
  };
};
