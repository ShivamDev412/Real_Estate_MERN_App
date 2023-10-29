import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listingFilterInitialState } from "../../../utils/constant";
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
  queryString: string;
}
const initialState: InitialStateProps = {
  listingFilter: listingFilterInitialState,
  queryString: "/api/user/listings?pageNo=1",
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
    setQueryString: (
      state,
      action: PayloadAction<InitialStateProps["queryString"]>
    ) => {
      state.queryString = action.payload;
    },
  },
});
export const { setListingFilter, setQueryString } = listingFilterSlice.actions;
export default listingFilterSlice.reducer;
