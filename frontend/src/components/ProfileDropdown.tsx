import { CgProfile } from "react-icons/cg";
import { FaListUl } from "react-icons/fa";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/DropdownMenu";
import ENDPOINTS from "../utils/endpoints";

const ProfileDropdown = ({
  currentUser,
  navigation,
  signOut,
}: {
  currentUser: any;
  navigation: any;
  signOut: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <section className="w-10 h-10">
          <img
            className="w-full h-full rounded-full"
            src={currentUser?.data?.user?.avatar}
            alt={currentUser?.data?.user?.username}
          />
        </section>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="xs:w-50 sm:w-56 p-2">
        <h3 className="font-semibold text-xl mb-2 italic">
          Hello, {currentUser?.data?.user?.firstName}!
        </h3>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:cursor-pointer text-lg"
          onClick={() => navigation(ENDPOINTS.USER_LISTINGS)}
        >
          <FaListUl />
          My Listings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:cursor-pointer text-lg"
          onClick={() => {
            navigation(ENDPOINTS.UPDATE_PROFILE);
          }}
        >
          <CgProfile />
          Update Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 hover:cursor-pointer text-lg"
          onClick={() => {
            navigation(ENDPOINTS.SETTINGS);
          }}
        >
          <FiSettings /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <button
          className="text-red-700 mb-2 flex items-center gap-2 text-lg"
          onClick={signOut}
        >
          <AiOutlinePoweroff /> Sign Out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileDropdown;
