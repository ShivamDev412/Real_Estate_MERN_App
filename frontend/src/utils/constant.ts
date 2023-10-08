export const signUpInitialState = {
  username: "",
  email: "",
  password: "",
};
export const loginInitialState = {
  email: "",
  password: "",
};
export function validateForm(username: string, email: string, password: string) {
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