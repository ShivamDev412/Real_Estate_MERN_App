import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiCall } from "../../utils/apiCalls";
import { RootState } from "../../redux/reducers";
import {
  setRecentAddedListings,
  setListingsOnSales,
  setListingsOnRent,
} from "../../redux/slice/listings/listingsSlice";
import Toast from "../../utils/toastMessage";
export const useHomeController = () => {
  const dispatch = useDispatch();
  const { recentAddedListings, listingsOnSales, listingsOnRent } = useSelector(
    (state: RootState) => state.allListings
  );
  useEffect(() => {
    getApiCall("/api/listings")
      .then((response) => {
        if (response.success) {
          const { listingsOnRent, listingsOnSales, recentAddedListings } =
            response.data;
          dispatch(setRecentAddedListings(recentAddedListings));
          dispatch(setListingsOnSales(listingsOnSales));
          dispatch(setListingsOnRent(listingsOnRent));
        } else {
          Toast("Something went wrong", "error");
        }
      })
      .catch((error) => {
        Toast(error.message, "error");
        console.log(error.message);
      });
  }, [dispatch]);
  return {
    recentAddedListings,
    listingsOnSales,
    listingsOnRent,
  };
};
