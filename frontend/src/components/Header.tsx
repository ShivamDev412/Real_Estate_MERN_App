import { useState } from "react";

import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { BsFillKeyFill } from "react-icons/bs";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RootState } from "../redux/reducers";
import ENDPOINTS from "../utils/endpoints";
import useAuth from "../utils/auth";
import { useProfileController } from "../pages/profile/controller";

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
        "text-white hover:underline hover:cursor-pointer",
        className
      )}
    >
      <Link to={linkTo}>{linkName}</Link>
    </li>
  );
};

function Header() {
  const auth = useAuth();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [userDropdown, setUserDropDown] = useState(false);
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
            linkName="My Listings"
            linkTo={ENDPOINTS.USER_LISTINGS}
            className={"hidden lg:inline"}
          />
          {auth ? (
            <>
              <div className="relative">
                <button
                  className="h-10 w-10 flex justify-center"
                  onClick={() => setUserDropDown(!userDropdown)}
                >
                  <img
                    className="w-full h-full rounded-full"
                    src={currentUser?.data?.user?.avatar}
                    alt={currentUser?.data?.user?.username}
                  />
                </button>
              </div>
              {userDropdown ? (
                <div
                  className="z-[99999] absolute right-[2rem] sm:right-[4.5rem] md:right-[5rem] lg:right-[6rem] xl:right-[8rem] top-[4.5rem] mt-2 w-[180px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="p-2 flex flex-col">
                    <h3 className="font-[500] text-xl mb-2 italic">
                      Hello, {currentUser?.data?.user?.firstName}!
                    </h3>
                    <Link
                      to={ENDPOINTS.PROFILE}
                      className="hover:text-blue-700 mb-2 flex items-center gap-2"
                      onClick={() => setUserDropDown(false)}
                    >
                      <CgProfile />
                      Update Profile
                    </Link>
                    <Link
                      to={ENDPOINTS.PROFILE}
                      className="hover:text-blue-700 mb-2 flex items-center gap-2"
                      onClick={() => setUserDropDown(false)}
                    >
                      <BsFillKeyFill /> Change Password
                    </Link>
                    <Link
                      to={ENDPOINTS.SETTINGS}
                      className="hover:text-blue-700 mb-2 flex items-center gap-2"
                      onClick={() => setUserDropDown(false)}
                    >
                      <FiSettings /> Settings
                    </Link>
                    <button
                      className="text-red-700 mb-2 flex items-center gap-2"
                      onClick={signOut}
                    >
                      <AiOutlinePoweroff /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
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
            linkName="My Listings"
            linkTo={ENDPOINTS.USER_LISTINGS}
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
