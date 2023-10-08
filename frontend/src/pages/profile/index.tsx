import Button from "../../components/Button";
import Input from "../../components/Input";
import { useProfileController } from "./controller";
function Profile() {
  const { handleInputChange, currentUser, profile, formError, updateProfile } =
    useProfileController();
  return (
    <div className="w-[90%] sm:w-[60%] md:w-[50%] mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>
      <form className="flex flex-col w-full gap-4 my-4" onSubmit={updateProfile}>
        <img
          src={currentUser.data.user.avatar}
          alt={currentUser.data.user.username}
          className="w-32 h-32 mx-auto rounded-[50%] hover:cursor-pointer self-center"
        />
        <Input
          id="username"
          onChange={handleInputChange}
          value={profile.username}
        />
        {formError.username && (
          <div className="text-red-500">{formError.username}</div>
        )}
        <Input
          id="email"
          type="email"
          onChange={handleInputChange}
          value={profile.email}
        />
        {formError.email && (
          <div className="text-red-500">{formError.email}</div>
        )}
        <Input
          id="password"
          type="password"
          onChange={handleInputChange}
          value={profile.password}
        />
         {formError.password && (
          <div className="text-red-500">{formError.password}</div>
        )}
        <Button
          value="Update Profile"
          type="submit"
          className="bg-slate-700"
          disabled={false}
        />
      </form>
      <Button
        value="Create Listing"
        type="button"
        className="bg-green-700"
        disabled={false}
      />
      <div className="flex justify-between items-center my-3">
        <button className="text-red-700">Delete Account</button>
        <button className="text-red-700">Sign Out</button>
      </div>
    </div>
  );
}

export default Profile;