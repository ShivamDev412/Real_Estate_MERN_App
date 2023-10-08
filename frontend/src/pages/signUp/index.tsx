import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ENDPOINTS from "../../utils/endpoints";
import { useSignupController } from "./controller";
import { useSignInController } from "../signIn/controller";

function SignUp() {
  const { handleInputChange, handleSubmit, newUser, formError, loading } =
    useSignupController();
  const { handleGoogleAuth } = useSignInController();
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="username"
          onChange={handleInputChange}
          value={newUser.username}
        />
        {formError.username && (
          <div className="text-red-500">{formError.username}</div>
        )}
        <Input
          id="email"
          type="email"
          onChange={handleInputChange}
          value={newUser.email}
        />
        {formError.email && (
          <div className="text-red-500">{formError.email}</div>
        )}
        <Input
          id="password"
          type="password"
          onChange={handleInputChange}
          value={newUser.password}
        />
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
          disabled={false}
          className="bg-red-700"
          onClick={handleGoogleAuth}
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
