import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteApiCall, getApiCall } from "../../../utils/apiCalls";
import { setListing } from "../../../redux/slice/listing/newListing";
import Toast from "../../../utils/toastMessage";
import { RootState } from "../../../redux/reducers";
import ENDPOINTS, { API_TYPE } from "../../../utils/endpoints";
import { listingInitialState } from "../../../utils/constant";
import { setListings } from "../../../redux/slice/listing/listingSlice";

export const useListingDetailController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const listingId = pathname.split("/")[2];
  const pageName = pathname.split("/")[1];
  const { listings } = useSelector((state: RootState) => state.listings);
  const { listing } = useSelector((state: RootState) => state.listing);
  const getListingData = async () => {
    try {
      const res = await getApiCall(`${API_TYPE.USER_LISTING}/${listingId}`);
      if (res.success) {
        const {__v, createdAt, updatedAt, ...listingData } = res.data;
        dispatch(setListing(listingData));
      }
    } catch (e: any) {
      Toast(e.message, "error");
    }
  };
  useEffect(() => {
    if (listingId) getListingData();
  }, [listingId]);
  const goBack = () => {
    navigate(ENDPOINTS.USER_LISTINGS);
    dispatch(setListing(listingInitialState));
  };
  const editListing = (id: string) => {
    navigate(`/edit-listing/${id}`);
  };
  const deleteListing = async (id: string) => {
    try {
      const res = await deleteApiCall(`${API_TYPE.USER_LISTING}/delete/${id}`);
      if (res.success) {
        dispatch(setListings(listings.filter((listing) => listing._id !== id)));
        Toast(res.message, "success");
        goBack();
      } else {
        Toast(res.message, "error");
      }
    } catch (error: any) {
      Toast(error.message, "error");
    }
  };
  return {
    listing,
    goBack,
    editListing,
    deleteListing,
    pageName
  };
};
