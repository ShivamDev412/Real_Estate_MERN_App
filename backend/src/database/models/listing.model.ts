import mongoose, { Document } from "mongoose";
import ReviewSchema from "./reviews.modal";

export interface Listing extends Document {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  gym: boolean;
  swimmingPool: boolean;
  wifi: boolean;
  imageUrl: Array<string>;
  userRef: string;
  rent: boolean;
  reviews: Array<{
    userName: string;
    comment: string;
    profileImage: string;
    createdAt: Date;
  }>;
}
interface ListingDocument extends Listing {
  _doc: any;
}
const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      require: true,
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    rent: {
      type: Boolean,
      required: true,
    },
    sale: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    gym: {
      type: Boolean,
      required: true,
    },
    swimmingPool: {
      type: Boolean,
      required: true,
    },
    wifi: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model<ListingDocument>("Listing", ListingSchema);
export default Listing;
