// import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ENDPOINTS from "../utils/endpoints";

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
        <ul className="flex gap-4">
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
          <NavLinks
            linkName="Sign In"
            linkTo={ENDPOINTS.SIGNIN}
            className={""}
          />
        </ul>
      </div>
    </header>
  );
}

export default Header;
