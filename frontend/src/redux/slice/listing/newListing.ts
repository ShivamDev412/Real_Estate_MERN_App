import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listingInitialState, ListingType } from "../../../utils/constant";

interface InitialStateProps {
  listing: any;
}
const initialState: InitialStateProps = {
  listing: listingInitialState,
};

const newListingSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListing: (state, action: PayloadAction<ListingType>) => {
      state.listing = action.payload;
    },
  },
});
export const { setListing } = newListingSlice.actions;
export default newListingSlice.reducer;
