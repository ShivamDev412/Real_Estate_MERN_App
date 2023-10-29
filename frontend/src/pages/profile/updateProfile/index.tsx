import Button from "../../../components/Button";
import Input, { PhoneNoInput } from "../../../components/Input";
import FormWrapper from "../../../wrappers/formWrapper";
import { useProfileController } from "./controller";
function Profile() {
  const {
    loading,
    handleInputChange,
    currentUser,
    profile,
    updateProfile,
    fileRef,
    setFile,
    fileUploadStatus,
    profileError,
    countryCodeValue,
    anyChanges,
    apiLoading,
  } = useProfileController();
  return (
    <FormWrapper>
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Profile
      </h1>
      <form
        className="flex flex-col w-full gap-4 my-4"
        onSubmit={updateProfile}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          multiple={false}
          hidden={true}
          onChange={(e) => setFile(e.target.files && e.target.files[0])}
        />
        <img
          src={
            profile.avatar !== ""
              ? profile.avatar
              : currentUser.data.user.avatar
          }
          alt={currentUser.data.user.username}
          onClick={() => fileRef.current?.click()}
          className="w-32 h-32 mx-auto rounded-[50%] hover:cursor-pointer self-center"
        />
        {fileUploadStatus !== 0 && fileUploadStatus < 100 && (
          <p className="text-center">Uploading... {fileUploadStatus}%</p>
        )}
        {fileUploadStatus === 100 && (
          <p className="text-center text-green-700">
            File uploaded successfully
          </p>
        )}
        <div className="flex flex-col md:flex-row items-center w-full justify-between gap-2">
          <div className="w-full">
            <Input
              id="firstName"
              onChange={handleInputChange}
              value={profile.firstName}
            />
            {profileError.firstName && (
              <div className="text-red-500">{profileError.firstName}</div>
            )}
          </div>
          <div className="w-full">
            <Input
              id="lastName"
              onChange={handleInputChange}
              value={profile.lastName}
            />
            {profileError.lastName && (
              <div className="text-red-500">{profileError.lastName}</div>
            )}
          </div>
        </div>
        <Input
          id="username"
          onChange={handleInputChange}
          value={profile.username}
        />
        {profileError.username && (
          <div className="text-red-500">{profileError.username}</div>
        )}
        <Input
          id="email"
          type="email"
          onChange={handleInputChange}
          value={profile.email}
        />
        {profileError.email && (
          <div className="text-red-500">{profileError.email}</div>
        )}

        <PhoneNoInput
          id="phoneNo"
          onChange={handleInputChange}
          value={profile.phoneNo}
          code={profile.countryCode}
          countryCodeValue={countryCodeValue}
        />
        {profileError.phoneNo && (
          <div className="text-red-500">{profileError.phoneNo}</div>
        )}

        <Button
          value="Update Profile"
          type="submit"
          className="bg-slate-700"
          disabled={anyChanges || loading || apiLoading}
        />
      </form>
    </FormWrapper>
  );
}

export default Profile;
