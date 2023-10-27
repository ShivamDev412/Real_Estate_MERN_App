import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApiCall } from "../../../utils/apiCalls";
import { setListing } from "../../../redux/slice/listing/newListing";
import Toast from "../../../utils/toastMessage";
import { RootState } from "../../../redux/reducers";

export const useListingDetailController = () => {
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

  return {
    listing,
  };
};
