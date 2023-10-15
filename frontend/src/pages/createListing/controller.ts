import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  listingInitialState,
  listingInitialStateError,
} from "../../utils/constant";
import { validateListing } from "../../utils/validations";
import { app } from "../../utils/firebaseAuth";
import Toast from "../../utils/toastMessage";

export const createListingController = () => {
  const [listing, setListing] = useState(listingInitialState);
  const [files, setFiles] = useState<FileList | null>(null);
  const [formError, setFormError] = useState(listingInitialStateError);
  const [disableUpload, setDisableUpload] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === "file" && e.target instanceof HTMLInputElement) {
      const selectedFiles: any = e.target.files;

      const isAnyImageLargerThan5MB = Array.from(selectedFiles).some(
        (file: any) => file.size > 5 * 1024 * 1024
      );
      if (isAnyImageLargerThan5MB) {
        setDisableUpload(true);
        Toast("Files can't be larger than 5 MB", "error");
      } else {
        setDisableUpload(false);
        setFiles(selectedFiles);
      }
    } else {
      setListing({
        ...listing,
        [e.target.id]:
          e.target.type === "text" || e.target instanceof HTMLTextAreaElement
            ? e.target.value
            : Number(e.target.value),
      });
    }
  };

  const handleToggleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListing({ ...listing, [e.target.id]: e.target.checked });
  };

  const createListing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateListing(listing);
    setFormError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Add your logic to create a listing
    }
  };
  const uploadFiles = () => {
    if (files !== null) {
      const imageArray = Array.from(files) as File[];
      if (
        imageArray.length > 0 &&
        imageArray.length + listing.imageUrl.length <= 7
      ) {
        const promises: Array<Promise<any>> = [];
        imageArray.forEach((image) => {
          promises.push(storeImage(image));
        });
        Promise.all(promises)
          .then((urls: any) => {
            setListing({ ...listing, imageUrl: listing.imageUrl.concat(urls) });
            setLoading(false);
            setFiles(null);
            setDisableUpload(true);
          })
          .catch((error) => {
            Toast(error.message, "error");
          });
      } else {
        setLoading(false);
        setDisableUpload(true);
        Toast("You can only upload a maximum of 7 images in total.", "info");
      }
    }
  };

  const storeImage = async (file: File) => {
    return new Promise(async (resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setLoading(true);
        },
        (err) => {
          reject(err);
          setLoading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };
  const deleteImage = (imgUrl: string) => {
    setListing({
      ...listing,
      imageUrl: listing.imageUrl.filter((image: string) => image !== imgUrl),
    });
  };

  return {
    files,
    disableUpload,
    listing,
    uploadFiles,
    handleInputChange,
    handleToggleInputChange,
    createListing,
    formError,
    loading,
    deleteImage,
  };
};
