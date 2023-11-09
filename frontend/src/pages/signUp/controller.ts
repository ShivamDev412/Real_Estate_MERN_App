import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ENDPOINTS, { API_TYPE } from "../../utils/endpoints";
import Toast from "../../utils/toastMessage";
import { signUpInitialState } from "../../utils/constant";
import { validateForm } from "../../utils/validations";
import { postApiCall } from "../../utils/apiCalls";

export const useSignupController = () => {
  const [newUser, setNewUser] = useState(signUpInitialState);
  const [formError, setFormError] = useState(signUpInitialState);
  const [countryCode, setCountryCode] = useState("+1");
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
      newUser.password,
      newUser.firstName,
      newUser.lastName,
      newUser.phoneNo
    );
    setFormError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const dataToSend = {
        ...newUser,
        phoneNo: `${countryCode} ${newUser.phoneNo}`,
      };
      try {
        setLoading(true);
        const data = await postApiCall(`${API_TYPE.AUTH}/signup`, dataToSend);
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
  const countryCodeValue = (countryCode: string) => {
    setCountryCode(countryCode);
  };
  return {
    handleInputChange,
    handleSubmit,
    newUser,
    formError,
    loading,
    countryCodeValue,
  };
};
