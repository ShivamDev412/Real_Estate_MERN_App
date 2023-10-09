import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { validateForm, signUpInitialState } from "../../utils/constant";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../utils/firebaseAuth";
import Toast from "../../utils/toastMessage";

export const useProfileController = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const initialProfile = {
    username: currentUser.data.user.username,
    email: currentUser.data.user.email,
    password: "",
    avatar: "",
  };
  const [formError, setFormError] = useState<any>(signUpInitialState);
  const [profile, setProfile] = useState<any>(initialProfile);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(undefined);
  const [fileUploadStatus, setFileUploadStatus] = useState<number>(0);
  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadStatus(Math.round(progress));
        console.log("Upload is " + progress + "% done");
      },
      (error: any) => {
        console.log(error);
        Toast("Something went wrong while uploading file", "error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfile({ ...profile, avatar: downloadURL });
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
    const validationErrors = validateForm(
      profile.username,
      profile.email,
      profile.password
    );
    setFormError(validationErrors);
  };
  return {
    fileUploadStatus,
    setFile,
    fileRef,
    handleInputChange,
    currentUser,
    profile,
    updateProfile,
    formError,
  };
};
