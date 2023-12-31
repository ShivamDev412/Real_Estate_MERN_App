import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getApiCall } from "../../utils/apiCalls";
import { RootState } from "../../redux/reducers";
import {
  setRecentAddedListings,
  setListingsOnSales,
  setListingsOnRent,
} from "../../redux/slice/listings/listingsByCategorySlice";
import Toast from "../../utils/toastMessage";
import { API_TYPE } from "../../utils/endpoints";
export const useHomeController = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { recentAddedListings, listingsOnSales, listingsOnRent } = useSelector(
    (state: RootState) => state.listingsByCategory
  );
  useEffect(() => {
    getApiCall(`${API_TYPE.LISTINGS}/home`)
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
  const listingDetail = (id: string) => {
    navigation(`/listing-detail/${id}`);
  };
  return {
    recentAddedListings,
    listingsOnSales,
    listingsOnRent,
    listingDetail,
  };
};
