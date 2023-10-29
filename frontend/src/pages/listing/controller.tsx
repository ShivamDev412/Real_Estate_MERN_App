import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getApiCall, deleteApiCall } from "../../utils/apiCalls";
import {
  setListings,
  setPageNo,
  setTotalCount,
} from "../../redux/slice/listing/listingSlice";
import {
  setListingFilter,
  setQueryString,
} from "../../redux/slice/listing/listingFilter";
import Toast from "../../utils/toastMessage";
import { ListingFilter } from "../../redux/slice/listing/listingFilter";
import { listingFilterInitialState } from "../../utils/constant";
import ENDPOINTS from "../../utils/endpoints";
export const useListingController = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  // const { currentUser } = useSelector((state: RootState) => state.user);
  const { listings, pageNo, totalCount } = useSelector(
    (state: RootState) => state.listings
  );
  const { listingFilter, queryString } = useSelector(
    (state: RootState) => state.listingFilter
  );
  useEffect(() => {
    getApiCall(queryString).then((res) => {
      if (res.success) {
        dispatch(setListings(res.data?.listings));
        dispatch(setPageNo(res.data?.pageNo));
        dispatch(setTotalCount(res.data?.totalCount));
      }
    });
    setDataLength(listings.length);
  }, [dispatch, queryString]);
  const onPageChange = (page: number) => {
    dispatch(setPageNo(page));
    applyFilter(page);
  };
  const applyFilter = (
    pageNo: number,
    listingFilterData: ListingFilter = listingFilter
  ) => {
    const filteredFilter: ListingFilter = Object.keys(listingFilterData)
      .filter(
        (key) =>
          listingFilterData[key as keyof ListingFilter] !== false &&
          listingFilterData[key as keyof ListingFilter] !== 0
      )
      .reduce((obj, key) => {
        obj[key as keyof ListingFilter] =
          listingFilterData[key as keyof ListingFilter];
        return obj;
      }, {} as ListingFilter);
    setActiveFilterCount(Object.keys(filteredFilter).length);
    const filterQuery = Object.keys(filteredFilter)
      .map((key) => `${key}=${filteredFilter[key as keyof ListingFilter]}`)
      .join("&");
    setShowFilter(false);
    dispatch(
      setQueryString(
        `/api/user/listings?${
          filterQuery !== ""
            ? `${filterQuery}&pageNo=${pageNo}`
            : `pageNo=${pageNo}`
        }`
      )
    );
  };

  const deleteListing = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await deleteApiCall(`/api/listing/delete/${id}`);
      if (res.success) {
        dispatch(setListings(listings.filter((listing) => listing._id !== id)));
        Toast(res.message, "success");
      }
    } catch (error: any) {
      Toast(error.message, "error");
    }
  };
  const listingDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigation(`/listing/${id}`);
  };
  const editListing = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    navigation(`/edit-listing/${id}`);
  };
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const handlePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setListingFilter({ ...listingFilter, [e.target.id]: +e.target.value })
    );
  };
  const handleToggleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (listingFilter.offer) {
      dispatch(
        setListingFilter({
          ...listingFilter,
          regularPrice: listingFilter.offer ? 0 : listingFilter.regularPrice,
        })
      );
    }
    dispatch(
      setListingFilter({ ...listingFilter, [e.target.id]: e.target.checked })
    );
  };
  const clearFilter = () => {
    dispatch(setListingFilter(listingFilterInitialState));
    closeFilter()
    setActiveFilterCount(0);
    applyFilter(pageNo, listingFilterInitialState);
  };
  const closeFilter = () => {
    setShowFilter(false);
  }
  const goToCreateListing = () => navigation(ENDPOINTS.CREATE_LISTING);
  return {
    listings,
    deleteListing,
    listingDetail,
    editListing,
    showFilter,
    toggleFilter,
    listingFilter,
    handleToggleInputChange,
    handlePriceFilter,
    clearFilter,
    applyFilter,
    activeFilterCount,
    dataLength,
    onPageChange,
    pageNo,
    totalCount,
    goToCreateListing,
    closeFilter,
  };
};
