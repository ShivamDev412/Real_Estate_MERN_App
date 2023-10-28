import { ChangeEvent, FormEvent, useState } from "react";
import { validateChangePassword } from "../../utils/validations";
import Toast from "../../utils/toastMessage";
import { putApiCall } from "../../utils/apiCalls";

export const useChangePasswordController = () => {
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangePassword({ ...changePassword, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formError = validateChangePassword(
      changePassword.oldPassword,
      changePassword.newPassword
    );
    setError(formError);
    if (Object.keys(formError).length === 0) {
      try {
        setLoading(true);
        const res = await putApiCall(
          "/api/user/change-password",
          changePassword
        );
        if (res.success) {
          Toast(res.message, "success");
          setChangePassword({ oldPassword: "", newPassword: "" });
          setLoading(false);
        } else {
          Toast(res.message, "error");
          setLoading(false);
        }
      } catch (e: any) {
        setLoading(false);
        Toast(e.message, "error");
      }
    }
  };

  return {
    changePassword,
    error,
    handleSubmit,
    handleInputChange,
    loading,
  };
};
