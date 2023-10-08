// import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ENDPOINTS from "../utils/endpoints";
import useAuth from "../utils/auth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
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
        "text-slate-700 hover:underline hover:cursor-pointer",
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
  console.log(currentUser);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to={ENDPOINTS.HOME}>
            <span className="text-slate-500">Paradise</span>Estate
            <span className="text-slate-700"></span>
          </Link>
        </h1>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 justify-center items-center">
          <NavLinks
            linkName="Home"
            linkTo={ENDPOINTS.HOME}
            className={"hidden sm:inline"}
          />
          <NavLinks
            linkName="About"
            linkTo={ENDPOINTS.ABOUT}
            className={"hidden sm:inline"}
          />
          {auth ? (
            <Link to={ENDPOINTS.PROFILE}>
              <img
                className="w-10 h-10 rounded-full"
                src={currentUser?.data?.user?.avatar}
                alt={currentUser?.data?.user?.username}
              />
            </Link>
          ) : (
            <NavLinks
              linkName="Sign In"
              linkTo={ENDPOINTS.SIGNIN}
              className={""}
            />
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
