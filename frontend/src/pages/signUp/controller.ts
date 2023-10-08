import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/endpoints";
import Toast from "../../utils/toastMessage";
import { signUpInitialState, validateForm } from "../../utils/constant";
import { postApiCall } from "../../utils/apiCalls";

export const useSignupController = () => {
  const [newUser, setNewUser] = useState(signUpInitialState);
  const [formError, setFormError] = useState(signUpInitialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

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
