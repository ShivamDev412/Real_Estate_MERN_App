import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/user/userSlice";
import listingSlice from "./slice/listing/listingSlice";
import newListingSlice from "./slice/listing/newListing";
import listingFilterSlice from "./slice/listing/listingFilter";
import listingsSlice from "./slice/listings/listingsSlice";
const rootReducer = combineReducers({
  user: userSlice,
  listings: listingSlice,
  listing: newListingSlice,
  listingFilter: listingFilterSlice,
  allListings: listingsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
