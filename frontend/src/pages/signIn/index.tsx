import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ENDPOINTS from "../../utils/endpoints";

import { useSignInController } from "./controller";

function SignIn() {
  const {
    formError,
    user,
    loading,
    handleInputChange,
    handleSubmit,
    handleGoogleAuth,
  } = useSignInController();
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id={"email"}
          onChange={(e) => handleInputChange(e)}
          value={user.email}
        />
        {formError.email && (
          <div className="text-red-500">{formError.email}</div>
        )}
        <Input
          id={"password"}
          type={"password"}
          value={user.password}
          onChange={(e) => handleInputChange(e)}
        />
        {formError.password && (
          <div className="text-red-500">{formError.password}</div>
        )}
        <Button
          value="Sign In"
          type="submit"
          className="bg-slate-700"
          disabled={loading}
        />
      </form>
      <div className="my-5">
        <Button
          value={"Sign Up With Google"}
          type={"button"}
          className="bg-red-700"
          disabled={loading}
          onClick={handleGoogleAuth}
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
