import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { validateForm, signUpInitialState } from "../../utils/constant";

export const useProfileController = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const initialProfile = {
    username: currentUser.data.user.username,
    email: currentUser.data.user.email,
    password: "",
  };
  const [formError, setFormError] = useState<any>(signUpInitialState);
  const [profile, setProfile] = useState<any>(initialProfile);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(
      profile.username,
      profile.email,
      profile.password
    );
    setFormError(validationErrors);
  };
  return {
    handleInputChange,
    currentUser,
    profile,
    updateProfile,
    formError,
  };
};
