import Input from "../components/input";
import Button from "../components/Button";
import ENDPOINTS from "../utils/endpoints";
import { Link } from "react-router-dom";
import React from "react";
function SignIn() {
  const [user, setUser] = React.useState({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <Input id={"username"} onChange={(e) => handleInputChange(e)} />
        <Input
          id={"password"}
          type={"password"}
          onChange={(e) => handleInputChange(e)}
        />
        <Button value={"Sign In"} type={"submit"} className="bg-slate-700" />
      </form>
      <div className="my-5">
        <Button
          value={"Sign Up With Google"}
          type={"button"}
          className="bg-red-700"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={ENDPOINTS.SIGNUP} className="text-blue-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
