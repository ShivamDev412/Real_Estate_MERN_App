import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listingFilterInitialState } from "../../../utils/constant";
import { API_TYPE } from "../../../utils/endpoints";
export interface ListingFilter {
  regularPrice: number | boolean;
  discountPrice: number | boolean;
  bathroom: number | boolean;
  bedroom: number | boolean;
  furnished: number | boolean;
  parking: number | boolean;
  rent: number | boolean;
  offer: number | boolean;
  sale: number | boolean;
}
export interface InitialStateProps {
  listingFilter: ListingFilter;
  userQueryString: string;
  queryString: string;
}
const initialState: InitialStateProps = {
  listingFilter: listingFilterInitialState,
  userQueryString: `${API_TYPE.USER}/listings?pageNo=1`,
  queryString: `${API_TYPE.LISTINGS}/?pageNo=1`,
};

const listingFilterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListingFilter: (
      state,
      action: PayloadAction<InitialStateProps["listingFilter"]>
    ) => {
      state.listingFilter = action.payload;
    },
    setUserQueryString: (
      state,
      action: PayloadAction<InitialStateProps["userQueryString"]>
    ) => {
      state.userQueryString = action.payload;
    },
    setQueryString: (
      state,
      action: PayloadAction<InitialStateProps["queryString"]>
    ) => {
      state.queryString = action.payload;
    },
  },
});
export const { setListingFilter, setUserQueryString, setQueryString } =
  listingFilterSlice.actions;
export default listingFilterSlice.reducer;
