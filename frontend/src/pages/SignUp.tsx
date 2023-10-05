import { ChangeEvent, useState } from "react";
import Input from "../components/Input"; // Updated component filename
import Button from "../components/Button";
import ENDPOINTS from "../utils/endpoints";
import Toast from "../utils/toastMessage";
import { Link } from "react-router-dom";

function SignUp() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  function validateForm(username: string, email: string, password: string) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm(
      newUser.username,
      newUser.email,
      newUser.password
    );
    setFormError(validationErrors);

    // Check if there are validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        const data = await res.json();
        if (!data.success) {
          Toast(data.message, "error"); // Use the Toast component to display errors
        } else {
          // Handle successful sign-up
          Toast("Sign-up successful", "success"); // Example success message
        }
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        Toast(err.message, "error");
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input id="username" onChange={handleInputChange} />
        {formError.username && (
          <div className="text-red-500">{formError.username}</div>
        )}
        <Input id="email" type="email" onChange={handleInputChange} />
        {formError.email && (
          <div className="text-red-500">{formError.email}</div>
        )}
        <Input id="password" type="password" onChange={handleInputChange} />
        {formError.password && (
          <div className="text-red-500">{formError.password}</div>
        )}
        <Button
          value="Sign Up"
          type="submit"
          className="bg-slate-700"
          disabled={loading}
        />
      </form>
      <div className="my-5">
        <Button
          value="Sign Up With Google"
          type="button"
          disabled={loading}
          className="bg-red-700"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={ENDPOINTS.SIGNIN} className="text-blue-700">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
