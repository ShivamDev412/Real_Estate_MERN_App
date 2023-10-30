import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../redux/reducers";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/slice/user/userSlice";
import { deleteApiCall } from "../../utils/apiCalls";
import Toast from "../../utils/toastMessage";
import ENDPOINTS from "../../utils/endpoints";

export const useSettingsController = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const deleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await deleteApiCall(
        `/api/user/delete-user/${currentUser.data.user.id}`
      );
      if (res.success) {
        setOpenModal(false);
        Toast("Account deleted successfully", "success");
        Cookies.remove("access-token", { path: "/" });
        navigate(ENDPOINTS.SIGNIN);
        dispatch(deleteUserSuccess());
      } else {
        setOpenModal(false);
        Toast(res.message, "error");
        dispatch(deleteUserFailure());
      }
    } catch (err: any) {
      setOpenModal(false);
      Toast(err.message, "error");
      dispatch(deleteUserFailure());
      return;
    }
  };
  const verifyData = (type: string) => {
    if (type === "email") navigate(ENDPOINTS.VERIFY_EMAIL);
    else navigate(ENDPOINTS.VERIFY_PHONE_NUMBER);
  };
  const changePassword = () => {
    navigate(ENDPOINTS.CHANGE_PASSWORD);
  
  }
  return {
    deleteAccount,
    setOpenModal,
    openModal,
    currentUser,
    verifyData,
    changePassword
  };
};
