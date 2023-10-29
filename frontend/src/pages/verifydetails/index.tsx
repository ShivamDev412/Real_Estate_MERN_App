import Button from "../../components/Button";
import Input, { PhoneNoInput } from "../../components/Input";
import OTPForm from "../../components/otpForm";
import FormWrapper from "../../wrappers/formWrapper";
import { useVerifyUser } from "./controller";

function VerifyDetails() {
  const {
    pageTitle,
    verifyUser,
    error,
    handleInputChange,
    handleSubmit,
    sendOtpLoading,
    countryCodeValue,
    countryCode,
    showOtpInput,
    getOtpToVerify,
    resendOtp
  } = useVerifyUser();
  return (
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">
        Verify {pageTitle}
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <p className="text-center">
          To verify your account, click on Send OTP and check your{" "}
          {pageTitle.toLocaleLowerCase()} for an OTP (One-Time Password).
        </p>
        {pageTitle === "Email" ? (
          <Input
            id={verifyUser}
            type={"email"}
            value={verifyUser}
            disabled={showOtpInput}
            onChange={(e) => handleInputChange(e)}
          />
        ) : (
          <PhoneNoInput
            id="phoneNo"
            onChange={handleInputChange}
            value={verifyUser}
            code={countryCode}
            countryCodeValue={countryCodeValue}
          />
        )}
        {error && error !== "" && <div className="text-red-500">{error}</div>}
        {showOtpInput ? (
          <></>
        ) : (
          <Button
            value="Send OTP"
            type="submit"
            className="bg-slate-700"
            disabled={sendOtpLoading}
          />
        )}
      </form>
      {showOtpInput && <OTPForm onComplete={getOtpToVerify} resendOtp={resendOtp}/>}
    </FormWrapper>
  );
}

export default VerifyDetails;
