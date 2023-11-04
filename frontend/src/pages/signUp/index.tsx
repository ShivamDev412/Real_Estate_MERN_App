import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { PhoneNoInput } from "../../components/Input";
import Button from "../../components/Button";
import ENDPOINTS from "../../utils/endpoints";
import { useSignupController } from "./controller";
import { useSignInController } from "../signIn/controller";
import FormWrapper from "../../wrappers/formWrapper";

function SignUp() {
  const {
    handleInputChange,
    handleSubmit,
    newUser,
    formError,
    loading,
    countryCodeValue,
  } = useSignupController();
  const { handleGoogleAuth } = useSignInController();
  return (
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <section className="flex items-center w-full justify-between gap-2">
          <section className="w-full">
            <Input
              id="firstName"
              onChange={handleInputChange}
              value={newUser.firstName}
            />
            {formError.firstName && (
              <p className="text-red-500">{formError.firstName}</p>
            )}
          </section>
          <section className="w-full">
            <Input
              id="lastName"
              onChange={handleInputChange}
              value={newUser.lastName}
            />
            {formError.lastName && (
              <p className="text-red-500">{formError.lastName}</p>
            )}
          </section>
        </section>

        <Input
          id="username"
          onChange={handleInputChange}
          value={newUser.username}
        />
        {formError.username && (
          <p className="text-red-500">{formError.username}</p>
        )}
        <Input
          id="email"
          type="email"
          onChange={handleInputChange}
          value={newUser.email}
        />
        {formError.email && (
          <p className="text-red-500">{formError.email}</p>
        )}
        <PhoneNoInput
          id="phoneNo"
          onChange={handleInputChange}
          value={newUser.phoneNo}
          countryCodeValue={countryCodeValue}
        />
        {formError.phoneNo && (
          <p className="text-red-500">{formError.phoneNo}</p>
        )}
        <Input
          id="password"
          type="password"
          onChange={handleInputChange}
          value={newUser.password}
        />
        {formError.password && (
          <p className="text-red-500">{formError.password}</p>
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
    </FormWrapper>
  );
}

export default SignUp;
