import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ENDPOINTS from "../../utils/endpoints";

import { useSignInController } from "./controller";
import FormWrapper from "../../wrappers/formWrapper";

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
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id={"email"}
          onChange={(e) => handleInputChange(e)}
          value={user.email}
        />
        {formError.email && (
          <p className="text-red-500">{formError.email}</p>
        )}
        <Input
          id={"password"}
          type={"password"}
          value={user.password}
          onChange={(e) => handleInputChange(e)}
        />
        {formError.password && (
          <p className="text-red-500">{formError.password}</p>
        )}
        <Button
          value="Sign In"
          type="submit"
          className="bg-slate-700"
          disabled={loading}
        />
      </form>
      <section className="my-5">
        <Button
          value={"Sign Up With Google"}
          type={"button"}
          className="bg-red-700"
          disabled={loading}
          onClick={handleGoogleAuth}
        />
      </section>
      <section className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={ENDPOINTS.SIGNUP} className="text-blue-700">
          Sign Up
        </Link>
      </section>
      <section className="flex gap-2 mt-5">
        <p>Can't remember your password?</p>
        <Link to={ENDPOINTS.FORGOT_PASSWORD} className="text-blue-700">
          Forgot Password
        </Link>
      </section>
    </FormWrapper>
  );
}

export default SignIn;
