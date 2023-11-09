import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateResetPassword } from "../../../utils/validations";
import { postApiCall } from "../../../utils/apiCalls";
import Toast from "../../../utils/toastMessage";
import { API_TYPE } from "../../../utils/endpoints";
export const useResetPasswordController = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const resetToken = pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [resetPasswordError, setResetPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetPassword({ ...resetPassword, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetPasswordErrors = validateResetPassword(
      resetPassword.newPassword,
      resetPassword.confirmPassword
    );
    setResetPasswordError(resetPasswordErrors);
    if (Object.keys(resetPasswordErrors).length === 0) {
      try {
        setLoading(true);
        const res = await postApiCall(
          `${API_TYPE.AUTH}/reset-password/${resetToken}`,
          resetPassword
        );
        if (res.success) {
          Toast(res.message, "success");
          navigation("/signin");
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
    resetPassword,
    resetPasswordError,
    handleInputChange,
    handleSubmit,
    loading,
  };
};
