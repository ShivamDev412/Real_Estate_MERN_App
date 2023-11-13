import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewsType } from "../../../utils/constant";
export type ListingType = {
  address: string;
  bathroom: number;
  bedroom: number;
  createdAt: string;
  description: string;
  discountPrice: number;
  furnished: boolean;
  imageUrl: string[];
  name: string;
  offer: boolean;
  parking: boolean;
  regularPrice: number;
  rent: boolean;
  sale: boolean;
  updatedAt: string;
  gym: boolean;
  wifi: boolean;
  reviews: Array<ReviewsType>;
  swimmingPool: boolean;
  userRef: string;
  _id: string;
};
interface InitialStateProps {
  listings: ListingType[];
  pageNo: number;
  totalCount: number;
  loading: boolean;
}
const initialState: InitialStateProps = {
  listings: [],
  pageNo: 1,
  totalCount: 0,
  loading: false,
};

const listingSlice = createSlice({
  name: "newListing",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<ListingType[]>) => {
      state.listings = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export const { setListings, setPageNo, setTotalCount, setLoading } =
  listingSlice.actions;
export default listingSlice.reducer;
