import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiCall } from "../../../utils/apiCalls";
import { setListing } from "../../../redux/slice/listing/newListing";
import Toast from "../../../utils/toastMessage";
import { RootState } from "../../../redux/reducers";
import ENDPOINTS from "../../../utils/endpoints";
import { listingInitialState } from "../../../utils/constant";

export const useListingDetailController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const listingId = pathname.split("/")[2];

  const { listing } = useSelector((state: RootState) => state.listing);
  const getListingData = async () => {
    try {
      const res = await getApiCall(`/api/listing/${listingId}`);
      if (res.success) {
        const { _id, __v, createdAt, updatedAt, ...listingData } = res.data;
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
  return {
    listing,
    goBack,
  };
};
