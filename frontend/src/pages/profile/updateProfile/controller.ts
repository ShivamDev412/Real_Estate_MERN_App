import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../../redux/reducers";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../utils/firebaseAuth";
import Toast from "../../../utils/toastMessage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../../redux/slice/user/userSlice";
import { postApiCall } from "../../../utils/apiCalls";
import ENDPOINTS, { API_TYPE } from "../../../utils/endpoints";
import { validateProfile } from "../../../utils/validations";
import {
  setListingFilter,
  setQueryString,
} from "../../../redux/slice/listing/listingFilter";
import { listingFilterInitialState } from "../../../utils/constant";
import {
  setListings,
  setPageNo,
  setTotalCount,
} from "../../../redux/slice/listing/listingSlice";

export const useProfileController = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.user
  );
  const [countryCode, setCountryCode] = useState(
    currentUser.data.user.phoneNo?.split(" ")[0] !== ""
      ? currentUser.data.user.phoneNo?.split(" ")[0]
      : "+1"
  );
  const [apiLoading, setApiLoading] = useState(false);
  const dispatch = useDispatch();
  const initialProfile = {
    firstName: currentUser.data.user.firstName
      ? currentUser.data.user.firstName
      : "",
    lastName: currentUser.data.user.lastName
      ? currentUser.data.user.lastName
      : "",
    phoneNo: currentUser.data.user.phoneNo
      ? currentUser.data.user.phoneNo.split(" ")[1]
      : "",
    username: currentUser.data.user.username
      ? currentUser.data.user.username
      : "",
    countryCode: currentUser.data.user.phoneNo
      ? currentUser.data.user.phoneNo?.split(" ")[0]
      : "",
    email: currentUser.data.user.email ? currentUser.data.user.email : "",
    avatar: currentUser.data.user.avatar ? currentUser.data.user.avatar : "",
  };
  const [profile, setProfile] = useState<any>(initialProfile);
  const [profileError, setProfileError] = useState<any>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    username: "",
    email: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(undefined);
  const [anyChanges, setAnyChanges] = useState(false);
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
  useEffect(() => {
    const profileString = JSON.stringify(profile);
    const initialProfileString = JSON.stringify(initialProfile);
    setAnyChanges(!(profileString !== initialProfileString));
  }, [profile, initialProfile]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateProfileErrors = validateProfile(
      profile.firstName,
      profile.lastName,
      profile.username,
      profile.email,
      profile.phoneNo
    );
    setProfileError(validateProfileErrors);
    if (Object.keys(validateProfileErrors).length === 0) {
      dispatch(updateUserStart());
      try {
        setApiLoading(true);
        const res = await postApiCall(
          `${API_TYPE.USER}/update-user/${currentUser.data.user.id}`,
          {
            ...profile,
            phoneNo: `${countryCode} ${profile.phoneNo}`,
          }
        );
        if (res.success) {
          dispatch(updateUserSuccess(res));
          setAnyChanges(false);
          setProfile({
            username: res.data.user.username,
            email: res.data.user.email,
            phoneNo: res.data.user.phoneNo.split(" ")[1],
            countryCode: res.data.user.phoneNo.split(" ")[0],
            firstName: res.data.user.firstName,
            lastName: res.data.user.lastName,
            avatar: res.data.user.avatar,
          });
          Toast("Profile updated successfully", "success");
          setApiLoading(false);
        } else {
          Toast(res.message, "error");
          dispatch(updateUserFailure());
          setApiLoading(false);
        }
      } catch (err: any) {
        Toast(err.message, "error");
        dispatch(updateUserFailure());
        setApiLoading(false);
      }
    }
  };

  const signOut = () => {
    Toast("Signed out successfully", "success");
    dispatch(setListingFilter(listingFilterInitialState));
    dispatch(setQueryString("/api/user/listings?pageNo=1"));
    dispatch(setListings([]));
    dispatch(setPageNo(1));
    dispatch(setTotalCount(0));

    Cookies.remove("access-token", { path: "/" });
    navigate(ENDPOINTS.SIGNIN);
  };
  const countryCodeValue = (countryCode: string) => {
    setCountryCode(countryCode);
  };
  return {
    loading,
    fileUploadStatus,
    setFile,
    fileRef,
    handleInputChange,
    currentUser,
    profile,
    updateProfile,
    signOut,
    profileError,
    countryCodeValue,
    anyChanges,
    apiLoading
  };
};
