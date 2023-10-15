import mongoose, { Document } from "mongoose";

interface Listing extends Document {
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
  imageUrl: Array<string>;
  userRef: string;
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
      required: true,
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
    type: {
      type: Boolean,
      required: true,
    },
    offer: {
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
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model<ListingDocument>("Listing", ListingSchema);
export default Listing;
