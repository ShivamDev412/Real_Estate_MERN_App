import { ListingType } from "./constant";

export const validateListing = (listing: ListingType) => {
  const errors: any = {};

  // Validate the 'name' property
  if (!listing.name.trim()) {
    errors.name = "Name is required";
  }

  // Validate the 'description' property
  if (!listing.description.trim()) {
    errors.description = "Description is required";
  }

  // Validate the 'address' property
  if (!listing.address.trim()) {
    errors.address = "Address is required";
  }

  // Validate the 'regularPrice' property
  if (isNaN(Number(listing.regularPrice)) || listing.regularPrice === "") {
    errors.regularPrice = "Regular Price is required";
  }
  if (listing.offer) {
    // Validate the 'discountedPrice' property
    if (isNaN(Number(listing.discountPrice)) || listing.discountPrice === "") {
      errors.discountedPrice = "Discounted Price is required";
    }
    if (Number(listing.regularPrice) < Number(listing.discountPrice)) {
      errors.discountPrice =
        "Discount Price cannot be greater than Regular Price";
    }
  } 

  // Validate the 'bathroom' property
  if (isNaN(Number(listing.bathroom)) || listing.bathroom === "") {
    errors.bathroom = "Bathroom count is required";
  }

  // Validate the 'bedroom' property
  if (isNaN(Number(listing.bedroom)) || listing.bedroom === "") {
    errors.bedroom = "Bedroom count is required";
  }

  // Validate the 'imageUrl' property
  if (listing.imageUrl.length === 0) {
    errors.imageUrl = "At least one image is required";
  }
  return errors;
};

export function validateForm(
  username: string,
  email: string,
  password: string
) {
  const errors: any = {};
  // Validate username
  if (!username || username.trim() === "") {
    errors.username = "Username is required.";
  } else if (username.length > 25) {
    errors.username = "Username should be at most 25 characters long.";
  }
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
  // Validate password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be 8-20 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  }
  return errors;
}
