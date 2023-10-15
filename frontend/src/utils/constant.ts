export const signUpInitialState = {
  username: "",
  email: "",
  password: "",
};
export const loginInitialState = {
  email: "",
  password: "",
};
export const listingInitialState = {
  name: "",
  description: "",
  address: "",
  regularPrice: 0,
  discountedPrice: 0,
  bathroom: 0,
  bedroom: 0,
  furnished: false,
  parking: false,
  rent: false,
  offer: false,
  imageUrl: [],
};
export const listingInitialStateError = {
  name: "",
  description: "",
  address: "",
  regularPrice: "",
  discountedPrice: "",
  bathroom: "",
  bedroom: "",
  furnished: "",
  parking: "",
  rent: "",
  offer: "",
  imageUrl: "",
}