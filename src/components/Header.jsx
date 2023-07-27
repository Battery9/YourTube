import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import siteLogo from "../images/site-logo.png";
import { MdSearch, MdVideoCall, MdCircleNotifications, MdAccountCircle } from "react-icons/md"

import { Context } from "../context/apiContext";
import Loader from "./Loader";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const enableMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const { path } = useLocation();
  const page = path?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className="sticky flex flex-row h-12 items-center justify-between px-4 bg-slate-900">
      {loading && <Loader />}

      <div className="flex items-center">
          <Link to="/" className="flex items-center h-7"><img className="h-full dark:block" src={siteLogo} alt="site logo"/>
          <h4 className="text-white ml-1 font-bold xs:text-sm sm:text-base">YourTube</h4></Link>
      </div>
      <div className="group items-center flex">
          <div className="flex content-center items-center h-8 bg-gray-600 border border-zinc-400 rounded-full group-focus-within:border-red-400">
            <input type="text" value={searchQuery} className="bg-transparent h-full outline-none px-3 w-28 md:w-68 lg:w-[500px] text-white" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} 
            onKeyUp={handleSearch}/>
            <MdSearch className="text-white m-2 cursor-pointer"/>
          </div>
      </div>
      <div className="flex items-center gap-1 md:gap-3 text-white text-xl md:text-2xl">
            <MdVideoCall className="hover:text-red-400 cursor-pointer" />
            <MdCircleNotifications className="hover:text-red-400 cursor-pointer" />
            <MdAccountCircle className="hover:text-red-400 cursor-pointer" />
      </div>
    </div>
  );
}
