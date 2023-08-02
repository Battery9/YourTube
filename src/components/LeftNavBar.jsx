import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { categories, navMenuItems } from "../utils/navBarConstants";
import { MdOutlineHome } from "react-icons/md";
import { Context } from "../context/apiContext";

export default function LeftNavBar() {
  const { selectedCatagory, setSelectedCatagory, mobileMenu } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div className="hidden md:block h-full w-48 bg-black absulate md:relative overflow-y-auto">
      <div className="flex flex-col gap-2">
        <div className="text-white flex items-center gap-2 text-sm cursor-pointer p-3 hover:bg-red-400 rounded-lg" onClick={() => {
          setSelectedCatagory('New')
          navigate('/')
        }}>
          <MdOutlineHome className="text-lg"/>
          Latest
        </div>
        {categories.map((item) => {
            return (
              <div className="text-white flex items-center gap-2 text-sm cursor-pointer p-3 hover:bg-red-400 rounded-lg" key={item.name} onClick={() => {
                selectedCatagory !== item.name && setSelectedCatagory(item.name)
                navigate('/')
              }}>
                <span className="text-lg">{item.icon}</span> {item.name}
              </div>
            );
        })}
        <div className="absolute bottom-5 flex flex-col gap-2 w-full">
          <hr className="h-[2px] my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {navMenuItems.map((item) => {
          return (
            <div className="text-white flex items-center justify-items-end gap-2 text-sm cursor-pointer p-3 hover:bg-red-400 rounded-lg" key={item.name}>
              <span className="text-lg">{item.icon}</span> {item.name} 
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
