import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiMusic, FiMenu, FiRadio, FiSettings, FiFlag, FiHelpCircle } from "react-icons/fi";
import { MdWhatshot } from "react-icons/md";

import { Context } from "../context/apiContext";

function MobileMenu() {
  const { setSelectedCatagory } = useContext(Context);
  const navigate = useNavigate();
  const [ dropDown, setDropDown ] = useState('none')


  return (
    <div className="absolute md:hidden z-10 bottom-0 w-full text-white flex items-center justify-evenly p-5 bg-black font-bold text-2xl">
      <FiHome
        onClick={() => {
          setSelectedCatagory("New");
          navigate("/");
        }}
      />
      <MdWhatshot onClick={() => {
        setSelectedCatagory("Trending")
        navigate("/")
      }}/>
      <FiRadio onClick={() => {
        setSelectedCatagory("Live")
        navigate("/")
      }}/>
      <FiMusic onClick={() => {
        setSelectedCatagory("Music")
        navigate("/")
      }}/>
      <div>
        <FiMenu onClick={() => {
            dropDown === 'none' ? setDropDown('block') : setDropDown('none')
        }}/>
      </div>
      <div style={{display:dropDown}} className="absolute right-1 mb-44 bg-black pr-7 pl-2 pb-2 rounded-sm text-lg font-semibold">
            <p className="flex items-center gap-1"><FiSettings /> Settings</p>
            <p className="flex items-center gap-1"><FiFlag /> Report History</p>
            <p className="flex items-center gap-1"><FiHelpCircle /> Help</p>
            <p className="flex items-center gap-1"><FiSettings /> Send FeedBack</p>
        </div>
    </div>
  );
}

export default MobileMenu;