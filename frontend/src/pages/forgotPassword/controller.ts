import { ChangeEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { validateForgotPassword } from "../../utils/validations";

import { postApiCall } from "../../utils/apiCalls";
import Toast from "../../utils/toastMessage";
import { API_TYPE } from "../../utils/endpoints";
export const useForgotPasswordController = () => {
  //   const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState({
    email: "",
  });
  const [forgotPasswordError, setForgotPasswordError] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForgotPassword({ ...forgotPassword, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateForgotPasswordErrors = validateForgotPassword(
      forgotPassword.email
    );
    setForgotPasswordError(validateForgotPasswordErrors);
    if (Object.keys(validateForgotPasswordErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postApiCall(
          `${API_TYPE.AUTH}/forgot-password`,
          forgotPassword
        );
        if (res.success) {
          Toast(res.message, "success");
        } else {
          Toast(res.message, "error");
        }
        setLoading(false);
      } catch (error: any) {
        Toast(error.message, "error");
        setLoading(false);
        return;
      }
    }
  };
  return {
    forgotPassword,
    handleInputChange,
    handleSubmit,
    forgotPasswordError,
    loading,
  };
};
