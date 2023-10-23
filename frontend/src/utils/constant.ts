export const signUpInitialState = {
  username: "",
  email: "",
  password: "",
};
export const loginInitialState = {
  email: "",
  password: "",
};
type NumericOrString = number | string;

export interface ListingType {
  name: string;
  description: string;
  address: string;
  regularPrice: NumericOrString;
  discountPrice: NumericOrString;
  bathroom: NumericOrString;
  bedroom: NumericOrString;
  imageUrl: string[];
  offer: boolean;
  sale: boolean;
  rent: boolean;
  furnished: boolean;
  parking: boolean;
}
export const listingInitialState: ListingType = {
  name: "",
  description: "",
  address: "",
  regularPrice: 500,
  discountPrice: 0,
  bathroom: 1,
  bedroom: 1,
  furnished: false,
  parking: false,
  rent: false,
  offer: false,
  sale: false,
  imageUrl: [],
};
export const listingInitialStateError = {
  name: "",
  description: "",
  address: "",
  regularPrice: "",
  discountPrice: "",
  bathroom: "",
  bedroom: "",
  imageUrl: "",
};
