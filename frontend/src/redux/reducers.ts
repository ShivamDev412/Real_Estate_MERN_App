import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/user/userSlice";
import listingSlice from "./slice/listing/listingSlice";
import newListingSlice from "./slice/listing/newListing";
import listingFilterSlice from "./slice/listing/listingFilter";
import listingsByCategorySlice from "./slice/listings/listingsByCategorySlice";
import notificationSlice from "./slice/notifications/notificationSlice";
const rootReducer = combineReducers({
  user: userSlice,
  userListings: listingSlice,
  listing: newListingSlice,
  userListingFilter: listingFilterSlice,
  listingsByCategory: listingsByCategorySlice,
  notifications: notificationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
