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

const validateFirstName = (firstName: string, errors: any) => {
  const nameRegex = /^[A-Z][a-z]*$/;
  if (!firstName || firstName.trim() === "") {
    errors.firstName = "First Name is required.";
  } else if (firstName.length > 10) {
    errors.firstName = "First Name should be at most 10 characters long.";
  } else if (!nameRegex.test(firstName)) {
    errors.firstName =
      "First Name should only contain letters and first letter should be capital.";
  }
};
const validateLastName = (lastName: string, errors: any) => {
  const nameRegex = /^[A-Z][a-z]*$/;
  if (lastName.trim() !== "") {
    if (lastName.length > 10) {
      errors.lastName = "Last Name should be at most 10 characters long.";
    } else if (!nameRegex.test(lastName)) {
      errors.lastName =
        "Last Name should only contain letters and first letter should be capital.";
    }
  }
};
const validateUsername = (username: string, errors: any) => {
  if (!username || username.trim() === "") {
    errors.username = "Username is required.";
  } else if (username.length > 25) {
    errors.username = "Username should be at most 25 characters long.";
  }
};
const validateEmail = (email: string, errors: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
};
const validatePassword = (password: string, errors: any) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be 8-20 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  }
};
const validatePhoneNo = (phoneNo: string, errors: any) => {
  const phoneNoRegex = /^\d{10}$/;
  if (!phoneNo || phoneNo.trim() === "") {
    errors.phoneNo = "Phone Number is required.";
  } else if (!phoneNoRegex.test(phoneNo)) {
    errors.phoneNo =
      "Invalid phone number format. Please enter a 10-digit number containing only numbers.";
  }
};
export function validateForm(
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNo: string
) {
  const errors: any = {};
  validateFirstName(firstName, errors);
  validateLastName(lastName, errors);
  validateUsername(username, errors);
  validateEmail(email, errors);
  validatePassword(password, errors);
  validatePhoneNo(phoneNo, errors);
  return errors;
}
export const validateProfile = (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  phoneNo: string
) => {
  const errors: any = {};
  validateFirstName(firstName, errors);
  validateLastName(lastName, errors);
  validateUsername(username, errors);
  validateEmail(email, errors);
  validatePhoneNo(phoneNo, errors);
  return errors;
};
export const validateForgotPassword = (email: string) => {
  const errors: any = {};
  validateEmail(email, errors);

  return errors;
};
export const validateResetPassword = (
  newPassword: string,
  confirmPassword: string
) => {
  const errors: any = {};
  validatePassword(newPassword, errors);
  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "Confirm Password is required";
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "New Password and Confirm Password do not match";
  }
  return errors;
};
export const validateChangePassword = (
  oldPassword: string,
  newPassword: string
) => {
  const errors: any = {};
  if (oldPassword.trim() === "") {
    errors.oldPassword = "Old password is required";
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!newPassword || newPassword.trim() === "") {
    errors.newPassword = "New Password is required.";
  } else if (!passwordRegex.test(newPassword)) {
    errors.newPassword =
      "Password must be 8-20 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  } else if (oldPassword === newPassword) {
    errors.newPassword = "Old password and new password should not be same";
  }
  return errors;
};
