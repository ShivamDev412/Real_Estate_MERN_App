import bannerLogo from "../../assets/profile_banner.jpg";
import { useProfileController } from "./updateProfile/controller";
function MyProfile() {
  const { currentUser } = useProfileController();
  return (
    <section className="pb-[2rem]">
      <section className="relative w-full h-[25rem]">
        <img
          src={bannerLogo}
          alt="proflie_banner"
          className="h-full w-full object-fill"
        />
        <div className="absolute bottom-[-5rem] left-[7rem] h-[10rem] w-[10rem]">
          <img
            src={currentUser.data.user.avatar}
            alt="profile_pic"
            className="w-full h-full rounded-[50%]"
          />
        </div>
      </section>
      <section className="w-3/4 mt-[120px] mx-auto">
        <h3 className="text-3xl">
            <span className="font-bold">Name: </span>
         {currentUser.data.user.firstName}{" "}
          {currentUser.data.user.lastName}
        </h3>
      </section>
    </section>
  );
}

export default MyProfile;
