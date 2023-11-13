import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Toast from "../../../utils/toastMessage";
import { getApiCall, postApiCall } from "../../../utils/apiCalls";
import { setListing } from "../../../redux/slice/listing/newListing";
import { RootState } from "../../../redux/store";
import ENDPOINTS, { API_TYPE } from "../../../utils/endpoints";
import { listingInitialState } from "../../../utils/constant";

export const useListingDetail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1];
  const listingId = pathname.split("/")[2];
  const [initialReviews, setInitialReviews] = useState<Array<any>>([]);
  const [yourReview, setYourReview] = useState("");
  const [searchInReview, setSearchInReview] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { listing } = useSelector((state: RootState) => state.listing);
  const getListingData = async () => {
    try {
      const res = await getApiCall(
        `${API_TYPE.LISTINGS}/listing-detail/${listingId}`
      );
      if (res.success) {
        const { __v, createdAt, updatedAt, ...listingData } = res.data;
        const sortedReviews = listingData.reviews.sort((a: any, b: any) => {
          const momentA: any = moment(a.createdAt);
          const momentB: any = moment(b.createdAt);
          return momentB - momentA;
        });
        dispatch(
          setListing({
            ...listingData,
            reviews: sortedReviews,
          })
        );
        setInitialReviews(sortedReviews);
      }
    } catch (e: any) {
      Toast(e.message, "error");
    }
  };
  useEffect(() => {
    if (listingId) {
      getListingData();
    }
  }, [listingId]);
  const handleSearchInReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const searchValue = value;
    setSearchInReview(searchValue);
    const reviews = value.length
      ? listing.reviews.filter((review) => review.comment.includes(value))
      : listing.reviews;
    setInitialReviews(reviews);
  };

  const goBack = () => {
    navigation(ENDPOINTS.HOME);
    dispatch(setListing(listingInitialState));
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    Toast("Copied to clipboard", "success");
    return;
  };
  const mailTo = (address: string) => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${address}`,
      "_blank"
    );
  };
  const handleReviewFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = await postApiCall(
        `${API_TYPE.LISTINGS}/add-listing-review/${listingId}`,
        {
          comment: yourReview,
          userName: currentUser.data.user.username,
          profileImage: currentUser.data.user.avatar,
        }
      );
      if (res.success) {
        Toast(res.message, "success");
        setYourReview("");
        getListingData();
      } else {
        Toast(res.message, "error");
      }
    } catch (e: any) {
      Toast(e.message, "error");
    }
  };
  return {
    listing,
    goBack,
    pageName,
    copyToClipboard,
    mailTo,
    currentUser,
    setYourReview,
    yourReview,
    handleReviewFormSubmit,
    searchInReview,
    handleSearchInReview,
    initialReviews,
  };
};
