import Button from "../../../components/Button";
import Input from "../../../components/Input";
import FormWrapper from "../../../wrappers/formWrapper";
import { useResetPasswordController } from "./controller";
function ResetPassword() {
  const {
    resetPassword,
    resetPasswordError,
    handleInputChange,
    handleSubmit,
    loading,
  } = useResetPasswordController();
  return (
    <FormWrapper>
      <h1 className="text-3xl text-center font-semibold my-7">
        Reset Password
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id={"newPassword"}
          type={"password"}
          value={resetPassword.newPassword}
          onChange={(e) => handleInputChange(e)}
        />
        {resetPasswordError.password && (
          <div className="text-red-500">{resetPasswordError.password}</div>
        )}
        <Input
          id={"confirmPassword"}
          type={"password"}
          value={resetPassword.confirmPassword}
          onChange={(e) => handleInputChange(e)}
        />
        {resetPasswordError.confirmPassword && (
          <div className="text-red-500">
            {resetPasswordError.confirmPassword}
          </div>
        )}
        <Button
          value="Submit"
          type="submit"
          className="bg-slate-700"
          disabled={loading}
        />
      </form>
    </FormWrapper>
  );
}

export default ResetPassword;
