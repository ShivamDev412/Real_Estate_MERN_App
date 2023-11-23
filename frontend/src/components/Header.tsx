import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { RootState } from "../redux/reducers";
import ENDPOINTS from "../utils/endpoints";
import useAuth from "../utils/auth";
import { useProfileController } from "../pages/profile/updateProfile/controller";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
const NavLinks = ({
  linkName,
  linkTo,
  className,
}: {
  linkName: string;
  linkTo: string;
  className: any;
}) => {
  return (
    <li
      className={twMerge(
        "text-white hover:cursor-pointer hover:text-zinc-300 transition-all",
        className
      )}
    >
      <Link to={linkTo} className="">{linkName}</Link>
    </li>
  );
};

function Header() {
  const navigation = useNavigate();
  const auth = useAuth();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { signOut } = useProfileController();
  return (
    <header className="bg-zinc-900 shadow-md py-4">
      <div className="flex justify-between items-center max-w-[80%] mx-auto py-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to={ENDPOINTS.HOME}>
            <span className="text-slate-400">Paradise</span>
            <span className="text-white"> Estate</span>
          </Link>
        </h1>
        {auth ? (
          <form className="bg-slate-100 p-3 rounded-lg flex items-center xs:hidden sm:flex w-[30%] md:w-[45%]">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-[95%] border-0"
            />
            <FaSearch className="text-slate-500" />
          </form>
        ) : (
          <></>
        )}

        <ul className="flex gap-4 justify-center items-center">
          <NavLinks
            linkName="Home"
            linkTo={ENDPOINTS.HOME}
            className={"hidden lg:inline"}
          />
          <NavLinks
            linkName="About"
            linkTo={ENDPOINTS.ABOUT}
            className={"hidden lg:inline"}
          />
           <NavLinks
            linkName="Listings"
            linkTo={ENDPOINTS.LISTINGS}
            className={"hidden lg:inline"}
          />

          {auth ? (
            <>
              <NotificationDropdown />
              <ProfileDropdown
                navigation={navigation}
                currentUser={currentUser}
                signOut={signOut}
              />
            </>
          ) : (
            <NavLinks
              linkName="Sign In"
              linkTo={ENDPOINTS.SIGNIN}
              className={""}
            />
          )}
        </ul>
      </div>
      {auth ? (
        <div className="flex flex-col sm:flex md:hidden w-[90%] mx-auto">
          <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-[99%]"
            />
            <FaSearch className="text-slate-500" />
          </form>
        </div>
      ) : (
        <></>
      )}
      {auth ? (
        <div className="flex gap-4 mt-2 lg:hidden w-[90%] md:w-[80%] mx-auto">
          <NavLinks
            linkName="Home"
            linkTo={ENDPOINTS.HOME}
            className={"inline"}
          />
          <NavLinks
            linkName="About"
            linkTo={ENDPOINTS.ABOUT}
            className={"inline"}
          />
             <NavLinks
            linkName="Listings"
            linkTo={ENDPOINTS.LISTINGS}
            className={"inline"}
          />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
