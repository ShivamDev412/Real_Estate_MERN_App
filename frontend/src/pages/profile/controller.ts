import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../redux/reducers";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../utils/firebaseAuth";
import Toast from "../../utils/toastMessage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/slice/user/userSlice";
import { postApiCall, deleteApiCall } from "../../utils/apiCalls";
import ENDPOINTS from "../../utils/endpoints";

export const useProfileController = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const initialProfile = {
    username: currentUser.data.user.username
      ? currentUser.data.user.username
      : "",
    email: currentUser.data.user.email ? currentUser.data.user.email : "",
    password: "",
    avatar: currentUser.data.user.avatar ? currentUser.data.user.avatar : "",
  };
  const [profile, setProfile] = useState<any>(initialProfile);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(undefined);
  const [fileUploadStatus, setFileUploadStatus] = useState<number>(0);
  const handleFileUpload = () => {
    if (file.size > 5000000) {
      Toast("File size should be less than 5MB", "error");
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    dispatch(updateUserStart());
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadStatus(Math.round(progress));
      },
      (error: any) => {
        console.log(error);
        Toast("Something went wrong while uploading file", "error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfile({ ...profile, avatar: downloadURL });
          dispatch(updateUserSuccess(currentUser));
        });
      }
    );
  };
  useEffect(() => file && handleFileUpload(), [file]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      console.log(profile);
      const res = await postApiCall(
        `/api/user/update-user/${currentUser.data.user.id}`,
        profile
      );
      if (res.success) {
        dispatch(updateUserSuccess(res));
        setProfile({
          username: res.data.user.username,
          email: res.data.user.email,
          password: "",
          avatar: res.data.user.avatar,
        });
        Toast("Profile updated successfully", "success");
      } else {
        Toast(res.message, "error");
        dispatch(updateUserFailure());
      }
    } catch (err: any) {
      Toast(err.message, "error");
      dispatch(updateUserFailure());
    }
  };
  const deleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await deleteApiCall(
        `/api/user/delete-user/${currentUser.data.user.id}`
      );
      if (res.success) {
        Toast("Account deleted successfully", "success");
        Cookies.remove("access-token", { path: "/" });
        navigate(ENDPOINTS.SIGNIN);
        dispatch(deleteUserSuccess());
      } else {
        Toast(res.message, "error");
        dispatch(deleteUserFailure());
      }
    } catch (err: any) {
      Toast(err.message, "error");
      dispatch(deleteUserFailure());
      return;
    }
  };
  const signOut = () => {
    Toast("Signed out successfully", "success");
    Cookies.remove("access-token", { path: "/" });
    navigate(ENDPOINTS.SIGNIN);
  };
  const showListings = () => {
    navigate(ENDPOINTS.USER_LISTINGS);
  }
  const goToCreateListing = () => navigate(ENDPOINTS.CREATE_LISTING);
  return {
    deleteAccount,
    loading,
    fileUploadStatus,
    setFile,
    fileRef,
    handleInputChange,
    currentUser,
    profile,
    updateProfile,
    signOut,
    goToCreateListing,
    showListings,
  };
};
