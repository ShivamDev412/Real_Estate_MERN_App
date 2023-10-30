import Button from "../../components/Button";
import Input from "../../components/Input";
import FormWrapper from "../../wrappers/formWrapper";
import { useChangePasswordController } from "./controller";
function ChangePassword() {
  const {
    changePassword,
    error,
    handleSubmit,
    handleInputChange,
    loading,
    backToSettings,
  } = useChangePasswordController();
  return (
    <FormWrapper>
      <h1 className="text-3xl font-semibold text-center my-7">
        Change Password
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id={"oldPassword"}
          type={"password"}
          value={changePassword.oldPassword}
          onChange={(e) => handleInputChange(e)}
        />
        {error.oldPassword && (
          <div className="text-red-500">{error.oldPassword}</div>
        )}
        <Input
          id={"newPassword"}
          type={"password"}
          value={changePassword.newPassword}
          onChange={(e) => handleInputChange(e)}
        />
        {error.newPassword && (
          <div className="text-red-500">{error.newPassword}</div>
        )}
        <div className="flex items-center gap-2">
          <Button
            value="Cancel"
            type="button"
            className="bg-red-700"
            disabled={loading}
            onClick={backToSettings}
          />
          <Button
            value="Update"
            type="submit"
            className="bg-slate-700"
            disabled={loading}
          />
        </div>
      </form>
    </FormWrapper>
  );
}

export default ChangePassword;
