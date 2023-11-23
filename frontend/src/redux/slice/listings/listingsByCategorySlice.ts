import { createSlice } from "@reduxjs/toolkit";
import { ListingType } from "../listing/listingSlice";
interface ListingsState {
  recentAddedListings: {
    data: ListingType[];
    total: number;
  };
  listingsOnSales: {
    data: ListingType[];
    total: number;
  };
  listingsOnRent: {
    data: ListingType[];
    total: number;
  };
}
const initialState: ListingsState = {
  recentAddedListings: {
    data: [],
    total: 0,
  },
  listingsOnSales: {
    data: [],
    total: 0,
  },
  listingsOnRent: {
    data: [],
    total: 0,
  },
};
const listingsByCategorySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRecentAddedListings: (state, action) => {
      state.recentAddedListings = action.payload;
    },
    setListingsOnSales: (state, action) => {
      state.listingsOnSales = action.payload;
    },
    setListingsOnRent: (state, action) => {
      state.listingsOnRent = action.payload;
    },
  },
});
export const { setRecentAddedListings, setListingsOnSales, setListingsOnRent } =
listingsByCategorySlice.actions;
export default listingsByCategorySlice.reducer;
