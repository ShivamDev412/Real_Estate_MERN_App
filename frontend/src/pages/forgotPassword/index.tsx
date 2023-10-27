import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ENDPOINTS from "../../utils/endpoints";

import { useForgotPasswordController } from "./controller";

function ForgotPassword() {
  const {
    forgotPassword,
    handleInputChange,
    handleSubmit,
    forgotPasswordError,
    loading,
  } = useForgotPasswordController();
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Forgot Password
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id={"email"}
          type={"email"}
          value={forgotPassword.email}
          onChange={(e) => handleInputChange(e)}
        />
        {forgotPasswordError.email && (
          <div className="text-red-500">{forgotPasswordError.email}</div>
        )}
        <Button
          value="Submit"
          type="submit"
          className="bg-slate-700"
          disabled={loading}
        />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={ENDPOINTS.SIGNIN} className="text-blue-700">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
